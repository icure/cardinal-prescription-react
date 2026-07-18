import React, { useState } from 'react'
import { MedicationType } from '@icure/cardinal-prescription-be-react'
import { ChDurationUnit, ChPrescriptionDraft } from './types'

interface ChPrescriptionFormProps {
  medication: MedicationType
  onClose: () => void
  onSubmit: (draft: ChPrescriptionDraft) => void
}

const today = () => new Date().toISOString().slice(0, 10)

// A simple, demo-app-local stand-in for the library's `PrescriptionModal`. `ch` has no structured
// posology parser or FHC/recip-e transmission this phase (see CONTEXT.md / docs/plan.md), so this
// intentionally only captures freeform text plus a quantity/duration/start-date — enough to
// represent "editing a prescription entry" without wiring anything Belgium-specific.
export const ChPrescriptionForm: React.FC<ChPrescriptionFormProps> = ({ medication, onClose, onSubmit }) => {
  const [posologyText, setPosologyText] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [durationUnit, setDurationUnit] = useState<ChDurationUnit>('days')
  const [startDate, setStartDate] = useState(today())

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    onSubmit({
      id: crypto.randomUUID(),
      medication,
      posologyText,
      quantity,
      durationUnit,
      startDate,
    })
  }

  return (
    <div className="ch-modal-overlay">
      <div className="ch-modal">
        <h3>{medication.title}</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="ch-posology">Posology / instructions</label>
          <textarea
            id="ch-posology"
            rows={4}
            value={posologyText}
            onChange={(e) => setPosologyText(e.target.value)}
            placeholder="e.g. 1 tablet in the morning and evening"
            required
          />

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

          <div className="ch-form-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Add prescription</button>
          </div>
        </form>
      </div>
    </div>
  )
}
