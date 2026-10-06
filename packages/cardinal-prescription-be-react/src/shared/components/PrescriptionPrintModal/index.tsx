import React, { useId } from 'react'

import { CloseIcn } from '../../../internal/components/common/Icons'
import { Button } from '../../../internal/components/form-elements/Button'
import { PrescriptionDocumentToPrint } from '../../../internal/components/prescription-elements/PrescriptionDocumentToPrint'
import { t } from '../../services/i18n'
import { HealthcareParty, Patient } from '@icure/be-fhc-lite-api'
import { PrescribedMedicationType } from '../../types'
import { LIBRARY_ROOT_CLASS } from '../../../styles'
import { StyledPrescriptionPrintModal } from './styles'

interface PrintPrescriptionModalProps {
  closeModal: () => void
  prescribedMedications: PrescribedMedicationType[]
  prescriber: HealthcareParty
  patient: Patient
}

export const PrescriptionPrintModal: React.FC<PrintPrescriptionModalProps> = ({ closeModal, prescribedMedications, prescriber, patient }) => {
  const titleId = useId()
  const print = () => {
    const div = document.getElementById('print-container')
    if (div) {
      const newdiv = div.cloneNode(true) as HTMLDivElement
      newdiv.style.cssText = window.getComputedStyle(div).cssText
      newdiv.id = 'new' + div.id
      const hideFrame = document.createElement('iframe')
      hideFrame.style.display = 'none'

      function setPrint() {
        const closePrint = () => {
          document.body.removeChild(hideFrame)
        }
        if (hideFrame.contentWindow && hideFrame.contentDocument) {
          const stylesheets = document.querySelectorAll("link[rel='stylesheet'], style")
          stylesheets.forEach((stylesheet) => {
            hideFrame.contentDocument.head.appendChild(stylesheet.cloneNode(true))
          })
          hideFrame.contentDocument.body.appendChild(newdiv)
          hideFrame.contentWindow.onbeforeunload = closePrint
          hideFrame.contentWindow.onafterprint = closePrint
          hideFrame.contentWindow.print()
        }
      }

      hideFrame.onload = setPrint
      hideFrame.src = 'about:blank'
      document.body.appendChild(hideFrame)
    }
  }

  return (
    <>
      <StyledPrescriptionPrintModal className={`StyledPrescriptionPrintModal ${LIBRARY_ROOT_CLASS}`}>
        <div className="contentWrap">
          <div className="content" role="dialog" aria-modal="true" aria-labelledby={titleId}>
            <div className="content__header">
              <h3 id={titleId}>{t('practitioner.printModal.title')}</h3>

              <button className="content__header__closeIcn" onClick={closeModal} type="button" aria-label={t('prescription.closeDialog')}>
                <CloseIcn />
              </button>
            </div>
            <div className="content__body">
              <div id="print-container">
                <PrescriptionDocumentToPrint prescribedMedications={prescribedMedications} prescriber={prescriber} patient={patient} />
              </div>
            </div>
            <div className="content__footer">
              <Button title={t('practitioner.printModal.close')} type="reset" view={'outlined'} handleClick={closeModal} />
              <Button title={t('practitioner.printModal.print')} type="submit" view={'primary'} handleClick={print} />
            </div>
          </div>
        </div>
      </StyledPrescriptionPrintModal>
    </>
  )
}
