import { describe, expect, it, vi } from 'vitest'
import { MedIndexClient, MedicationPackageDto, MedicationProductDto, RawInteractionDto } from '@icure/medindex-sdk'
import { MedIndexMedicationProvider } from './medindex-medication-provider'
import { runMedicationProviderContractTests } from '../medication-provider.contract-test'
import { Med, MedicationNotFoundError, MedicationProductType, MedicationProviderUnavailableError } from '../../types'

const BASE_URL = 'http://test.invalid/rest/v2/medindex'

function jsonResponse(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })
}

/** Minimal but realistic `MedicationProductDto` — only the fields `mapMedIndexMedication`/
 * `mapMedIndexProductTitle` actually read, matching the shape documented in
 * `@icure/medindex-sdk`'s `types/generated.ts`. */
function makeProductDto(overrides: Partial<MedicationProductDto> = {}): MedicationProductDto {
  return {
    id: 'medprod:1',
    prdno: 1,
    names: { de: 'Aspirin', fr: 'Aspirine', it: 'Aspirina' },
    brandName: { de: 'Aspirin', fr: 'Aspirine', it: 'Aspirina' },
    galenicForm: { de: 'Tabletten', fr: 'comprimés' },
    composition: [{ substance: { name: { de: 'Acetylsalicylsäure', fr: 'Acide acétylsalicylique' } } }],
    interactions: [],
    active: true,
    ...overrides,
  } as MedicationProductDto
}

/** Minimal but realistic `MedicationPackageDto`, mirroring `makeProductDto` above. */
function makePackageDto(overrides: Partial<MedicationPackageDto> = {}): MedicationPackageDto {
  return {
    id: 'medpkg:100',
    pharmacode: 100,
    product: { id: 'medprod:1', name: 'Aspirin' },
    name: { de: 'Aspirin 100 Stk', fr: 'Aspirine 100 cpr' },
    gtin: ['7680100000000'],
    swissmedicCategory: 'B',
    prices: [{ type: 'PPUB', validFrom: 1, chf: 12.5 }],
    narcotic: false,
    coldChain: false,
    active: true,
    ...overrides,
  } as MedicationPackageDto
}

/**
 * Mock `fetch` serving the three product-search lanes (`/product` label search,
 * `/product/bySubstance`, `/product/byAtc/{code}` — each cursor-paginated per
 * `PaginatedResponse`'s `{rows, nextKeyPair}` shape, see `@icure/medindex-sdk`'s
 * `pagination.ts`) and `/package/byProductIds` (flat array response). `httpPageSize` is
 * deliberately smaller than the provider's own `PAGE_SIZE` (10) so a single provider-level page
 * requires more than one HTTP round trip — needed to make the laziness assertion meaningful.
 */
function makeSearchFetchMock(
  products: MedicationProductDto[],
  packagesByProductId: Map<string, MedicationPackageDto[]>,
  httpPageSize = 5,
  { substanceProducts = [] as MedicationProductDto[], atcProducts = [] as MedicationProductDto[], interactions = [] as RawInteractionDto[] } = {},
) {
  const pageIndexes = { label: 0, substance: 0, atc: 0 }

  const servePage = (lane: keyof typeof pageIndexes, laneProducts: MedicationProductDto[], nextKey: unknown) => {
    const start = pageIndexes[lane] * httpPageSize
    const rows = laneProducts.slice(start, start + httpPageSize)
    pageIndexes[lane] += 1
    const isLast = start + httpPageSize >= laneProducts.length
    return jsonResponse(200, { rows, nextKeyPair: isLast ? undefined : { startKey: nextKey, startKeyDocId: `${lane}-cursor-${pageIndexes[lane]}` } })
  }

  return vi.fn(async (url: URL | string, init?: RequestInit): Promise<Response> => {
    const parsedUrl = typeof url === 'string' ? new URL(url) : url
    const method = init?.method ?? 'GET'

    if (parsedUrl.pathname.endsWith('/product') && method === 'GET') {
      return servePage('label', products, ['de', 'cursor'])
    }

    if (parsedUrl.pathname.endsWith('/product/bySubstance') && method === 'GET') {
      return servePage('substance', substanceProducts, ['de', 'cursor'])
    }

    if (parsedUrl.pathname.includes('/product/byAtc/') && method === 'GET') {
      return servePage('atc', atcProducts, 'cursor')
    }

    if (parsedUrl.pathname.endsWith('/package/byProductIds') && method === 'POST') {
      const body = JSON.parse((init?.body as string) ?? '{"ids":[]}') as { ids: string[] }
      const packages = body.ids.flatMap((id) => packagesByProductId.get(id) ?? [])
      return jsonResponse(200, packages)
    }

    if (parsedUrl.pathname.endsWith('/interaction/byIds') && method === 'POST') {
      const body = JSON.parse((init?.body as string) ?? '{"ids":[]}') as { ids: string[] }
      return jsonResponse(
        200,
        interactions.filter((interaction) => body.ids.includes(interaction.id)),
      )
    }

    throw new Error(`Unhandled mock fetch call: ${method} ${parsedUrl.pathname}`)
  })
}

