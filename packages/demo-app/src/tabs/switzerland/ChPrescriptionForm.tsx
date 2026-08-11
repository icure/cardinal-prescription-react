import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Button, cardinalLanguage, MedicationCard, MedicationType } from '@icure/cardinal-prescription-be-react'
import { makeParser } from '@icure/medication-sdk'
import { ChDurationUnit, ChPrescriptionDraft } from './types'

interface ChPrescriptionFormProps {
  medication: MedicationType
  // When set, the form edits this existing draft (prefilled fields, submit keeps its id) instead
  // of creating a new one — the ch counterpart of PrescriptionModal's `modalMood: 'modify'`.
  draftToModify?: ChPrescriptionDraft
  onClose: () => void
  onSubmit: (draft: ChPrescriptionDraft) => void
}

const today = () => new Date().toISOString().slice(0, 10)

// Length of the longest overlap between the (whitespace-trimmed) suffix of `a` and the prefix of
// `b`, compared case-insensitively — used to merge an accepted posology suggestion onto the text
// already typed. Local copy of the library's internal `suffixPrefixOverlap` (not part of its
// public API, and the ch form deliberately stays demo-app-local — see CONTEXT.md).
const suffixPrefixOverlap = (a: string, b: string): number => {
  const aTrim = a.replace(/\s+$/, '')
  const max = Math.min(aTrim.length, b.length)
  for (let k = max; k > 0; k--) {
    if (aTrim.slice(-k).toLowerCase() === b.slice(0, k).toLowerCase()) return k
  }
  return 0
}

