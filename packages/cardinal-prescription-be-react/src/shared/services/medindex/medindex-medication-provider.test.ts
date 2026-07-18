import { describe, vi } from 'vitest'
import { MedIndexClient, MedicationPackageDto, MedicationProductDto } from '@icure/medindex-sdk'
import { MedIndexMedicationProvider } from './medindex-medication-provider'
import { runMedicationProviderContractTests } from '../medication-provider.contract-test'
import { MedicationNotFoundError, MedicationProviderUnavailableError } from '../../types'

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
    composition: [{ substance: { name: 'Acetylsalicylsäure' } }],
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
 * Mock `fetch` serving `/product` (label search, cursor-paginated per `PaginatedResponse`'s
 * `{rows, nextKeyPair}` shape — see `@icure/medindex-sdk`'s `pagination.ts`) and
 * `/package/byProductIds` (flat array response). `httpPageSize` is deliberately smaller than the
 * provider's own `PAGE_SIZE` (10) so a single provider-level page requires more than one HTTP
 * round trip — needed to make the laziness assertion meaningful.
 */
function makeSearchFetchMock(products: MedicationProductDto[], packagesByProductId: Map<string, MedicationPackageDto[]>, httpPageSize = 5) {
  let productPageIndex = 0

  return vi.fn(async (url: URL | string, init?: RequestInit): Promise<Response> => {
    const parsedUrl = typeof url === 'string' ? new URL(url) : url
    const method = init?.method ?? 'GET'

    if (parsedUrl.pathname.endsWith('/product') && method === 'GET') {
      const start = productPageIndex * httpPageSize
      const rows = products.slice(start, start + httpPageSize)
      productPageIndex += 1
      const isLast = start + httpPageSize >= products.length
      return jsonResponse(200, { rows, nextKeyPair: isLast ? undefined : { startKey: ['de', 'cursor'], startKeyDocId: `cursor-${productPageIndex}` } })
    }

    if (parsedUrl.pathname.endsWith('/package/byProductIds') && method === 'POST') {
      const body = JSON.parse((init?.body as string) ?? '{"ids":[]}') as { ids: string[] }
      const packages = body.ids.flatMap((id) => packagesByProductId.get(id) ?? [])
      return jsonResponse(200, packages)
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
