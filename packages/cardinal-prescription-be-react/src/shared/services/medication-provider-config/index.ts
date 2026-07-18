import type { SamV2Api } from '@icure/cardinal-be-sam-sdk'
import type { MedIndexClient } from '@icure/medindex-sdk'
import { SamMedicationProvider } from '../cardinal-sam'
import { MedIndexMedicationProvider } from '../medindex'
import { MedicationProvider } from '../../types'

/**
 * One member per country with an actual `MedicationProvider` implementation, discriminated by
 * `country`, each carrying exactly the constructor arguments its concrete provider needs. No
 * `fr` member yet: `fr` has no provider (or mapper) built this phase (see docs/plan.md) — a
 * branch here with nothing behind it would just be dead code. This union naturally grows a
 * `{ country: 'fr'; ... }` member once that provider exists.
 */
export type MedicationProviderConfig = { country: 'be'; sdk: SamV2Api; deliveryEnvironment: string } | { country: 'ch'; client: MedIndexClient }

/**
 * Constructs the concrete `MedicationProvider` matching `config.country`, so a consuming app
 * can select a country via one config value instead of importing and instantiating
 * `SamMedicationProvider`/`MedIndexMedicationProvider` itself.
 */
export function createMedicationProvider(config: MedicationProviderConfig): MedicationProvider {
  switch (config.country) {
    case 'be':
      return new SamMedicationProvider(config.sdk, config.deliveryEnvironment)
    case 'ch':
      return new MedIndexMedicationProvider(config.client)
  }
}
