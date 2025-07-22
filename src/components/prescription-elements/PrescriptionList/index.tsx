import React, { useState } from 'react'
import PrescriptionCard from '../PrescriptionCard'
import Button from '../../form-elements/Button'
import { PrescribedMedicationType } from '../../../types'

import './index.scss'

interface PrescriptionListProps {
  handleModifyPrescription: (medication: PrescribedMedicationType) => void
  handleDeletePrescription: (medication: PrescribedMedicationType) => void
  handleSendPrescriptions: () => Promise<void>
  handlePrintPrescriptions: () => Promise<void>
  prescribedMedications: PrescribedMedicationType[]
}

const PrescriptionList: React.FC<PrescriptionListProps> = ({
  handleModifyPrescription,
  handleDeletePrescription,
  handleSendPrescriptions,
  handlePrintPrescriptions,
  prescribedMedications,
}) => {
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

  const sentPrescriptions = (): PrescribedMedicationType[] => {
    return prescribedMedications.filter((item) => !!item.rid)
  }

  const pendingPrescriptions = (): PrescribedMedicationType[] => {
    return prescribedMedications.filter((item) => !item.rid)
  }

  if (!prescribedMedications) return null

  return (
    <div className="prescriptionsWrap">
      {sentPrescriptions().length !== 0 && (
        <div className="prescriptions">
          <p className="prescriptions__title">Ordonnances envoyées:</p>
          <div className="prescriptions__rows">
            {sentPrescriptions().map((medication, idx) => (
              <PrescriptionCard
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
              view={printing && !sending ? 'withSpinner' : 'outlined'}
              type="submit"
              form="prescriptionForm"
            />
          </div>
        </div>
      )}
      {pendingPrescriptions().length !== 0 && (
        <div className="prescriptions">
          <p className="prescriptions__title">Ordonnances en attente:</p>
          <div className="prescriptions__rows">
            {pendingPrescriptions().map((medication, idx) => (
              <PrescriptionCard
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
              view={printing ? 'withSpinner' : 'outlined'}
              type="submit"
              form="prescriptionForm"
            />
            <Button disabled={printing} title="Send" view={sending && !printing ? 'withSpinner' : 'primary'} type="submit" handleClick={() => spinSend(handleSendPrescriptions)} />
          </div>
        </div>
      )}
    </div>
  )
}

export default PrescriptionList
