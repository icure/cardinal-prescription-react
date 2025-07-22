import React from 'react'

import { CloseIcn } from '../../common/Icons'
import { Button } from '../../form-elements/Button'
import { PrescriptionDocumentToPrint } from '../PrescriptionDocumentToPrint'
import { t } from '../../../services/i18n'
import { HealthcareParty, Patient } from '@icure/be-fhc-lite-api'
import { PrescribedMedicationType } from '../../../types'
import { GlobalStyles } from '../../../styles'
import { StyledPrescriptionPrintModal } from './styles'

interface PrintPrescriptionModalProps {
  closeModal: () => void
  prescribedMedications: PrescribedMedicationType[]
  prescriber: HealthcareParty
  patient: Patient
}

export const PrescriptionPrintModal: React.FC<PrintPrescriptionModalProps> = ({ closeModal, prescribedMedications, prescriber, patient }) => {
  const print = () => {
    const div = document.getElementById('print-container')
    if (div) {
      const newdiv = div.cloneNode(true) as HTMLDivElement
      newdiv.style.cssText = window.getComputedStyle(div).cssText
      newdiv.id = 'new' + div.id
      const hideFrame = document.createElement('iframe')

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
      hideFrame.style.display = 'none'
      document.body.appendChild(hideFrame)
    }
  }

  return (
    <>
      <GlobalStyles />
      <StyledPrescriptionPrintModal className="StyledPrescriptionPrintModal">
        <div className="contentWrap">
          <div className="content">
            <div className="content__header">
              <h3>{t('practitioner.printModal.title')}</h3>

              <button className="content__header__closeIcn" onClick={closeModal} type="reset">
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
