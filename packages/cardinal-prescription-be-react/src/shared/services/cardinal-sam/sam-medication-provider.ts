import type { SamV2Api } from '@icure/cardinal-be-sam-sdk'
import { findMedicationsByLabel } from './index'
import { loadMore } from '../../../internal/services/loaders/medication-loader'
import { Med, MedicationProductType, MedicationProvider, MedicationProviderUnavailableError, MedicationType } from '../../types'

type SamIterators = Awaited<ReturnType<typeof findMedicationsByLabel>>

/**
 * Belgian `MedicationProvider`, wrapping SAM's AMP/VMP-group/NMP search + the existing
 * paginated loaders. `MedicationSearch`'s current three-lane merge (AMP/products,
 * VMP-group/molecules, NMP/non-medicinal via `mergeLazySortedNamedItems`) is an internal
 * concern here — callers of `findByLabel` only ever see one merged, sorted `Med` stream.
 *
 * `findByLabel` is a genuinely lazy async generator: it fetches one merged page (`loadMore`'s
 * `limit`) at a time and only asks for the next page once the consumer's `for await` pulls
 * past what's already been yielded — mirroring the incremental loading `InfiniteScroll`
 * currently drives by hand.
 */
export class SamMedicationProvider implements MedicationProvider {
  constructor(
    private readonly sdk: SamV2Api,
    private readonly deliveryEnvironment: string,
  ) {}

  async *findByLabel(label: string): AsyncIterable<Med> {
    const [medicationProductsIterator, moleculesIterator, nonMedicinalesIterator] = await this.searchByLabel(label)

    let untreatedLoadedMedicationProducts: MedicationProductType[] = []
    let untreatedLoadedMolecules: MedicationType[] = []
    let untreatedLoadNonMedicinals: MedicationType[] = []

    while (true) {
      const { result, updated } = await this.loadNextPage({
        untreatedLoadedMedicationProducts,
        untreatedLoadedMolecules,
        untreatedLoadNonMedicinals,
        medicationProductsIterator,
        moleculesIterator,
        nonMedicinalesIterator,
        label,
      })

      if (result.length === 0) return

      for (const item of result) {
        yield item
      }

      untreatedLoadedMedicationProducts = updated.medicationsPage
      untreatedLoadedMolecules = updated.moleculesPage
      untreatedLoadNonMedicinals = updated.productsPage
    }
  }

  private async searchByLabel(label: string) {
    try {
      return await findMedicationsByLabel(this.sdk, label)
    } catch (error) {
      throw new MedicationProviderUnavailableError(`SAM medication search failed for label "${label}"`, error)
    }
  }

  private async loadNextPage(args: {
    untreatedLoadedMedicationProducts: MedicationProductType[]
    untreatedLoadedMolecules: MedicationType[]
    untreatedLoadNonMedicinals: MedicationType[]
    medicationProductsIterator: SamIterators[0]
    moleculesIterator: SamIterators[1]
    nonMedicinalesIterator: SamIterators[2]
    label: string
  }) {
    const { label, ...loadMoreArgs } = args
    try {
      return await loadMore({ ...loadMoreArgs, deliveryEnvironment: this.deliveryEnvironment })
    } catch (error) {
      throw new MedicationProviderUnavailableError(`SAM medication page load failed for label "${label}"`, error)
    }
  }
}
