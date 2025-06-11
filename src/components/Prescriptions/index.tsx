import React, { useState } from 'react'
import PrescriptionRow from '../PrescriptionRow'
import Button from '../common/Button'
import { PrescribedMedicationType } from '../../types'

import './index.css'

interface Props {
  handleModifyPrescription: (medication: PrescribedMedicationType) => void
  handleDeletePrescription: (medication: PrescribedMedicationType) => void
  handleSendPrescriptions: () => Promise<void>
  handlePrintPrescriptions: () => Promise<void>
  prescribedMedications: PrescribedMedicationType[]
}

const Index: React.FC<Props> = ({ handleModifyPrescription, handleDeletePrescription, handleSendPrescriptions, handlePrintPrescriptions, prescribedMedications }) => {
  const [printing, setPrinting] = useState(false)
  const [sending, setSending] = useState(false)

  const spinPrint = async (action: () => Promise<void>) => {
    setPrinting(true)
    await action()
    setPrinting(false)
  }

  const spinSend = async (action: () => Promise<void>) => {
    setSending(true)
    await action()
    setSending(false)
  }

  if (!prescribedMedications) return null

  return (
    <div className="prescriptions">
      <p className="prescriptions__title">Médicaments à prescrire:</p>
      <div className="prescriptions__rows">
        {prescribedMedications.map((medication, idx) => (
          <PrescriptionRow
            key={medication.uuid || idx}
            prescribedMedication={medication}
            handleModifyPrescription={handleModifyPrescription}
            handleDeletePrescription={handleDeletePrescription}
          />
        ))}
      </div>
      <div className="prescriptions__footer">
        <Button
          disabled={sending}
          title="Print"
          handleClick={() => spinPrint(handlePrintPrescriptions)}
          view={printing ? 'busy' : 'outlined'}
          type="submit"
          form="prescriptionForm"
        />
        <Button disabled={printing} title="Send" view={sending ? 'busy' : 'primary'} type="submit" handleClick={() => spinSend(handleSendPrescriptions)} />
      </div>
    </div>
  )
}

export default Index
