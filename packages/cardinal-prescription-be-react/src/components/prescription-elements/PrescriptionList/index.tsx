import React, { useState } from 'react'

import { PrescribedMedicationType } from '../../../types'
import { PrescriptionCard } from '../PrescriptionCard'
import { Button } from '../../form-elements/Button'
import { t } from '../../../services/i18n'
import { GlobalStyles } from '../../../styles'
import { StyledPrescriptionList } from './styles'

interface PrescriptionListProps {
  handleModifyPrescription: (medication: PrescribedMedicationType) => void
  handleDeletePrescription: (medication: PrescribedMedicationType) => void
  prescribedMedications: PrescribedMedicationType[]
  handleSendPrescriptions?: () => Promise<void>
  handlePrintPrescriptions?: () => Promise<void>
  hideSectionsTitles?: boolean
}

export const PrescriptionList: React.FC<PrescriptionListProps> = ({
  handleModifyPrescription,
  handleDeletePrescription,
  handleSendPrescriptions,
  handlePrintPrescriptions,
  prescribedMedications,
  hideSectionsTitles,
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
    <>
      <GlobalStyles />
      <StyledPrescriptionList className="StyledPrescriptionList">
        {sentPrescriptions().length !== 0 && (
          <div className="cardinal-prescriptions">
            {!hideSectionsTitles && <p className="cardinal-prescriptions__title">{t('prescription.list.sentTitle')}</p>}
            <div className="cardinal-prescriptions__rows">
              {sentPrescriptions().map((medication, idx) => (
                <PrescriptionCard
                  key={medication.uuid || idx}
                  prescribedMedication={medication}
                  handleModifyPrescription={handleModifyPrescription}
                  handleDeletePrescription={handleDeletePrescription}
                />
              ))}
            </div>
            {handlePrintPrescriptions && (
              <div className="cardinal-prescriptions__footer">
                <Button
                  disabled={sending}
                  title={t('prescription.list.print')}
                  handleClick={() => spinPrint(handlePrintPrescriptions)}
                  view={printing && !sending ? 'withSpinner' : 'outlined'}
                  type="button"
                />
              </div>
            )}
          </div>
        )}
        {pendingPrescriptions().length !== 0 && (
          <div className="cardinal-prescriptions">
            {!hideSectionsTitles && <p className="cardinal-prescriptions__title"> {t('prescription.list.pendingTitle')}</p>}
            <div className="cardinal-prescriptions__rows">
              {pendingPrescriptions().map((medication, idx) => (
                <PrescriptionCard
                  key={medication.uuid || idx}
                  prescribedMedication={medication}
                  handleModifyPrescription={handleModifyPrescription}
                  handleDeletePrescription={handleDeletePrescription}
                />
              ))}
            </div>
            {(handlePrintPrescriptions || handleSendPrescriptions) && (
              <div className="cardinal-prescriptions__footer">
                {handlePrintPrescriptions && (
                  <Button
                    disabled={sending}
                    title={t('prescription.list.sendAndPrint')}
                    handleClick={() => spinPrint(handlePrintPrescriptions)}
                    view={printing ? 'withSpinner' : 'outlined'}
                    type="submit"
                    form="prescriptionForm"
                  />
                )}
                {handleSendPrescriptions && (
                  <Button
                    disabled={printing}
                    title={t('prescription.list.send')}
                    view={sending && !printing ? 'withSpinner' : 'primary'}
                    type="submit"
                    handleClick={() => spinSend(handleSendPrescriptions)}
                  />
                )}
              </div>
            )}
          </div>
        )}
      </StyledPrescriptionList>
    </>
  )
}
