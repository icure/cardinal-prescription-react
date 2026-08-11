import React from 'react'
import { Button } from '@icure/cardinal-prescription-be-react'
import { ChPatient, ChPrescriber, ChPrescriptionDraft } from './types'

interface ChPrescriptionPrintViewProps {
  drafts: ChPrescriptionDraft[]
  prescriber: ChPrescriber
  patient: ChPatient
  onClose: () => void
}

const durationLabel = (draft: ChPrescriptionDraft) => `${draft.quantity} ${draft.durationUnit}`

// The Swiss ordonnance layout: prescriber block (with GLN and RCC numbers), patient block, place
// and date, the prescribed items, and a signature area. There is no recip-e equivalent for `ch`
// (no barcode, no RID, nothing is transmitted) — printing uses the browser's native
// `window.print()`, with the `ch-print-view`/`ch-no-print` classes wired up in index.css so only
// this block's content survives when the browser print dialog renders the page.
export const ChPrescriptionPrintView: React.FC<ChPrescriptionPrintViewProps> = ({ drafts, prescriber, patient, onClose }) => {
  return (
    <div className="ch-modal-overlay">
      <div className="ch-print-view">
        <div className="ch-print-actions ch-no-print">
          <Button title="Print" view="primary" handleClick={() => window.print()} />
          <Button title="Close" view="outlined" handleClick={onClose} />
        </div>

        <div className="ch-ordonnance__parties">
          <div className="ch-ordonnance__prescriber">
            <strong>{prescriber.name}</strong>
            <p>{prescriber.specialty}</p>
            <p>{prescriber.street}</p>
            <p>
              {prescriber.postalCode} {prescriber.city}
            </p>
            <p>Tél. {prescriber.phone}</p>
            <p>
              GLN {prescriber.gln} — RCC {prescriber.rcc}
            </p>
          </div>
          <div className="ch-ordonnance__patient">
            <strong>Patient</strong>
            <p>{patient.name}</p>
            <p>Né(e) le {patient.dateOfBirth}</p>
            <p>{patient.address}</p>
          </div>
        </div>

        <h2>Ordonnance médicale</h2>
        <p className="ch-ordonnance__place-date">
          {prescriber.city}, le {new Date().toLocaleDateString('fr-CH')}
        </p>

        {drafts.length === 0 && <p>No prescriptions to print.</p>}
        {drafts.map((draft) => (
          <div key={draft.id} className="ch-print-item">
            <h3>℞ {draft.medication.title}</h3>
            <p>{draft.posologyText}</p>
            <p>
              Quantity/duration: {durationLabel(draft)} — Start date: {draft.startDate}
            </p>
          </div>
        ))}

        <div className="ch-ordonnance__signature">
          <p>Signature</p>
          <div className="ch-ordonnance__signature-line"></div>
        </div>
      </div>
    </div>
  )
}
