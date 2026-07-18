import { Med, MedicationType } from './medication'

/**
 * Country-agnostic medication lookup contract. Each country's concrete provider
 * (`SamMedicationProvider`, `MedIndexMedicationProvider`, ...) wraps its own backend and its
 * own pagination, but yields a single merged, sorted stream of `Med` — callers never see a
 * source's internal bucketing (e.g. SAM's AMP/VMP-group/NMP split).
 *
 * `enrichForPrescription`/`loadCheapAlternatives` are optional because they're only meaningful
 * for a country with a reimbursement-driven prescription-sending flow (`be`, via VMP groups) —
 * a provider for a country without that concept (e.g. `ch`'s medINDEX) simply omits them, and
 * callers get no enrichment/no alternatives, which is the correct behavior there.
 */
export interface MedicationProvider {
  findByLabel(label: string): AsyncIterable<Med>
  enrichForPrescription?(medication: MedicationType): Promise<MedicationType>
  loadCheapAlternatives?(medication: MedicationType): Promise<MedicationType[]>
}

/**
 * Base of this library's own error hierarchy for medication lookup. Concrete providers
 * translate their backend's native errors into one of the subclasses below at the boundary,
 * so callers can handle failures the same way regardless of which country's source is active.
 */
export class MedicationProviderError extends Error {
  constructor(
    message: string,
    readonly cause?: unknown,
  ) {
    super(message)
    this.name = new.target.name
  }
}

/** The requested medication (or lookup target, e.g. a VMP group code) does not exist. */
export class MedicationNotFoundError extends MedicationProviderError {}

/** The search input was rejected by the provider as malformed (e.g. a label that's too short). */
export class MedicationSearchValidationError extends MedicationProviderError {}

/**
 * The provider could not be reached or failed unexpectedly. Deliberately collapses a
 * backend's server-vs-network distinction (e.g. medINDEX's `MedIndexServerError` /
 * `MedIndexNetworkError`) — callers only need "try again later," not the exact cause.
 */
export class MedicationProviderUnavailableError extends MedicationProviderError {}
