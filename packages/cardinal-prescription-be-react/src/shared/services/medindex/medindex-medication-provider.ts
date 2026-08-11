import {
  MedIndexClient,
  MedIndexNetworkError,
  MedIndexNotFoundError,
  MedIndexServerError,
  MedIndexValidationError,
  MedicationPackageDto,
  MedicationProductDto,
  RawInteractionDto,
} from '@icure/medindex-sdk'
import { cardinalLanguage } from '../i18n'
import { mapMedIndexMedication, mapMedIndexProductTitle, MedIndexLanguage, toMedIndexLanguage } from '../../../internal/services/medication-mapper/map-medindex-medication'
import {
  Med,
  MedicationNotFoundError,
  MedicationProductType,
  MedicationProvider,
  MedicationProviderError,
  MedicationProviderUnavailableError,
  MedicationSearchValidationError,
} from '../../types'

// Matches `MedicationSearch`'s own `PAGE_SIZE` / `loadMore`'s default `limit` — keeps the
// incremental-scroll page size consistent across every source, not just SAM's.
const PAGE_SIZE = 10

/**
 * Pulls up to `size` items out of `iterator`, stopping early once it reports `done`. Same shape
 * as `MedicationSearch`'s own `pullNext` helper — redefined here rather than imported, since a
 * service module shouldn't reach into a component-layer file for a generic utility.
 */
async function pullNext<T>(iterator: AsyncIterator<T>, size: number): Promise<T[]> {
  const items: T[] = []
  while (items.length < size) {
    const { value, done } = await iterator.next()
    if (done) break
    items.push(value)
  }
  return items
}

/**
 * Drains the lanes one after the other into a single product stream, skipping products already
 * yielded by an earlier lane (first lane wins). The dedupe must happen here, before
 * `loadNextPage` chunks the stream — it treats a short chunk as "source exhausted", so a
 * post-chunk filter would end the search early whenever a full chunk contained duplicates.
 *
 * Errors are deliberately NOT translated here: they propagate raw through `pullProducts`'s
 * existing try/catch so `translateError`'s `instanceof` checks still see the SDK's native types.
 * The one exception is a `MedIndexNotFoundError` on an `optional` lane — an old server that
 * doesn't expose that endpoint yet — which degrades to an empty lane.
 */
async function* mergeLanes(lanes: SearchLane[]): AsyncGenerator<MedicationProductDto> {
  const seen = new Set<string>()
  for (const lane of lanes) {
    try {
      for await (const product of lane.iterable) {
        if (seen.has(product.id)) continue
        seen.add(product.id)
        yield product
      }
    } catch (error) {
      if (!(lane.optional && error instanceof MedIndexNotFoundError)) throw error
    }
  }
}

/**
 * Matches an ATC code or class prefix at levels 2–5 (`N02`, `N02B`, `N02BE`, `N02BE01`). The
 * level-1 single letter is deliberately excluded: it falls below the search's own 3-character
 * minimum, and a one-letter query is far likelier to be the start of a name than an ATC class.
 */
const ATC_PATTERN = /^[A-Za-z]\d\d([A-Za-z]([A-Za-z](\d\d)?)?)?$/

/** One source stream of the unified search. `optional` marks the lanes only an upgraded
 * medINDEX server exposes — a 404 on those degrades to an empty lane instead of failing. */
interface SearchLane {
  iterable: AsyncIterable<MedicationProductDto>
  optional: boolean
}

/**
 * Swiss `MedicationProvider`, wrapping medINDEX's product search. `findByLabel` is a unified
 * search over up to three server-side lanes — product/brand names, substance names in the
 * composition, and (when the query is shaped like an ATC code) ATC code/class prefix —
 * deduplicated by product id and drained sequentially in that order, so exact-name matches
 * always rank first. Within each lane the SDK's own ordering is trusted, the same way
 * `SamMedicationProvider` trusts each of its three SAM lanes.
 *
 * `enrichForPrescription`/`loadCheapAlternatives` are intentionally left unimplemented: there is
 * no Swiss prescription-transmission or reimbursement-driven cheap-alternatives concept this
 * phase (see docs/plan.md's "ch scope this phase" decision) — the interface already treats both
 * as optional for exactly this reason.
 */
export class MedIndexMedicationProvider implements MedicationProvider {
  constructor(private readonly client: MedIndexClient) {}

  async *findByLabel(label: string): AsyncIterable<Med> {
    // The `iterate*` calls throw `MedIndexValidationError` synchronously (client-side, for
    // labels under the SDK's own minimum length) before returning an iterable at all — outside
    // the try/catch inside `pullProducts`, so they need their own translation here or they would
    // leak the SDK's native error type instead of the shared `MedicationSearchValidationError`.
    let lanes: SearchLane[]
    const trimmed = label.trim()
    const language = toMedIndexLanguage(cardinalLanguage.getLanguage())
    try {
      lanes = [
        { iterable: this.client.product.iterateByLabel(trimmed, language), optional: false },
        { iterable: this.client.product.iterateBySubstance(trimmed, language), optional: true },
        // The ATC index is uppercase, and `iterateByAtc` deliberately passes the code through
        // literally — normalize here so a lowercase query still hits.
        ...(ATC_PATTERN.test(trimmed) ? [{ iterable: this.client.product.iterateByAtc(trimmed.toUpperCase()), optional: true }] : []),
      ]
    } catch (error) {
      throw this.translateError(error, `medINDEX product search failed for label "${label}"`)
    }

    const iterator = mergeLanes(lanes)

    while (true) {
      const page = await this.loadNextPage(iterator, label)
      if (page.length === 0) return

      for (const item of page) {
        yield item
      }
    }
  }

