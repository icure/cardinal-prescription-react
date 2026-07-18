import { Amp, AmpStatus, DmppCodeType, Nmp, PaginatedListIterator, VmpGroup, SamText } from '@icure/cardinal-be-sam-sdk'
import { MedicationType, MedicationProductType, Med } from '../../../shared/types'
import { normalizeForSort } from '../../utils/string-helpers'
import { mergeLazySortedNamedItems } from './merge-lazy-sorted-named-items'
import { cardinalLanguage } from '../../../shared/services/i18n'
import { mapSamMedication, mapSamMedicationProductTitle, mapSamMolecule, mapSamNonMedicinal } from '../medication-mapper/map-sam-medication'

export async function loadMedicationsPage(
  medications: PaginatedListIterator<Amp>,
  min: number,
  deliveryEnvironment: string,
  acc: MedicationProductType[] = [],
  filter: (medication: MedicationType) => MedicationType | undefined = (m) => m,
): Promise<MedicationProductType[]> {
  const language: keyof SamText = cardinalLanguage.getLanguage()
  const now = Date.now()
  const twoYearsAgo = now - 2 * 365 * 24 * 3600 * 1000
  const loadedPage = !(await medications.hasNext()) ? [] : await medications.next(min)

  const page: MedicationProductType[] = loadedPage
    .map((amp: Amp) => {
      if (amp.to && amp.to < now) {
        return null
      }

      const activeAmpps = amp.ampps.filter((ampp) => ampp.from && (!ampp.to || ampp.to > now))
      const authorizedAmpps = activeAmpps.filter((ampp) => ampp.status?.toLowerCase() === AmpStatus.Authorized.toLowerCase())
      const commercializedAmpps = authorizedAmpps.filter((ampp) => ampp.commercializations?.some((c) => !!c.from && (!c.to || c.to > twoYearsAgo)))
      const deliverableAmpps = commercializedAmpps.filter((ampp) =>
        ampp.dmpps?.some((dmpp) => dmpp.from && (!dmpp.to || dmpp.to > now) && dmpp.deliveryEnvironment?.toString() === deliveryEnvironment),
      )

      if (deliverableAmpps.length === 0) {
        return null
      }

      // Create MedicationType for each AMPP
      const medications: MedicationType[] = deliverableAmpps
        .map((ampp, index) => {
          const dmpp = ampp.dmpps?.find(
            (dmpp) => dmpp.from && (!dmpp.to || dmpp.to > now) && dmpp.deliveryEnvironment?.toString() === deliveryEnvironment && dmpp.codeType === DmppCodeType.Cnk,
          )

          return mapSamMedication(amp, ampp, dmpp, index, language, now)
        })
        .map(filter)
        .filter((m): m is MedicationType => !!m)
        .sort((a, b) => {
          // Sort by index first, then by title
          const indexA = a.index ?? 0
          const indexB = b.index ?? 0
          if (indexA !== indexB) {
            return indexA - indexB
          }
          return normalizeForSort(a.title).localeCompare(normalizeForSort(b.title))
        })

      if (medications.length === 0) {
        return null
      }

      return {
        id: amp.id!,
        title: mapSamMedicationProductTitle(amp, language),
        medications: medications,
      } as MedicationProductType
    })
    .filter((mp): mp is MedicationProductType => mp !== null)

  return loadedPage.length < min || page.length + acc.length >= min
    ? [...acc, ...page]
    : await loadMedicationsPage(medications, min, deliveryEnvironment, [...acc, ...page], filter)
}

export async function loadMoleculesPage(molecules: PaginatedListIterator<VmpGroup>, min: number, acc: MedicationType[] = []): Promise<MedicationType[]> {
  const language: keyof SamText = cardinalLanguage.getLanguage()
  const now = Date.now()
  const loadedPage = !(await molecules.hasNext()) ? [] : await molecules.next(min)
  const page: MedicationType[] = loadedPage.filter((vmp: VmpGroup) => !(vmp.to && vmp.to < now)).map((vmp) => mapSamMolecule(vmp, language))

  return page.length < min || page.length + acc.length >= min ? [...acc, ...page] : await loadMoleculesPage(molecules, min, [...acc, ...page])
}

export async function loadNonMedicinalPage(products: PaginatedListIterator<Nmp>, min: number, acc: MedicationType[] = []): Promise<MedicationType[]> {
  const language: keyof SamText = cardinalLanguage.getLanguage()
  const now = Date.now()
  const loadedPage = !(await products.hasNext()) ? [] : await products.next(min)
  const page: MedicationType[] = loadedPage.filter((nmp: Nmp) => !(nmp.to && nmp.to < now)).map((nmp) => mapSamNonMedicinal(nmp, language))

  return page.length < min || page.length + acc.length >= min ? [...acc, ...page] : await loadNonMedicinalPage(products, min, [...acc, ...page])
}

/**
 * Loads elements until a given name or up to a limit if no name is provided.
 */
export async function loadUntil(toName: string | undefined, loadPage: () => Promise<any[]>, limit: number = 10): Promise<any[]> {
  let page: any[] = []
  if (!toName) {
    // Load up to the limit
    while (page.length < limit) {
      const newPage = await loadPage()
      if (!newPage.length) break
      page = [...page, ...newPage]
    }
    return page
  }

  const lcToName = normalizeForSort(toName)
  while (page.length === 0 || normalizeForSort(page[page.length - 1].title) < lcToName) {
    const newPage = await loadPage()
    if (!newPage.length) break
    page = [...page, ...newPage]
  }
  return page
}

export async function loadMore({
  untreatedLoadedMedicationProducts,
  untreatedLoadedMolecules,
  untreatedLoadNonMedicinals,
  medicationProductsIterator,
  moleculesIterator,
  nonMedicinalesIterator,
  deliveryEnvironment,
  limit = 10,
}: {
  untreatedLoadedMedicationProducts: MedicationProductType[]
  untreatedLoadedMolecules: MedicationType[]
  untreatedLoadNonMedicinals: MedicationType[]
  medicationProductsIterator: PaginatedListIterator<Amp> | undefined
  moleculesIterator: PaginatedListIterator<VmpGroup> | undefined
  nonMedicinalesIterator: PaginatedListIterator<Nmp> | undefined
  deliveryEnvironment: string
  limit?: number
}): Promise<{
  result: Med[]
  updated: {
    medicationsPage: MedicationProductType[]
    moleculesPage: MedicationType[]
    productsPage: MedicationType[]
  }
}> {
  const [result, pointers] = await mergeLazySortedNamedItems(
    limit,
    [[...untreatedLoadedMedicationProducts], [...untreatedLoadedMolecules], [...untreatedLoadNonMedicinals]],
    [
      async (_, toName) => {
        const loaded = await loadUntil(
          toName,
          () => (medicationProductsIterator ? loadMedicationsPage(medicationProductsIterator, limit, deliveryEnvironment) : Promise.resolve([])),
          limit,
        )
        untreatedLoadedMedicationProducts.push(...loaded)
        return loaded
      },
      async (_, toName) => {
        const loaded = await loadUntil(toName, () => (moleculesIterator ? loadMoleculesPage(moleculesIterator, limit) : Promise.resolve([])), limit)
        untreatedLoadedMolecules.push(...loaded)
        return loaded
      },
      async (_, toName) => {
        const loaded = await loadUntil(toName, () => (nonMedicinalesIterator ? loadNonMedicinalPage(nonMedicinalesIterator, limit) : Promise.resolve([])), limit)
        untreatedLoadNonMedicinals.push(...loaded)
        return loaded
      },
    ],
  )

  return {
    result,
    updated: {
      medicationsPage: untreatedLoadedMedicationProducts.slice(pointers[0]),
      moleculesPage: untreatedLoadedMolecules.slice(pointers[1]),
      productsPage: untreatedLoadNonMedicinals.slice(pointers[2]),
    },
  }
}
