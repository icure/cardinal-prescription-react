import React, { KeyboardEvent, useEffect, useRef, useState } from 'react'
import { findMedicationsByLabel } from '../../../services/cardinal-sam'
import { MedicationCard } from '../MedicationCard'
import { InfiniteScroll } from '../../common/InfiniteScroll'

import { Amp, Nmp, PaginatedListIterator, SamV2Api, VmpGroup } from '@icure/cardinal-be-sam-sdk'
import { MedicationType } from '../../../types'
import { SearchIcn } from '../../common/Icons'
import { mergeSortedPartialArraysN } from '../../../utils/loader-helpers'
import { ampToMedicationTypes, nmpToMedicationTypes, vmpGroupToMedicationTypes } from '../../../services/medication-mapper'
import { StyledLabel, StyledMedicationSearch, StyledMedicationSearchDropdown, StyledMedicationSearchInput } from './styles'
import { t } from '../../../services/i18n'
import { GlobalStyles } from '../../../styles'

interface MedicationSearchProps {
  sdk: SamV2Api
  deliveryEnvironment: string
  handleAddPrescription: (medication: MedicationType) => void
  disableInputEventsTracking: boolean
  short?: boolean
}

export const MedicationSearch: React.FC<MedicationSearchProps> = ({ sdk, deliveryEnvironment, handleAddPrescription, disableInputEventsTracking, short = false }) => {
  const [searchQuery, setSearchQuery] = useState<string>('')

  const searchQueryRef = useRef(searchQuery) // Create a ref to store the state
  useEffect(() => {
    searchQueryRef.current = searchQuery
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
  const resultRefs = useRef<(HTMLDivElement | null)[]>([])

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
          findMedicationsByLabel(sdk, cachedQuery).then(async ([meds, mols, prods]: any) => {
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

  // Implementations based on Svelte logic:
  async function loadMedicationsPage(medications: PaginatedListIterator<Amp>, min: number, acc: MedicationType[] = []): Promise<MedicationType[]> {
    const page: MedicationType[] = (!(await medications.hasNext()) ? [] : await medications.next(min)).flatMap((amp: Amp) => ampToMedicationTypes(amp, deliveryEnvironment))
    return (!(await medications.hasNext()) ? [] : await medications.next(min)).length < min || page.length + acc.length >= min
      ? [...acc, ...page]
      : await loadMedicationsPage(medications, min, [...acc, ...page])
  }

  async function loadMoleculesPage(molecules: PaginatedListIterator<VmpGroup>, min: number, acc: MedicationType[] = []): Promise<MedicationType[]> {
    const page = (!(await molecules.hasNext()) ? [] : await molecules.next(min)).flatMap((vmp: VmpGroup) => vmpGroupToMedicationTypes(vmp))
    return page.length < min || page.length + acc.length >= min ? [...acc, ...page] : await loadMoleculesPage(molecules, min, [...acc, ...page])
  }

  async function loadNonMedicinalPage(products: PaginatedListIterator<Nmp>, min: number, acc: MedicationType[] = []): Promise<MedicationType[]> {
    const page = (!(await products.hasNext()) ? [] : await products.next(min)).flatMap((nmp: Nmp) => nmpToMedicationTypes(nmp))
    return (!(await products.hasNext()) ? [] : await products.next(min)).length < min || page.length + acc.length >= min
      ? [...acc, ...page]
      : await loadNonMedicinalPage(products, min, [...acc, ...page])
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

  const showSearchError = () => {
    const value = searchQuery?.trim()
    return !!value && value.length < 3
  }

  return (
    <>
      <GlobalStyles />
      <StyledMedicationSearch onKeyDown={handleKeyDown} aria-activedescendant={focusedMedicationIndex >= 0 ? `result-${focusedMedicationIndex}` : undefined}>
        <StyledMedicationSearchInput $dropdownDisplayed={dropdownDisplayed} $error={showSearchError()}>
          <p>{t('medication.search.label')}:</p>
          <StyledLabel $error={showSearchError()} htmlFor="searchMedications">
            <input
              // $error={showSearchError()}
              id="searchMedications"
              type="text"
              placeholder={t('medication.search.label')}
              autoComplete="off"
              autoCapitalize="off"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchIcn />
          </StyledLabel>
          {showSearchError() && <p className="error">{t('medication.search.errorMessage')}</p>}
        </StyledMedicationSearchInput>

        {pages.length !== 0 && dropdownDisplayed && (
          <StyledMedicationSearchDropdown className="medicationSearchDropdown" onMouseMove={handleMouseMove}>
            {pages.map((medication, index) => (
              <div key={index} ref={(el) => (resultRefs.current[index] = el)} className="medicationCardWrap">
                <MedicationCard
                  medication={medication}
                  handleAddPrescription={handleAddPrescription}
                  id={`result-${index}`}
                  focused={focusedMedicationIndex === index}
                  disableHover={disableHover}
                  short={short}
                />
              </div>
            ))}
            <InfiniteScroll
              threshold={50}
              loadMore={() =>
                loadMore({
                  medicationsPage,
                  moleculesPage,
                  productsPage,
                }).then((results) => setPages([...pages, ...results]))
              }
            />
          </StyledMedicationSearchDropdown>
        )}
      </StyledMedicationSearch>
    </>
  )
}
