import React, { useMemo, useState } from 'react'
import { createMedicationProvider, MedicationSearch, MedicationType } from '@icure/cardinal-prescription-be-react'
import { MedIndexClient } from '@icure/medindex-sdk'
import { MEDINDEX_URL } from '../config'
import { ChPrescriptionForm } from './switzerland/ChPrescriptionForm'
import { ChPrescriptionPrintView } from './switzerland/ChPrescriptionPrintView'
import { ChPrescriptionDraft } from './switzerland/types'

// Switzerland (medINDEX) — independent of Belgium's certificate/auth gating: `ch` is a
// medication-*source* swap only this phase, with no prescription-transmission equivalent yet
// (see docs/plan.md's "ch scope this phase" decision), so this tab needs no certificate/passphrase
// and doesn't route through `PrescriptionModal`/`PrescriptionList`/`PrescriptionPrintModal` (all
// `be`-only components built around `PrescribedMedicationType` and a hard `sdk: SamV2Api` prop —
// see CONTEXT.md). Medication edition, the drafted-prescriptions list, and printing are all
// demo-app-local implementations instead.
export const SwitzerlandTab = () => {
  // The `ch` (Switzerland/medINDEX) MedicationProvider — independent of the `be` certificate/auth
  // gating, since medINDEX is public reference data with no auth. Unlike the `be` SAM sdk,
  // `MedIndexClient` needs no async initialization, so this can be built synchronously on mount
  // with `useMemo` alone, no `useEffect` required.
  //
  // `fetch: window.fetch.bind(window)` works around a bug in `@icure/medindex-sdk` (confirmed via
  // live testing): its `MedIndexHttpClient` defaults to the bare global `fetch` reference, which
  // browsers call detached from `window`, throwing `TypeError: Failed to execute 'fetch' on
  // 'Window': Illegal invocation`. Passing an explicitly bound `fetch` avoids this without
  // touching the SDK or the library.
  const chMedicationProvider = useMemo(
    () => createMedicationProvider({ country: 'ch', client: new MedIndexClient({ baseUrl: MEDINDEX_URL, fetch: window.fetch.bind(window) }) }),
    [],
  )

  const [medicationBeingAdded, setMedicationBeingAdded] = useState<MedicationType>()
  const [drafts, setDrafts] = useState<ChPrescriptionDraft[]>([])
  const [isPrintViewOpen, setPrintViewOpen] = useState(false)

  const onAddChMedication = (medication: MedicationType) => setMedicationBeingAdded(medication)
  const onCloseForm = () => setMedicationBeingAdded(undefined)
  const onSubmitDraft = (draft: ChPrescriptionDraft) => {
    setDrafts((prev) => [...prev, draft])
    onCloseForm()
  }
  const onDeleteDraft = (id: string) => setDrafts((prev) => prev.filter((draft) => draft.id !== id))

  return (
    <div>
      <h2>Switzerland (medINDEX)</h2>
      <div className="element">
        <MedicationSearch medicationProvider={chMedicationProvider} onAddPrescription={onAddChMedication} disableInputEventsTracking={!!medicationBeingAdded} />
      </div>

      {drafts.length !== 0 && (
        <>
          <div className="dividerApp"></div>
          <div className="element">
            <h3>Prescriptions</h3>
            <ul className="ch-prescription-list">
              {drafts.map((draft) => (
                <li key={draft.id}>
                  <div>
                    <strong>{draft.medication.title}</strong>
                    <p>{draft.posologyText}</p>
                    <p>
                      {draft.quantity} {draft.durationUnit} — starting {draft.startDate}
                    </p>
                  </div>
                  <button type="button" onClick={() => onDeleteDraft(draft.id)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
            <button type="button" onClick={() => setPrintViewOpen(true)}>
              Print
            </button>
          </div>
        </>
      )}

      {medicationBeingAdded && <ChPrescriptionForm medication={medicationBeingAdded} onClose={onCloseForm} onSubmit={onSubmitDraft} />}
      {isPrintViewOpen && <ChPrescriptionPrintView drafts={drafts} onClose={() => setPrintViewOpen(false)} />}
    </div>
  )
}
