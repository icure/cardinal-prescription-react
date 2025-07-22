import React from 'react'
import Button from '../../form-elements/Button'

import './index.scss'
import { PrescriptionsDocumentToPrint } from '../PrescriptionDocumentToPrint'
import { CloseIcn } from '../../common/Icons/Icons'

interface PrintPrescriptionModalProps {
  closeModal: () => void
  prescribedMedications: any[]
  prescriber: any
  patient: any
}

const PrintPrescriptionModal: React.FC<PrintPrescriptionModalProps> = ({ closeModal, prescribedMedications, prescriber, patient }) => {
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
            hideFrame.contentDocument!.head.appendChild(stylesheet.cloneNode(true))
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
    // <div className="printPrescriptionModal" onClick={closeModal}>
    //   <div className="modal-content" onClick={(e) => e.stopPropagation()}>
    //     <button className="close-button" onClick={closeModal}>
    //       &times;
    //     </button>
    //     <h2>Imprimer la prescription</h2>
    //     <div id="print-container">
    //       <PrescriptionsDocumentToPrint prescribedMedications={prescribedMedications} prescriber={prescriber} patient={patient} />
    //     </div>
    //     <div className="buttons">
    //       <Button title="Imprimer" handleClick={print} view="primary" type="button" />
    //     </div>
    //   </div>
    // </div>
    <div className="printPrescriptionModal">
      <div className="printPrescriptionModal__contentWrap">
        <div className="printPrescriptionModal__content">
          <div className="printPrescriptionModal__content__header">
            <h3>Imprimer la prescription</h3>

            <button className="printPrescriptionModal__content__header__closeIcn" onClick={closeModal} type="reset">
              <CloseIcn />
            </button>
          </div>
          <div className="printPrescriptionModal__content__body">
            <div id="print-container">
              <PrescriptionsDocumentToPrint prescribedMedications={prescribedMedications} prescriber={prescriber} patient={patient} />
            </div>
          </div>
          <div className="printPrescriptionModal__content__footer">
            <Button title="Cancel" type="reset" view={'outlined'} handleClick={closeModal} />
            <Button title="Print" type="submit" view={'primary'} handleClick={print} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrintPrescriptionModal
