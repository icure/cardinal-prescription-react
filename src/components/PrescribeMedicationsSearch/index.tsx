import React, { useEffect, useRef, useState, KeyboardEvent } from 'react'
import { searchMedications } from '../../lib/cardinal'
import MedicationRow from '../MedicationRow'
import InfiniteScroll from '../InfiniteScroll'
import { SearchIcn } from '../common/Icons'

import './index.css'
import { Amp, AmpStatus, DmppCodeType, Nmp, PaginatedListIterator, VmpGroup } from '@icure/cardinal-be-sam'
import { mergeSortedPartialArraysN } from '../../helpers'
import { MedicationType } from '../../types'

interface Props {
  sdk: any
  deliveryEnvironment: string
  handleAddPrescription: (medication: MedicationType) => void
  disableInputEventsTracking: boolean
  short?: boolean
}

const Index: React.FC<Props> = ({ sdk, deliveryEnvironment, handleAddPrescription, disableInputEventsTracking, short = false }) => {
  const [searchQuery, setSearchQuery] = useState<string>('')

  const searchQueryRef = useRef(searchQuery) // Create a ref to store the state
  useEffect(() => {
    searchQueryRef.current = searchQuery
    console.log(`SearchQuery is ${searchQuery}`)
  }, [searchQuery])

  const [dropdownDisplayed, setDropdownDisplayed] = useState(false)
  const [pages, setPages] = useState<MedicationType[]>([])
  const [medications, setMedications] = useState<PaginatedListIterator<Amp>>()
  const [molecules, setMolecules] = useState<PaginatedListIterator<VmpGroup>>()
  const [products, setProducts] = useState<PaginatedListIterator<Nmp>>()
  const [medicationsPage, setMedicationsPage] = useState<MedicationType[]>([])
  const [moleculesPage, setMoleculesPage] = useState<MedicationType[]>([])
  const [productsPage, setProductsPage] = useState<MedicationType[]>([])
  const [focusedMedicationIndex, setFocusedMedicationIndex] = useState(-1)
  const [disableHover, setDisableHover] = useState(false)
  const resultRefs = useRef<(HTMLLIElement | null)[]>([])

  useEffect(() => {
    setFocusedMedicationIndex(0)
  }, [])

  useEffect(() => {
    setDropdownDisplayed(!!searchQuery)
  }, [searchQuery])

  useEffect(() => {
    if (searchQuery && searchQuery.length >= 3) {
      const cachedQuery = searchQueryRef.current
      setPages([])
      setTimeout(() => {
        if (cachedQuery === searchQueryRef.current) {
          searchMedications(sdk, 'fr', cachedQuery).then(async ([meds, mols, prods]: any) => {
            setMedications(meds)
            setMolecules(mols)
            setProducts(prods)
            if (cachedQuery !== searchQueryRef.current) {
              console.log(`Search query ${cachedQuery} changed before results were loaded, aborting...`)
              return
            }
            const [medsPage, molsPage, prodsPage] = await Promise.all([
              meds ? loadMedicationsPage(meds, 10) : [],
              mols ? loadMoleculesPage(mols, 10) : [],
              prods ? loadNonMedicinalPage(prods, 10) : [],
            ])
            if (cachedQuery !== searchQueryRef.current) {
              console.log(`Search query ${cachedQuery} changed before results were loaded, aborting...`)
              return
            }
            setMedicationsPage(medsPage)
            setMoleculesPage(molsPage)
            setProductsPage(prodsPage)
            loadMore({ medicationsPage: medsPage, moleculesPage: molsPage, productsPage: prodsPage }).then((result) => {
              if (cachedQuery === searchQueryRef.current) {
                console.log(`Search query ${cachedQuery} results loaded, setting pages...`)
                setPages(result)
              } else {
                console.log(`Search query ${cachedQuery} changed before results were loaded, aborting...`)
              }
            })
          })
        } else {
          console.log(`Search query ${cachedQuery} changed before results were loaded, aborting...`)
        }
      }, 100)
    }
    // eslint-disable-next-line
  }, [searchQuery, searchQueryRef, sdk])

  // Helper for capitalization (from Svelte helpers)
  const capitalize = (str?: string) => (str ? str.charAt(0).toUpperCase() + str.slice(1) : '')

  // Implementations based on Svelte logic:
  async function loadMedicationsPage(medications: PaginatedListIterator<Amp>, min: number, acc: MedicationType[] = []): Promise<MedicationType[]> {
    const now = Date.now()
    const twoYearsAgo = now - 2 * 365 * 24 * 3600 * 1000
    const loadedPage = !(await medications.hasNext()) ? [] : await medications.next(min)

    const page: MedicationType[] = loadedPage.flatMap((amp: Amp) =>
      amp.to && amp.to < now
        ? []
        : amp.ampps
            .filter((ampp) => {
              return (
                ampp.from &&
                ampp.from < now &&
                (!ampp.to || ampp.to > now) &&
                ampp.status == AmpStatus.Authorized &&
                ampp.commercializations?.some((c) => !!c.from && (!c.to || c.to > twoYearsAgo)) &&
                ampp.dmpps?.some((dmpp) => dmpp.from && dmpp.from < now && (!dmpp.to || dmpp.to > now) && dmpp.deliveryEnvironment?.toString() == deliveryEnvironment)
              )
            })
            .map((ampp) => {
              const dmpp = ampp.dmpps?.find(
                (dmpp) =>
                  dmpp.from && dmpp.from < now && (!dmpp.to || dmpp.to > now) && dmpp.deliveryEnvironment?.toString() == deliveryEnvironment && dmpp.codeType == DmppCodeType.Cnk,
              )

              return {
                ampId: amp.id,
                vmpGroupId: amp.vmp?.vmpGroup?.id,
                id: ampp.ctiExtended,
                cnk: dmpp?.code,
                dmppProductId: dmpp?.productId,
                title: ampp.prescriptionName?.fr ?? ampp.abbreviatedName?.fr ?? amp.prescriptionName?.fr ?? amp.name?.fr ?? amp.abbreviatedName?.fr ?? '',
                vmpTitle: amp.vmp?.name?.fr ?? '',
                activeIngredient: amp.vmp?.vmpGroup?.name?.fr ?? '',
                price: ampp?.exFactoryPrice ? `€${ampp.exFactoryPrice}` : '',
                crmLink: ampp.crmLink?.fr,
                patientInformationLeafletLink: ampp.leafletLink?.fr,
                blackTriangle: amp.blackTriangle,
                speciallyRegulated: ampp.speciallyRegulated,
                genericPrescriptionRequired: ampp.genericPrescriptionRequired,
                intendedName: ampp.prescriptionName?.fr,
                rmaProfessionalLink: ampp.rmaProfessionalLink?.fr,
                spcLink: ampp.spcLink?.fr,
                dhpcLink: ampp.dhpcLink?.fr,
                rmakeyMessages: ampp.rmaKeyMessages,
                vmp: amp.vmp,
                supplyProblems: ampp.supplyProblems,
                commercializations: ampp?.commercializations,
                deliveryModusCode: ampp.deliveryModusCode,
                deliveryModus: ampp.deliveryModus?.fr,
                deliveryModusSpecificationCode: ampp.deliveryModusSpecificationCode,
                deliveryModusSpecification: ampp.deliveryModusSpecification?.fr,
                reimbursements: dmpp?.reimbursements?.find((dmpp) => dmpp.from && dmpp.from < now && (!dmpp.to || dmpp.to > now)),
              } as MedicationType
            }),
    )
    return loadedPage.length < min || page.length + acc.length >= min ? [...acc, ...page] : await loadMedicationsPage(medications, min, [...acc, ...page])
  }

  async function loadMoleculesPage(molecules: PaginatedListIterator<VmpGroup>, min: number, acc: MedicationType[] = []): Promise<MedicationType[]> {
    const now = Date.now()
    const loadedPage = !(await molecules.hasNext()) ? [] : await molecules.next(min)

    const page: MedicationType[] = loadedPage
      .filter((vmp: VmpGroup) => !(vmp.to && vmp.to < now))
      .map((vmp) => {
        return {
          vmpGroupId: vmp.id,
          id: vmp.code,
          title: capitalize(vmp.name?.fr) ?? '',
          standardDosage: vmp.standardDosage,
        } as MedicationType
      })
    return page.length < min || page.length + acc.length >= min ? [...acc, ...page] : await loadMoleculesPage(molecules, min, [...acc, ...page])
  }

  async function loadNonMedicinalPage(products: PaginatedListIterator<Nmp>, min: number, acc: MedicationType[] = []): Promise<MedicationType[]> {
    const now = Date.now()
    const loadedPage = !(await products.hasNext()) ? [] : await products.next(min)
    const page: MedicationType[] = loadedPage
      .filter((nmp: Nmp) => !(nmp.to && nmp.to < now))
      .map((nmp) => {
        return {
          nmpId: nmp.id,
          id: nmp.code,
          title: capitalize(nmp.name?.fr) ?? '',
        } as MedicationType
      })
    return loadedPage.length < min || page.length + acc.length >= min ? [...acc, ...page] : await loadNonMedicinalPage(products, min, [...acc, ...page])
  }

  const loadUntil = async (toName: string | undefined, loadPage: () => Promise<MedicationType[]>) => {
    let page = await loadPage()
    const lcToName = toName?.toLowerCase()
    while (page.length && (!lcToName || page[page.length - 1].title.toLowerCase() < lcToName)) {
      const newPage = await loadPage()
      if (!newPage.length) {
        break
      }
      page = [...page, ...newPage]
    }
    return page
  }

  const loadMore = async ({
    medicationsPage,
    moleculesPage,
    productsPage,
  }: {
    medicationsPage: MedicationType[]
    moleculesPage: MedicationType[]
    productsPage: MedicationType[]
  }) => {
    const [result, pointers] = await mergeSortedPartialArraysN(
      10,
      [[...medicationsPage], [...moleculesPage], [...productsPage]],
      [
        async (_, toName) => {
          const loaded = await loadUntil(toName, () => (medications ? loadMedicationsPage(medications, 10) : Promise.resolve([])))
          setMedicationsPage((medicationsPage) => [...medicationsPage, ...loaded])
          return loaded
        },
        async (_, toName) => {
          const loaded = await loadUntil(toName, () => (molecules ? loadMoleculesPage(molecules, 10) : Promise.resolve([])))
          setMoleculesPage((moleculesPage) => [...moleculesPage, ...loaded])
          return loaded
        },
        async (_, toName) => {
          const loaded = await loadUntil(toName, () => (products ? loadNonMedicinalPage(products, 10) : Promise.resolve([])))
          setProductsPage((productsPage) => [...productsPage, ...loaded])
          return loaded
        },
      ],
    )

    setMedicationsPage(medicationsPage.slice(pointers[0]))
    setMoleculesPage(moleculesPage.slice(pointers[1]))
    setProductsPage(productsPage.slice(pointers[2]))

    return result
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (disableInputEventsTracking) return
    const totalPagesLength = pages.length
    const defaultActions = () => {
      event.preventDefault()
      setDisableHover(true)
    }
    if (event.key === 'ArrowDown') {
      defaultActions()
      setFocusedMedicationIndex((prev) => (prev + 1) % totalPagesLength)
      scrollToFocusedItem((focusedMedicationIndex + 1) % totalPagesLength)
    } else if (event.key === 'ArrowUp') {
      defaultActions()
      setFocusedMedicationIndex((prev) => (prev - 1 + totalPagesLength) % totalPagesLength)
      scrollToFocusedItem((focusedMedicationIndex - 1 + totalPagesLength) % totalPagesLength)
    } else if (event.key === 'Enter' && focusedMedicationIndex >= 0) {
      event.preventDefault()
      setDisableHover(false)
      handleAddPrescription(pages[focusedMedicationIndex])
    }
  }

  const scrollToFocusedItem = (index: number) => {
    if (index >= 0 && resultRefs.current[index]) {
      resultRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }

  const handleMouseMove = () => {
    if (!disableInputEventsTracking) setDisableHover(false)
  }

  return (
    <div
      className="prescribeMedications"
      role="listbox"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-activedescendant={focusedMedicationIndex >= 0 ? `result-${focusedMedicationIndex}` : undefined}
    >
      <div className={`prescribeMedications__search${dropdownDisplayed ? ' dropdownDisplayed' : ''}`}>
        <p className="prescribeMedications__search__label">Trouver un médicament:</p>
        <label htmlFor="searchMedications" className="prescribeMedications__search__inputWrap">
          <input
            id="searchMedications"
            type="text"
            placeholder="Trouver un médicament"
            autoComplete="off"
            autoCapitalize="off"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {SearchIcn({})}
        </label>
      </div>
      {pages.length !== 0 && dropdownDisplayed && (
        <ul className="prescribeMedications__dropdown" onMouseMove={handleMouseMove}>
          {pages.map((medication, index) => (
            <li key={index} ref={(el) => (resultRefs.current[index] = el)} className={`${disableHover ? 'disableHover' : ''} ${focusedMedicationIndex === index ? 'focused' : ''}`}>
              <MedicationRow
                medication={medication}
                handleAddPrescription={handleAddPrescription}
                id={`result-${index}`}
                focused={focusedMedicationIndex === index}
                disableHover={disableHover}
                short={short}
              />
            </li>
          ))}
          <InfiniteScroll threshold={50} loadMore={() => loadMore({ medicationsPage, moleculesPage, productsPage }).then((results) => setPages([...pages, ...results]))} />
        </ul>
      )}
    </div>
  )
}

export default Index
