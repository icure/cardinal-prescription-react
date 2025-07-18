import { type Amp, Nmp, type PaginatedListIterator, type SamV2Api, type SamVersion, VmpGroup } from '@icure/cardinal-be-sam-sdk'
import { cardinalLanguage } from '../i18n'

/**
 * Search for medications matching the given query and language.
 * @param sdk Instance of the SamV2Api sdk
 * @param query Medication search query string
 * @returns Paginated lists of AMP, VMPGroup, and NMP matches
 */

const language = cardinalLanguage.getLanguage()

export const findMedicationsByLabel = async (sdk: SamV2Api, query: string): Promise<[PaginatedListIterator<Amp>, PaginatedListIterator<VmpGroup>, PaginatedListIterator<Nmp>]> => {
  try {
    return await Promise.all([sdk.findPaginatedAmpsByLabel(language, query), sdk.findPaginatedVmpGroupsByLabel(language, query), sdk.findPaginatedNmpsByLabel(language, query)])
  } catch (error) {
    console.error('Error in findMedicationsByLabel:', error)
    throw error
  }
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
