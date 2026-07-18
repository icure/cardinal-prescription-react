import { Med } from './medication'

/**
 * Country-agnostic medication lookup contract. Each country's concrete provider
 * (`SamMedicationProvider`, `MedIndexMedicationProvider`, ...) wraps its own backend and its
 * own pagination, but yields a single merged, sorted stream of `Med` — callers never see a
 * source's internal bucketing (e.g. SAM's AMP/VMP-group/NMP split).
 */
export interface MedicationProvider {
  findByLabel(label: string): AsyncIterable<Med>
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