  /**
   * Pulls product chunks from the source and maps each surviving one into a `MedicationProductType`,
   * recursing for another chunk whenever filtering (inactive products/packages) leaves fewer
   * qualifying results than `PAGE_SIZE` and the source isn't exhausted yet — mirrors
   * `loadMedicationsPage`'s own recursion for the same "don't dribble out a near-empty page" reason.
   */
  private async loadNextPage(iterator: AsyncIterator<MedicationProductDto>, label: string, acc: MedicationProductType[] = []): Promise<MedicationProductType[]> {
    const products = await this.pullProducts(iterator, label)
    if (products.length === 0) return acc

    // Filtering before fetching packages avoids paying for package lookups on products the
    // source itself already considers gone.
    const activeProducts = products.filter((product) => product.active)
    const [packagesByProductId, interactionsById] = activeProducts.length
      ? await Promise.all([this.fetchPackagesByProduct(activeProducts, label), this.fetchInteractionsById(activeProducts)])
      : [new Map<string, MedicationPackageDto[]>(), new Map<string, RawInteractionDto>()]
    const language = toMedIndexLanguage(cardinalLanguage.getLanguage())

    const page = activeProducts
      .map((product) => this.toMedicationProductType(product, packagesByProductId.get(product.id) ?? [], language, interactionsById))
      .filter((product): product is MedicationProductType => product !== null)

    const combined = [...acc, ...page]
    return products.length < PAGE_SIZE || combined.length >= PAGE_SIZE ? combined : this.loadNextPage(iterator, label, combined)
  }

  /** Returns `null` (filtered out) once none of a product's packages are active — mirroring how
   * `loadMedicationsPage` returns `null` for an AMP whose AMPPs are all undeliverable. */
  private toMedicationProductType(
    product: MedicationProductDto,
    packages: MedicationPackageDto[],
    language: MedIndexLanguage,
    interactionsById: Map<string, RawInteractionDto>,
  ): MedicationProductType | null {
    const activePackages = packages.filter((pkg) => pkg.active)
    if (activePackages.length === 0) return null

    return {
      id: product.id,
      title: mapMedIndexProductTitle(product, language),
      medications: activePackages.map((pkg) => mapMedIndexMedication(product, pkg, language, interactionsById)),
    }
  }

  private async pullProducts(iterator: AsyncIterator<MedicationProductDto>, label: string): Promise<MedicationProductDto[]> {
    try {
      return await pullNext(iterator, PAGE_SIZE)
    } catch (error) {
      throw this.translateError(error, `medINDEX product search failed for label "${label}"`)
    }
  }

  /**
   * One batched `interaction.byIds` call per chunk, resolving the full `RawInteraction` documents
   * behind every product's interaction refs so `mapMedIndexMedication` can embed localized
   * titles/effects. Enrichment only — a `MedIndexNotFoundError` (an older medINDEX server without
   * the /interaction endpoint) degrades to an empty map, same as the optional search lanes, and
   * the mapper falls back to ref-only entries. Any other error still propagates: it signals the
   * same source unavailability a package lookup failure would.
   */
  private async fetchInteractionsById(products: MedicationProductDto[]): Promise<Map<string, RawInteractionDto>> {
    const ids = Array.from(new Set(products.flatMap((product) => product.interactions.map((ref) => ref.id)).filter((id): id is string => !!id)))
    if (ids.length === 0) return new Map()

    try {
      const interactions = await this.client.interaction.byIds(ids)
      return new Map(interactions.map((interaction) => [interaction.id, interaction]))
    } catch (error) {
      if (error instanceof MedIndexNotFoundError) return new Map()
      throw this.translateError(error, 'medINDEX interaction lookup failed')
    }
  }

  /** One batched `byProductIds` call per chunk, not one call per product — the whole point of
   * pulling products in chunks in the first place. */
  private async fetchPackagesByProduct(products: MedicationProductDto[], label: string): Promise<Map<string, MedicationPackageDto[]>> {
    try {
      const packages = await this.client.package.byProductIds(products.map((product) => product.id))
      const byProductId = new Map<string, MedicationPackageDto[]>()

      for (const pkg of packages) {
        const productId = pkg.product?.id
        if (!productId) continue

        const existing = byProductId.get(productId)
        if (existing) existing.push(pkg)
        else byProductId.set(productId, [pkg])
      }

      return byProductId
    } catch (error) {
      throw this.translateError(error, `medINDEX package lookup failed for label "${label}"`)
    }
  }

  // Collapses `MedIndexServerError`/`MedIndexNetworkError` into one `MedicationProviderUnavailableError`
  // per this library's error contract (see `MedicationProvider`'s doc comment / docs/plan.md's
  // Decisions table) — callers only need "try again later," not the exact transport-vs-server cause.
  private translateError(error: unknown, message: string): MedicationProviderError {
    if (error instanceof MedIndexNotFoundError) return new MedicationNotFoundError(message, error)
    if (error instanceof MedIndexValidationError) return new MedicationSearchValidationError(message, error)
    if (error instanceof MedIndexServerError || error instanceof MedIndexNetworkError) return new MedicationProviderUnavailableError(message, error)
    return new MedicationProviderUnavailableError(message, error)
  }
}
