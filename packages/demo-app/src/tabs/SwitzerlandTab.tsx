import React, { useMemo, useState } from 'react'
import { Button, createMedicationProvider, MedicationCard, MedicationSearch, MedicationType, t } from '@icure/cardinal-prescription-be-react'
import { MedIndexClient } from '@icure/medindex-sdk'
import { MEDINDEX_URL } from '../config'
import { ChPrescriptionForm } from './switzerland/ChPrescriptionForm'
import { ChPrescriptionPrintView } from './switzerland/ChPrescriptionPrintView'
import { ChPatient, ChPrescriber, ChPrescriptionDraft } from './switzerland/types'

// Demo identification data for the Swiss ordonnance print layout — the ch counterpart of the
// `hcp`/`patient` constants in BelgiumTab. GLN/RCC are plausibly-shaped placeholders, not real
// registry entries.
const prescriber: ChPrescriber = {
  name: 'Dr méd. Antoine Duchâteau',
  specialty: 'Médecine interne générale',
  street: 'Rue du Rhône 118',
  postalCode: '1204',
  city: 'Genève',
  phone: '+41 22 000 00 00',
  gln: '7601000000001',
  rcc: 'A000001',
}
const patient: ChPatient = {
  name: 'Antoine Duchâteau',
  dateOfBirth: '04.01.1974',
  address: 'Rue du Rhône 118, 1204 Genève',
}

// Switzerland (medINDEX) — independent of Belgium's certificate/auth gating: `ch` is a
// medication-*source* swap only this phase, with no prescription-transmission equivalent yet
// (see docs/plan.md's "ch scope this phase" decision), so this tab needs no certificate/passphrase
// and doesn't route through `PrescriptionModal`/`PrescriptionList`/`PrescriptionPrintModal` (all
// `be`-only components built around `PrescribedMedicationType` and a hard `sdk: SamV2Api` prop —
// see CONTEXT.md). Medication edition, the drafted-prescriptions list, and printing are all
// demo-app-local implementations instead, mirroring the Belgium UX: the edit form presents as a
// right-side panel like `PrescriptionModal`, and printing uses the Swiss ordonnance layout.
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

  // The form edits either a fresh medication (create) or an existing draft (modify) — the ch
  // counterpart of BelgiumTab's create/modify PrescriptionModal moods.
  const [formState, setFormState] = useState<{ medication: MedicationType; draftToModify?: ChPrescriptionDraft }>()
  const [drafts, setDrafts] = useState<ChPrescriptionDraft[]>([])
  const [isPrintViewOpen, setPrintViewOpen] = useState(false)

  const onAddChMedication = (medication: MedicationType) => setFormState({ medication })
  const onModifyDraft = (draft: ChPrescriptionDraft) => setFormState({ medication: draft.medication, draftToModify: draft })
  const onCloseForm = () => setFormState(undefined)
  const onSubmitDraft = (draft: ChPrescriptionDraft) => {
    setDrafts((prev) => (prev.some((existing) => existing.id === draft.id) ? prev.map((existing) => (existing.id === draft.id ? draft : existing)) : [...prev, draft]))
    onCloseForm()
  }
  const onDeleteDraft = (id: string) => setDrafts((prev) => prev.filter((draft) => draft.id !== id))

  return (
    <div className="tab-panel">
      <h2>Switzerland (medINDEX)</h2>
      <div className="element">
        <MedicationSearch
          medicationProvider={chMedicationProvider}
          onAddPrescription={onAddChMedication}
          disableInputEventsTracking={!!formState}
          searchPlaceholder={t('medication.search.unifiedLabel')}
        />
      </div>

      {drafts.length !== 0 && (
        <>
          <div className="dividerApp"></div>
          <div className="element">
            <h3>Prescriptions</h3>
            <ul className="ch-prescription-list">
              {drafts.map((draft) => (
                <li key={draft.id}>
                  <div className="ch-prescription-list__medication">
                    {/* Read-only medication card, like the one PrescriptionModal shows for the
                        medication being prescribed: title, active substances and the regulatory
                        badges (narcotic, cold chain, composition, interactions, ...). */}
                    <MedicationCard medication={draft.medication} handleAddPrescription={() => {}} id={`ch-draft-card-${draft.id}`} readOnly />
                    <p>{draft.posologyText}</p>
                    <p>
                      {draft.quantity} {draft.durationUnit} — starting {draft.startDate}
                    </p>
                  </div>
                  <div className="ch-prescription-list__actions">
                    <Button title="Modify" view="outlined" handleClick={() => onModifyDraft(draft)} />
                    <Button title="Delete" view="outlined" handleClick={() => onDeleteDraft(draft.id)} />
                  </div>
                </li>
              ))}
            </ul>
            <div className="ch-form-actions">
              <Button title="Print" view="primary" handleClick={() => setPrintViewOpen(true)} />
            </div>
          </div>
        </>
      )}

      {formState && <ChPrescriptionForm medication={formState.medication} draftToModify={formState.draftToModify} onClose={onCloseForm} onSubmit={onSubmitDraft} />}
      {isPrintViewOpen && <ChPrescriptionPrintView drafts={drafts} prescriber={prescriber} patient={patient} onClose={() => setPrintViewOpen(false)} />}
    </div>
  )
}
