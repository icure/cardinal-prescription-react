import { type Amp, Nmp, type PaginatedListIterator, type SamV2Api, VmpGroup } from '@icure/cardinal-be-sam-sdk'

export const searchMedications: (
  sdk: SamV2Api,
  lang: string,
  query: string,
) => Promise<[PaginatedListIterator<Amp>, PaginatedListIterator<VmpGroup>, PaginatedListIterator<Nmp>]> = async (sdk: SamV2Api, lang: string, query: string) => {
  try {
    return Promise.all([sdk.findPaginatedAmpsByLabel(lang, query), sdk.findPaginatedVmpGroupsByLabel(lang, query), sdk.findPaginatedNmpsByLabel(lang, query)])
  } catch (error) {
    console.error('Error searching medications:', error)
    throw error
  }
}

export const getSamVersion = async (sdk: SamV2Api) => {
  try {
    return await sdk.getSamVersion()
  } catch (error) {
    console.error('Error getting Sam version:', error)
  }
}
