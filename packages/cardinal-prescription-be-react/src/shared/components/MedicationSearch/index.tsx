import React, { KeyboardEvent, useEffect, useRef, useState } from 'react'
import { findMedicationsByLabel, loadAlternativeMedications, loadVmpGroup } from '../../services/cardinal-sam'
import { MedicationCard } from '../../../internal/components/medication-elements/MedicationCard'
import { MedicationProductTitle } from '../../../internal/components/medication-elements/MedicationProductTitle'
import { InfiniteScroll } from '../../../internal/components/common/InfiniteScroll'
import { loadMedicationsPage, loadMore } from '../../../internal/services/loaders/medication-loader'

import { Med, MedicationProductType, MedicationType } from '../../types'
import { SearchIcn, SpinnerIcn } from '../../../internal/components/common/Icons'
import { StyledLabel, StyledMedicationSearch, StyledMedicationSearchDropdown, StyledMedicationSearchInput } from './styles'
import { t } from '../../services/i18n'
import { GlobalStyles } from '../../../styles'
import { Amp, Nmp, PaginatedListIterator, SamV2Api, VmpGroup } from '@icure/cardinal-be-sam-sdk'

interface MedicationSearchProps {
  sdk: SamV2Api
  deliveryEnvironment: string
  onAddPrescription: (medication: MedicationType, cheapAlternatives: MedicationType[]) => void
  disableInputEventsTracking: boolean
  short?: boolean
}

interface MedOrProduct {
  product?: MedicationProductType
  medications: MedicationType[]
}

const medMapper = (item: Med): MedOrProduct => ({
  medications: (item as MedicationProductType).medications ?? [item as MedicationType],
  product: (item as MedicationProductType).medications ? (item as MedicationProductType) : undefined,
})

