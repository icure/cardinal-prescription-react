import {
  MedIndexClient,
  MedIndexNetworkError,
  MedIndexNotFoundError,
  MedIndexServerError,
  MedIndexValidationError,
  MedicationPackageDto,
  MedicationProductDto,
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
 * Swiss `MedicationProvider`, wrapping medINDEX's single product search stream. Unlike SAM's
 * three-lane AMP/VMP-group/NMP merge, medINDEX has only one product-level concept — `findByLabel`
 * adapts one already-ordered source stream instead of merging several, trusting the SDK's own
 * ordering the same way `SamMedicationProvider` trusts each of its three SAM lanes.
 *
 * `enrichForPrescription`/`loadCheapAlternatives` are intentionally left unimplemented: there is
 * no Swiss prescription-transmission or reimbursement-driven cheap-alternatives concept this
 * phase (see docs/plan.md's "ch scope this phase" decision) — the interface already treats both
 * as optional for exactly this reason.
 */
export class MedIndexMedicationProvider implements MedicationProvider {
  constructor(private readonly client: MedIndexClient) {}

  async *findByLabel(label: string): AsyncIterable<Med> {
    const iterator = this.client.product.iterateByLabel(label, toMedIndexLanguage(cardinalLanguage.getLanguage()))[Symbol.asyncIterator]()

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
    const packagesByProductId = activeProducts.length ? await this.fetchPackagesByProduct(activeProducts, label) : new Map<string, MedicationPackageDto[]>()
    const language = toMedIndexLanguage(cardinalLanguage.getLanguage())

    const page = activeProducts
      .map((product) => this.toMedicationProductType(product, packagesByProductId.get(product.id) ?? [], language))
      .filter((product): product is MedicationProductType => product !== null)

    const combined = [...acc, ...page]
    return products.length < PAGE_SIZE || combined.length >= PAGE_SIZE ? combined : this.loadNextPage(iterator, label, combined)
  }

  /** Returns `null` (filtered out) once none of a product's packages are active — mirroring how
   * `loadMedicationsPage` returns `null` for an AMP whose AMPPs are all undeliverable. */
  private toMedicationProductType(product: MedicationProductDto, packages: MedicationPackageDto[], language: MedIndexLanguage): MedicationProductType | null {
    const activePackages = packages.filter((pkg) => pkg.active)
    if (activePackages.length === 0) return null

    return {
      id: product.id,
      title: mapMedIndexProductTitle(product, language),
      medications: activePackages.map((pkg) => mapMedIndexMedication(product, pkg, language)),
    }
  }

  private async pullProducts(iterator: AsyncIterator<MedicationProductDto>, label: string): Promise<MedicationProductDto[]> {
    try {
      return await pullNext(iterator, PAGE_SIZE)
    } catch (error) {
      throw this.translateError(error, `medINDEX product search failed for label "${label}"`)
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