describe('MedIndexMedicationProvider', () => {
  runMedicationProviderContractTests('MedIndexMedicationProvider (ch)', {
    regulatoryCountryKey: 'ch',

    withSuccessfulSearch(label, itemCount) {
      const products = Array.from({ length: itemCount }, (_, i) =>
        makeProductDto({ id: `medprod:${label}-${i}`, names: { de: `${label} ${i}`, fr: `${label} ${i}`, it: `${label} ${i}` } }),
      )
      const packagesByProductId = new Map(
        products.map((product, i) => [product.id, [makePackageDto({ id: `medpkg:${label}-${i}`, pharmacode: 1000 + i, product: { id: product.id, name: product.names.de } })]]),
      )

      const fetchMock = makeSearchFetchMock(products, packagesByProductId)
      const client = new MedIndexClient({ baseUrl: BASE_URL, fetch: fetchMock })
      return {
        provider: new MedIndexMedicationProvider(client),
        backendCallCount: () => fetchMock.mock.calls.length,
      }
    },

    withNotFoundLikeFailure() {
      const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 404 }))
      const client = new MedIndexClient({ baseUrl: BASE_URL, fetch: fetchMock })
      return { provider: new MedIndexMedicationProvider(client), expectedErrorType: MedicationNotFoundError }
    },

    // A network failure (fetch itself rejecting) rather than a 5xx response, to exercise the
    // other half of `translateError`'s `MedIndexServerError || MedIndexNetworkError` collapse —
    // both are expected to land on the same shared `MedicationProviderUnavailableError`.
    withUnavailableLikeFailure() {
      const fetchMock = vi.fn().mockRejectedValue(new TypeError('fetch failed'))
      const client = new MedIndexClient({ baseUrl: BASE_URL, fetch: fetchMock })
      return { provider: new MedIndexMedicationProvider(client), expectedErrorType: MedicationProviderUnavailableError }
    },

    // `iterateByLabel` throws `MedIndexValidationError` synchronously, client-side, for labels
    // under 3 characters (see `@icure/medindex-sdk`'s `ProductResource.iterateByLabel`) — this
    // used to escape `findByLabel` untranslated (obtaining the iterator happened outside any
    // try/catch); now wrapped so it translates like every other `MedIndexValidationError`.
    shortLabel: {
      kind: 'translates',
      label: 'ab',
      provider: new MedIndexMedicationProvider(new MedIndexClient({ baseUrl: BASE_URL, fetch: vi.fn() })),
    },
  })
})

/** Product + its one active package, wired into the given map so the product survives the
 * provider's "no active packages → filtered out" rule. */
