import React from 'react'
import { ChPrescriptionDraft } from './types'

interface ChPrescriptionPrintViewProps {
  drafts: ChPrescriptionDraft[]
  onClose: () => void
}

const durationLabel = (draft: ChPrescriptionDraft) => `${draft.quantity} ${draft.durationUnit}`

// A demo-app-local stand-in for the library's `PrescriptionPrintModal` — no barcode, no RID, no
// recip-e, just a printable summary of the drafted `ch` prescriptions, using the browser's native
// `window.print()`. The `ch-print-view`/`ch-no-print` classes are wired up in index.css so only
// this block's content survives when the browser print dialog renders the page.
export const ChPrescriptionPrintView: React.FC<ChPrescriptionPrintViewProps> = ({ drafts, onClose }) => {
  return (
    <div className="ch-modal-overlay">
      <div className="ch-print-view">
        <div className="ch-print-actions ch-no-print">
          <button type="button" onClick={() => window.print()}>
            Print
          </button>
          <button type="button" onClick={onClose}>
            Close
          </button>
        </div>

        <h2>Prescriptions</h2>
        {drafts.length === 0 && <p>No prescriptions to print.</p>}
        {drafts.map((draft) => (
          <div key={draft.id} className="ch-print-item">
            <h3>{draft.medication.title}</h3>
            <p>{draft.posologyText}</p>
            <p>
              Quantity/duration: {durationLabel(draft)} — Start date: {draft.startDate}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
