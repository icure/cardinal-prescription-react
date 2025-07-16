import { type Amp, Nmp, type PaginatedListIterator, type SamV2Api, type SamVersion, VmpGroup } from '@icure/cardinal-be-sam-sdk'

export class SamSdkService {
  private sdk: SamV2Api

  constructor(sdk: SamV2Api) {
    if (!sdk) throw new Error('SamV2Api instance is required')
    this.sdk = sdk
  }

  /**
   * Search for medications matching the given query and language.
   * @param language Language code (e.g., 'en', 'fr', 'nl' or 'de')
   * @param query Medication search query string
   * @returns Paginated lists of AMP, VMPGroup, and NMP matches
   */
  async findMedicationsByLabel(language: string, query: string): Promise<[PaginatedListIterator<Amp>, PaginatedListIterator<VmpGroup>, PaginatedListIterator<Nmp>]> {
    try {
      return await Promise.all([
        this.sdk.findPaginatedAmpsByLabel(language, query),
        this.sdk.findPaginatedVmpGroupsByLabel(language, query),
        this.sdk.findPaginatedNmpsByLabel(language, query),
      ])
    } catch (error) {
      console.error('Error in findMedicationsByLabel:', error)
      throw error
    }
  }

  /**
   * Fetch the current version information for the SAM database.
   */
  async fetchSamVersion(): Promise<SamVersion | undefined> {
    try {
      return await this.sdk.getSamVersion()
    } catch (error) {
      console.error('Error in fetchSamVersion:', error)
      return undefined
    }
  }
}
