import { type Amp, type Nmp, type PaginatedListIterator, type SamV2Api, type SamVersion, type VmpGroup } from '@icure/cardinal-be-sam-sdk'
import { cardinalLanguage } from '../i18n'

// Re-export the SDK's paginated iterator type so consumers don't need a direct SDK dependency.
export type { PaginatedListIterator }

/**
 * Search for medications matching the given query, using the currently selected language.
 * @param sdk Instance of the SamV2Api sdk
 * @param query Medication search query string
 * @returns Paginated iterators of AMP, VMPGroup, and NMP matches
 */
export const findMedicationsByLabel = async (sdk: SamV2Api, query: string): Promise<[PaginatedListIterator<Amp>, PaginatedListIterator<VmpGroup>, PaginatedListIterator<Nmp>]> => {
  const language = cardinalLanguage.getLanguage()
  try {
    return await Promise.all([sdk.findPaginatedAmpsByLabel(language, query), sdk.findPaginatedVmpGroupsByLabel(language, query), sdk.findPaginatedNmpsByLabel(language, query)])
  } catch (error) {
    console.error('Error in findMedicationsByLabel:', error)
    throw error
  }
}

/**
 * Load cheaper alternative medications for a given VMP group code.
 */
export const loadAlternativeMedications = async (sdk: SamV2Api, vmpGroupCode: string): Promise<PaginatedListIterator<Amp>> => {
  return sdk.findPaginatedAmpsByGroupCode(vmpGroupCode)
}

/**
 * Load the full VmpGroup (incl. standard dosages) for a given VMP group code.
 */
export const loadVmpGroup = async (sdk: SamV2Api, vmpGroupCode: string): Promise<VmpGroup | undefined> => {
  const groups = await sdk.listVmpGroupsByVmpGroupCodes([vmpGroupCode])
  return groups[0]
}

/**
 * Fetch the current version information for the SAM database.
 */
export const fetchSamVersion = async (sdk: SamV2Api): Promise<SamVersion | undefined> => {
  try {
    return await sdk.getSamVersion()
  } catch (error) {
    console.error('Error in fetchSamVersion:', error)
    return undefined
  }
}

export * from './sam-medication-provider'
