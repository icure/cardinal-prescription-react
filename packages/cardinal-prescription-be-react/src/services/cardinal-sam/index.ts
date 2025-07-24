import { cardinalLanguage } from '../i18n'
import { Amp, IccBesamv2Api, Nmp, PaginatedListAmp, PaginatedListNmp, PaginatedListVmpGroup, SamVersion, VmpGroup } from '@icure/api'

/**
 * Search for medications matching the given query and language.
 * @param sdk Instance of the SamV2Api sdk
 * @param query Medication search query string
 * @returns Paginated lists of AMP, VMPGroup, and NMP matches
 */

const language = cardinalLanguage.getLanguage()

interface PaginatedList<K, T> {
  pageSize?: number
  totalSize?: number
  rows?: Array<T>
  nextKeyPair?: {
    startKey?: K
    startKeyDocId?: string
  }
}

export class PaginatedListIterator<K, T> {
  private loader: (limit: number, startKey?: K, startDocumentId?: string) => Promise<PaginatedList<K, T>>
  private limit: number
  private hasNextPage: boolean | null
  private currentList: PaginatedList<K, T> | null

  constructor(loader: (limit: number, startKey?: K, startDocumentId?: string) => Promise<PaginatedList<K, T>>) {
    this.loader = loader
    this.limit = 20 // Default limit, can be adjusted
    this.hasNextPage = true
    this.currentList = null
  }

  async hasNext(): Promise<boolean> {
    if (this.hasNextPage === null) {
      this.currentList = await this.loader(this.limit)
      this.hasNextPage = this.currentList.rows && this.currentList.rows.length > 0
    }
    return this.hasNextPage
  }

  async next(limit: number): Promise<Array<T>> {
    if (this.hasNextPage === null || !this.hasNextPage) {
      throw new Error('No more pages available')
    }

    if (!this.currentList) {
      this.currentList = await this.loader(limit)
    }

    const rows = this.currentList.rows || []
    this.hasNextPage = !!this.currentList.nextKeyPair && rows.length === limit

    // Prepare for the next call
    if (this.hasNextPage) {
      const nextKey = this.currentList.nextKeyPair?.startKey
      const nextDocumentId = this.currentList.nextKeyPair?.startKeyDocId
      this.currentList = await this.loader(limit, nextKey, nextDocumentId)
    } else {
      this.currentList = null
    }

    return rows
  }
}

export const findMedicationsByLabel = async (
  sdk: IccBesamv2Api,
  query: string,
): Promise<[PaginatedListIterator<string, Amp>, PaginatedListIterator<string, VmpGroup>, PaginatedListIterator<string, Nmp>]> => {
  try {
    return await Promise.all([
      new PaginatedListIterator<string, Amp>((limit: number, startKey: string, startDocumentId: string) => {
        return sdk.findPaginatedAmpsByLabel(language, query, startKey ? JSON.stringify(startKey) : undefined, startDocumentId, limit)
      }),
      new PaginatedListIterator<string, Amp>((limit: number, startKey: string, startDocumentId: string) => {
        return sdk.findPaginatedVmpGroupsByLabel(language, query, startKey ? JSON.stringify(startKey) : undefined, startDocumentId, limit)
      }),
      new PaginatedListIterator<string, Amp>((limit: number, startKey: string, startDocumentId: string) => {
        return sdk.findPaginatedNmpsByLabel(language, query, startKey ? JSON.stringify(startKey) : undefined, startDocumentId, limit)
      }),
    ])
  } catch (error) {
    console.error('Error in findMedicationsByLabel:', error)
    throw error
  }
}

/**
 * Fetch the current version information for the SAM database.
 */
export const fetchSamVersion = async (sdk: IccBesamv2Api): Promise<SamVersion | undefined> => {
  try {
    return await sdk.getSamVersion()
  } catch (error) {
    console.error('Error in fetchSamVersion:', error)
    return undefined
  }
}