function seedProduct(id: string, name: string, packagesByProductId: Map<string, MedicationPackageDto[]>): MedicationProductDto {
  const product = makeProductDto({ id, names: { de: name, fr: name, it: name } })
  packagesByProductId.set(id, [makePackageDto({ id: `medpkg:${id}`, product: { id, name } })])
  return product
}

async function collectIds(provider: MedIndexMedicationProvider, label: string): Promise<string[]> {
  const ids: string[] = []
  for await (const item of provider.findByLabel(label)) {
    ids.push(item.id)
  }
  return ids
}

describe('MedIndexMedicationProvider unified search lanes', () => {
  it('merges the substance lane after the name lane, deduplicating by product id (first lane wins)', async () => {
    const packagesByProductId = new Map<string, MedicationPackageDto[]>()
    const p1 = seedProduct('medprod:1', 'Dafalgan', packagesByProductId)
    const p2 = seedProduct('medprod:2', 'Panadol', packagesByProductId)
    const p3 = seedProduct('medprod:3', 'Tylenol', packagesByProductId)

    const fetchMock = makeSearchFetchMock([p1, p2], packagesByProductId, 5, { substanceProducts: [p1, p3] })
    const provider = new MedIndexMedicationProvider(new MedIndexClient({ baseUrl: BASE_URL, fetch: fetchMock }))

    expect(await collectIds(provider, 'paracetamol')).toEqual(['medprod:1', 'medprod:2', 'medprod:3'])
  })

  it('queries the ATC lane last, uppercased, when the query is shaped like an ATC code', async () => {
    const packagesByProductId = new Map<string, MedicationPackageDto[]>()
    const p1 = seedProduct('medprod:1', 'N02-named product', packagesByProductId)
    const p2 = seedProduct('medprod:2', 'Dafalgan', packagesByProductId)

    const fetchMock = makeSearchFetchMock([p1], packagesByProductId, 5, { atcProducts: [p1, p2] })
    const provider = new MedIndexMedicationProvider(new MedIndexClient({ baseUrl: BASE_URL, fetch: fetchMock }))

    expect(await collectIds(provider, 'n02be01')).toEqual(['medprod:1', 'medprod:2'])
    const atcCall = fetchMock.mock.calls.find(([url]) => (url as URL).pathname.includes('/product/byAtc/'))
    expect((atcCall?.[0] as URL).pathname.endsWith('/product/byAtc/N02BE01')).toBe(true)
  })

  it('does not query the ATC lane when the query is not shaped like an ATC code', async () => {
    const packagesByProductId = new Map<string, MedicationPackageDto[]>()
    const p1 = seedProduct('medprod:1', 'Aspirin', packagesByProductId)

    const fetchMock = makeSearchFetchMock([p1], packagesByProductId)
    const provider = new MedIndexMedicationProvider(new MedIndexClient({ baseUrl: BASE_URL, fetch: fetchMock }))

    await collectIds(provider, 'aspirin')
    expect(fetchMock.mock.calls.some(([url]) => (url as URL).pathname.includes('/product/byAtc/'))).toBe(false)
  })

  it('still yields the name-lane results when an old server 404s on the new lanes', async () => {
    const packagesByProductId = new Map<string, MedicationPackageDto[]>()
    const p1 = seedProduct('medprod:1', 'Dafalgan', packagesByProductId)

    const upgraded = makeSearchFetchMock([p1], packagesByProductId)
    const fetchMock = vi.fn(async (url: URL | string, init?: RequestInit): Promise<Response> => {
      const pathname = (typeof url === 'string' ? new URL(url) : url).pathname
      if (pathname.endsWith('/product/bySubstance') || pathname.includes('/product/byAtc/')) {
        return new Response(null, { status: 404 })
      }
      return upgraded(url, init)
    })
    const provider = new MedIndexMedicationProvider(new MedIndexClient({ baseUrl: BASE_URL, fetch: fetchMock }))

    expect(await collectIds(provider, 'n02be01')).toEqual(['medprod:1'])
  })

  it('batch-resolves interaction refs and embeds localized titles into regulatory.ch.interactions', async () => {
    const packagesByProductId = new Map<string, MedicationPackageDto[]>()
    const product = makeProductDto({ id: 'medprod:1', interactions: [{ id: 'ix:42', relevance: '3' }] })
    packagesByProductId.set('medprod:1', [makePackageDto({ id: 'medpkg:medprod:1', product: { id: 'medprod:1', name: 'Aspirin' } })])

    const interaction = {
      id: 'ix:42',
      ixno: 42,
      titles: { de: 'Benzodiazepine - Alkohol', fr: 'Benzodiazépines - Alcool' },
      group1: {},
      group2: {},
      effect: { fr: 'Sédation renforcée' },
      relevance: '3',
      effectText: {},
      mechanismText: {},
      measuresText: {},
      remarks: {},
      mechanisms: [],
    } as RawInteractionDto

    const fetchMock = makeSearchFetchMock([product], packagesByProductId, 5, { interactions: [interaction] })
    const provider = new MedIndexMedicationProvider(new MedIndexClient({ baseUrl: BASE_URL, fetch: fetchMock }))

    const results: Med[] = []
    for await (const item of provider.findByLabel('aspirin')) {
      results.push(item)
    }

    const medication = (results[0] as MedicationProductType).medications[0]
    expect(medication.regulatory?.ch?.interactions).toEqual([{ id: 'ix:42', relevance: '3', title: 'Benzodiazépines - Alcool', effect: 'Sédation renforcée', measures: undefined }])
    expect(fetchMock.mock.calls.filter(([url]) => (url as URL).pathname.endsWith('/interaction/byIds'))).toHaveLength(1)
  })

  it('degrades to ref-only interactions when an old server 404s on /interaction/byIds', async () => {
    const packagesByProductId = new Map<string, MedicationPackageDto[]>()
    const product = makeProductDto({ id: 'medprod:1', interactions: [{ id: 'ix:42', relevance: '3' }] })
    packagesByProductId.set('medprod:1', [makePackageDto({ id: 'medpkg:medprod:1', product: { id: 'medprod:1', name: 'Aspirin' } })])

    const upgraded = makeSearchFetchMock([product], packagesByProductId)
    const fetchMock = vi.fn(async (url: URL | string, init?: RequestInit): Promise<Response> => {
      const pathname = (typeof url === 'string' ? new URL(url) : url).pathname
      if (pathname.endsWith('/interaction/byIds')) {
        return new Response(null, { status: 404 })
      }
      return upgraded(url, init)
    })
    const provider = new MedIndexMedicationProvider(new MedIndexClient({ baseUrl: BASE_URL, fetch: fetchMock }))

    const results: Med[] = []
    for await (const item of provider.findByLabel('aspirin')) {
      results.push(item)
    }

    const medication = (results[0] as MedicationProductType).medications[0]
    expect(medication.regulatory?.ch?.interactions).toEqual([{ id: 'ix:42', relevance: '3', title: undefined, effect: undefined, measures: undefined }])
  })

  it('translates a substance-lane server failure into MedicationProviderUnavailableError', async () => {
    const packagesByProductId = new Map<string, MedicationPackageDto[]>()
    const p1 = seedProduct('medprod:1', 'Dafalgan', packagesByProductId)

    const upgraded = makeSearchFetchMock([p1], packagesByProductId)
    const fetchMock = vi.fn(async (url: URL | string, init?: RequestInit): Promise<Response> => {
      const pathname = (typeof url === 'string' ? new URL(url) : url).pathname
      if (pathname.endsWith('/product/bySubstance')) {
        return new Response(null, { status: 500 })
      }
      return upgraded(url, init)
    })
    const provider = new MedIndexMedicationProvider(new MedIndexClient({ baseUrl: BASE_URL, fetch: fetchMock }))

    await expect(collectIds(provider, 'paracetamol')).rejects.toBeInstanceOf(MedicationProviderUnavailableError)
  })
})
