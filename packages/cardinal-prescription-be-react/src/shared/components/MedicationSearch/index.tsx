import React, { KeyboardEvent, useEffect, useRef, useState } from 'react'
import { MedicationCard } from '../../../internal/components/medication-elements/MedicationCard'
import { MedicationProductTitle } from '../../../internal/components/medication-elements/MedicationProductTitle'
import { InfiniteScroll } from '../../../internal/components/common/InfiniteScroll'

import { Med, MedicationProductType, MedicationProvider, MedicationType } from '../../types'
import { SearchIcn, SpinnerIcn } from '../../../internal/components/common/Icons'
import { StyledLabel, StyledMedicationSearch, StyledMedicationSearchDropdown, StyledMedicationSearchInput } from './styles'
import { t } from '../../services/i18n'
import { GlobalStyles } from '../../../styles'

// Matches the `limit` default the loaders used before this component was routed through
// `MedicationProvider` — keeps the incremental-scroll UX (page size, spinner, append-on-scroll)
// identical for `be`.
const PAGE_SIZE = 10

interface MedicationSearchProps {
  medicationProvider: MedicationProvider
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

/** Pulls up to `size` items out of `iterator`, stopping early once it reports `done`. */
const pullNext = async (iterator: AsyncIterator<Med>, size: number): Promise<Med[]> => {
  const items: Med[] = []
  while (items.length < size) {
    const { value, done } = await iterator.next()
    if (done) break
    items.push(value)
  }
  return items
}

export const MedicationSearch: React.FC<MedicationSearchProps> = ({ medicationProvider, onAddPrescription, disableInputEventsTracking, short = false }) => {
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

  // The provider's merged, sorted stream for the in-flight search. Kept in a ref so async
  // load-more callbacks always read/write the latest iterator without being caught in stale
  // closures.
  const iteratorRef = useRef<AsyncIterator<Med> | undefined>(undefined)

  const resultRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    setDropdownDisplayed(!!searchQuery)
  }, [searchQuery])

  const resetSearch = () => {
    iteratorRef.current = undefined
    setPages([])
    setFocusedMedicationIndex(0)
    setFocusedSubMedicationIndex(0)
  }

  const runLoadMore = async (): Promise<Med[]> => {
    const iterator = iteratorRef.current
    return iterator ? pullNext(iterator, PAGE_SIZE) : []
  }

  const doSearch = async (q: string) => {
    iteratorRef.current = medicationProvider.findByLabel(q)[Symbol.asyncIterator]()

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
  }, [searchQuery, medicationProvider])

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
    const enriched = (await medicationProvider.enrichForPrescription?.(med)) ?? med
    const alternatives = (await medicationProvider.loadCheapAlternatives?.(med)) ?? []

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