// A simple, demo-app-local stand-in for the library's `PrescriptionModal`. `ch` has no
// FHC/recip-e transmission this phase (see CONTEXT.md / docs/plan.md), so this intentionally only
// captures freeform text plus a quantity/duration/start-date — enough to represent "editing a
// prescription entry" without wiring anything Belgium-specific. It presents the same way as
// `PrescriptionModal` though: a full-height panel docked to the right edge over a dimmed overlay,
// with a header (medication title + close), scrollable body and footer actions. The posology
// field offers the same free-text completion as the Belgium modal, via
// `@icure/medication-sdk`'s `completePosology` (the parser is country-agnostic — language-based).
export const ChPrescriptionForm: React.FC<ChPrescriptionFormProps> = ({ medication, draftToModify, onClose, onSubmit }) => {
  const [posologyText, setPosologyText] = useState(draftToModify?.posologyText ?? '')
  const [quantity, setQuantity] = useState(draftToModify?.quantity ?? 1)
  const [durationUnit, setDurationUnit] = useState<ChDurationUnit>(draftToModify?.durationUnit ?? 'days')
  const [startDate, setStartDate] = useState(draftToModify?.startDate ?? today())

  const [posologySuggestions, setPosologySuggestions] = useState<string[]>([])
  // The last value produced by accepting a suggestion: suppresses the completion effect run
  // triggered by that very acceptance, so the dropdown doesn't immediately re-open.
  const [posologyFromSuggestion, setPosologyFromSuggestion] = useState('')
  // Index of the keyboard-focused suggestion (-1 = none), like PrescriptionModal's
  // focusedDosageIndex: ArrowDown/ArrowUp cycle through the dropdown, Enter accepts.
  const [focusedSuggestionIndex, setFocusedSuggestionIndex] = useState(-1)
  const suggestionRefs = useRef<(HTMLLIElement | null)[]>([])

  const { completePosology } = useMemo(() => makeParser(cardinalLanguage.getLanguage() as 'fr' | 'en' | 'nl' | 'de'), [])

  // Debounced completion, same pattern as PrescriptionModal's: only suggest when the text is
  // still what it was 100ms ago (i.e. the user paused typing).
  const posologyRef = useRef(posologyText)
  useEffect(() => {
    posologyRef.current = posologyText
  }, [posologyText])

  useEffect(() => {
    const posologyWhenCalled = posologyText
    setTimeout(() => {
      if (posologyWhenCalled && posologyWhenCalled === posologyRef.current && posologyWhenCalled !== posologyFromSuggestion) {
        setPosologySuggestions(completePosology(posologyWhenCalled))
        setFocusedSuggestionIndex(-1)
      }
    }, 100)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posologyText])

  const acceptSuggestion = (suggestion: string) => {
    const current = posologyRef.current ?? ''
    const overlap = suffixPrefixOverlap(current, suggestion)
    const merged = ((overlap > 0 ? current.replace(/\s+$/, '') : current.trimEnd() + (current ? ' ' : '')) + suggestion.slice(overlap))
      .replace(/\s*\/\s*/g, ' / ')
      .replace(/\s{2,}/g, ' ')
      .trim()
    setPosologyText(merged)
    setPosologyFromSuggestion(merged)
    setPosologySuggestions([])
    setFocusedSuggestionIndex(-1)
  }

  const scrollToFocusedSuggestion = (index: number) => {
    if (index >= 0) {
      suggestionRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }

  const handlePosologyKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const length = posologySuggestions.length
    if (!length) return
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      const next = (focusedSuggestionIndex + 1) % length
      setFocusedSuggestionIndex(next)
      scrollToFocusedSuggestion(next)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      const next = (focusedSuggestionIndex - 1 + length) % length
      setFocusedSuggestionIndex(next)
      scrollToFocusedSuggestion(next)
    } else if (event.key === 'Enter') {
      // While the dropdown is open, Enter only accepts the focused suggestion — it never
      // inserts a newline into the textarea (same as PrescriptionModal's dosage field).
      event.preventDefault()
      event.stopPropagation()
      if (focusedSuggestionIndex >= 0) {
        acceptSuggestion(posologySuggestions[focusedSuggestionIndex])
      }
    } else if (event.key === 'Escape') {
      event.preventDefault()
      event.stopPropagation()
      setPosologySuggestions([])
      setFocusedSuggestionIndex(-1)
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    onSubmit({
      id: draftToModify?.id ?? crypto.randomUUID(),
      medication,
      posologyText,
      quantity,
      durationUnit,
      startDate,
    })
  }

  return (
    <div className="ch-panel-overlay">
      <div className="ch-panel" id="chPrescriptionForm">
        <div className="ch-panel__header">
          {/* Read-only medication card in the header — mirrors PrescriptionModal, which renders
              the medication being prescribed the same way, regulatory badges included. */}
          <MedicationCard medication={medication} handleAddPrescription={() => {}} id="ch-panel-medication-card" readOnly />
          <button type="button" aria-label="Close panel" onClick={onClose}>
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="ch-panel__body">
            <label htmlFor="ch-posology">Posology / instructions</label>
            <div className="ch-posology-wrap">
              <textarea
                id="ch-posology"
                rows={4}
                value={posologyText}
                onChange={(e) => setPosologyText(e.target.value)}
                onKeyDown={handlePosologyKeyDown}
                placeholder="e.g. 1 tablet in the morning and evening"
                required
              />
              {posologySuggestions.length !== 0 && (
                <ul className="suggestionsDropdown" role="listbox" aria-activedescendant={focusedSuggestionIndex >= 0 ? `ch-posology-${focusedSuggestionIndex}` : undefined}>
                  {posologySuggestions.map((posology, index) => (
                    <li key={index} id={`ch-posology-${index}`} ref={(el) => (suggestionRefs.current[index] = el)} className={focusedSuggestionIndex === index ? 'focused' : ''}>
                      <button type="button" onClick={() => acceptSuggestion(posology)}>
                        {posology}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="ch-form-row">
              <div>
                <label htmlFor="ch-quantity">Quantity</label>
                <input id="ch-quantity" type="number" min={1} value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} required />
              </div>
              <div>
                <label htmlFor="ch-duration-unit">Duration unit</label>
                <select id="ch-duration-unit" value={durationUnit} onChange={(e) => setDurationUnit(e.target.value as ChDurationUnit)}>
                  <option value="days">Days</option>
                  <option value="weeks">Weeks</option>
                  <option value="months">Months</option>
                </select>
              </div>
              <div>
                <label htmlFor="ch-start-date">Start date</label>
                <input id="ch-start-date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
              </div>
            </div>
          </div>

          <div className="ch-panel__footer">
            {/* Same button pairing as PrescriptionModal's footer: outlined cancel, primary submit. */}
            <Button title="Cancel" view="outlined" handleClick={onClose} />
            <Button title={draftToModify ? 'Save changes' : 'Add prescription'} view="primary" type="submit" />
          </div>
        </form>
      </div>
    </div>
  )
}