export const MedicationSearch: React.FC<MedicationSearchProps> = ({ sdk, deliveryEnvironment, onAddPrescription, disableInputEventsTracking, short = false }) => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const searchQueryRef = useRef(searchQuery)
  useEffect(() => {
    searchQueryRef.current = searchQuery
  }, [searchQuery])

  const [dropdownDisplayed, setDropdownDisplayed] = useState(false)
  const [pages, setPages] = useState<MedOrProduct[]>([])
  const [showSpinner, setShowSpinner] = useState(false)
  const [showNoMatchesPlaceholder, setShowNoMatchesPlaceholder] = useState(false)
  const [focusedMedicationIndex, setFocusedMedicationIndex] = useState(0)
  const [focusedSubMedicationIndex, setFocusedSubMedicationIndex] = useState(0)

  // Working data used by the loader. Kept in refs so async load-more callbacks
  // always read/write the latest values without being caught in stale closures.
  const medicationsIterRef = useRef<PaginatedListIterator<Amp> | undefined>(undefined)
  const moleculesIterRef = useRef<PaginatedListIterator<VmpGroup> | undefined>(undefined)
  const productsIterRef = useRef<PaginatedListIterator<Nmp> | undefined>(undefined)
  const medicationsPageRef = useRef<MedicationProductType[]>([])
  const moleculesPageRef = useRef<MedicationType[]>([])
  const productsPageRef = useRef<MedicationType[]>([])

  const resultRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    setDropdownDisplayed(!!searchQuery)
  }, [searchQuery])

  const resetSearch = () => {
    medicationsIterRef.current = undefined
    moleculesIterRef.current = undefined
    productsIterRef.current = undefined
    medicationsPageRef.current = []
    moleculesPageRef.current = []
    productsPageRef.current = []
    setPages([])
    setFocusedMedicationIndex(0)
    setFocusedSubMedicationIndex(0)
  }

  const runLoadMore = async (): Promise<Med[]> => {
    const { result, updated } = await loadMore({
      untreatedLoadedMedicationProducts: [...medicationsPageRef.current],
      untreatedLoadedMolecules: [...moleculesPageRef.current],
      untreatedLoadNonMedicinals: [...productsPageRef.current],
      medicationProductsIterator: medicationsIterRef.current,
      moleculesIterator: moleculesIterRef.current,
      nonMedicinalesIterator: productsIterRef.current,
      deliveryEnvironment,
    })
    medicationsPageRef.current = updated.medicationsPage
    moleculesPageRef.current = updated.moleculesPage
    productsPageRef.current = updated.productsPage
    return result
  }

  const doSearch = async (q: string) => {
    const [meds, mols, prods] = await findMedicationsByLabel(sdk, q)
    if (q !== searchQueryRef.current) return

    medicationsIterRef.current = meds
    moleculesIterRef.current = mols
    productsIterRef.current = prods
    medicationsPageRef.current = []
    moleculesPageRef.current = []
    productsPageRef.current = []

    setShowSpinner(true)

    const result = await runLoadMore()
    if (q !== searchQueryRef.current) return

    setShowSpinner(false)
    setPages(result.map(medMapper))
    setShowNoMatchesPlaceholder(!result.length)
    setFocusedMedicationIndex(0)
    setFocusedSubMedicationIndex(0)
  }

  useEffect(() => {
    const q = searchQuery.trim()
    setShowNoMatchesPlaceholder(false)

    if (q.length === 0) {
      resetSearch()
      setShowSpinner(false)
      return
    }

    if (q.length < 3) {
      setShowSpinner(false)
      return
    }

    const handle = setTimeout(() => {
      if (q === searchQueryRef.current) {
        doSearch(q).catch((error) => console.error('Error while searching medications:', error))
      }
    }, 100)

    return () => clearTimeout(handle)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, sdk])

  const scrollToFocusedItem = (index: number) => {
    if (index >= 0 && resultRefs.current[index]) {
      resultRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (disableInputEventsTracking) return
    const pageCount = pages.length
    if (pageCount === 0) return

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      let mi = focusedMedicationIndex
      let si = focusedSubMedicationIndex + 1
      if (si >= (pages[mi]?.medications.length ?? 0)) {
        si = 0
        mi = (mi + 1) % pageCount
      }
      setFocusedMedicationIndex(mi)
      setFocusedSubMedicationIndex(si)
      scrollToFocusedItem(mi)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      let mi = focusedMedicationIndex
      let si = focusedSubMedicationIndex - 1
      if (si < 0) {
        mi = (mi - 1 + pageCount) % pageCount
        si = (pages[mi]?.medications.length ?? 1) - 1
      }
      setFocusedMedicationIndex(mi)
      setFocusedSubMedicationIndex(si)
      scrollToFocusedItem(mi)
    } else if (event.key === 'Enter' && focusedMedicationIndex >= 0 && focusedSubMedicationIndex >= 0) {
      event.preventDefault()
      const med = pages[focusedMedicationIndex]?.medications[focusedSubMedicationIndex]
      if (med) handleAddPrescription(med)
    }
  }

  const handleAddPrescription = async (med: MedicationType) => {
    const enriched: MedicationType = {
      ...med,
      vmpGroup: med.vmp?.vmpGroup?.code ? await loadVmpGroup(sdk, med.vmp.vmpGroup.code) : undefined,
    }

    const alternatives: MedicationType[] =
      med.cheap || !med.vmp?.vmpGroup?.code
        ? []
        : await loadAlternativeMedications(sdk, med.vmp.vmpGroup.code)
            .then((ampPage) => loadMedicationsPage(ampPage, 10, deliveryEnvironment, [], (mt) => (mt.cheap || mt.cheapest ? mt : undefined)))
            .then((products) => products.flatMap((p) => p.medications))

    onAddPrescription(enriched, alternatives)
    setSearchQuery('')
  }

  const showSearchError = () => {
    const value = searchQuery?.trim()
    return !!value && value.length < 3
  }

  const isFocused = (medicationIndex: number, subMedicationIndex: number) => focusedMedicationIndex === medicationIndex && focusedSubMedicationIndex === subMedicationIndex

  return (
    <>
      <GlobalStyles />
      <StyledMedicationSearch className="StyledMedicationSearch" onKeyDown={handleKeyDown}>
        <StyledMedicationSearchInput className="StyledMedicationSearchInput" $dropdownDisplayed={dropdownDisplayed} $error={showSearchError()}>
          <p>{t('medication.search.label')}:</p>
          <StyledLabel className="StyledLabel" $error={showSearchError()} htmlFor="searchMedications">
            <input
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

        {showSpinner && (
          <div className="spinner">
            <SpinnerIcn size={32} pathFill="#3d87c5" />
          </div>
        )}

        {pages.length !== 0 && dropdownDisplayed && (
          <StyledMedicationSearchDropdown className="medicationSearchDropdown">
            {pages.map((entry, i) => (
              <div key={i} ref={(el) => (resultRefs.current[i] = el)} className="medOrProdWrap">
                {entry.product ? (
                  <>
                    <MedicationProductTitle productTitle={entry.product.title} />
                    {entry.medications.map((smed, j) => (
                      <div key={j} className={`cardWrap subMedication${isFocused(i, j) ? ' focused' : ''}`}>
                        <MedicationCard
                          medication={smed}
                          handleAddPrescription={handleAddPrescription}
                          id={`result-${i}-${j}`}
                          focused={isFocused(i, j)}
                          subMedication={true}
                          short={short}
                        />
                      </div>
                    ))}
                  </>
                ) : (
                  <div className={`cardWrap${isFocused(i, 0) ? ' focused' : ''}`}>
                    <MedicationCard
                      medication={entry.medications[0]}
                      handleAddPrescription={handleAddPrescription}
                      id={`result-${i}`}
                      focused={isFocused(i, 0)}
                      subMedication={false}
                      short={short}
                    />
                  </div>
                )}
              </div>
            ))}
            <InfiniteScroll
              threshold={50}
              loadMore={() =>
                runLoadMore().then((result) => {
                  if (result.length) setPages((prev) => [...prev, ...result.map(medMapper)])
                })
              }
            />
          </StyledMedicationSearchDropdown>
        )}

        {showNoMatchesPlaceholder && (
          <div className="placeholder">
            <p>{t('medication.search.noMatchingPlaceholder')}</p>
          </div>
        )}
      </StyledMedicationSearch>
    </>
  )
}
