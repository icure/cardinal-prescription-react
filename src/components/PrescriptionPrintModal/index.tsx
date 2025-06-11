import React from 'react'
import Button from '../common/Button'
import PrescriptionsPrint from '../PrescriptionsPrint'

import './index.css'

interface Props {
  closeModal: () => void
  prescribedMedications: any[]
  prescriber: any
  patient: any
}

const PrescriptionPrintModal: React.FC<Props> = ({ closeModal, prescribedMedications, prescriber, patient }) => {
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
    <div className="modal-backdrop" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={closeModal}>
          &times;
        </button>
        <h2>Imprimer la prescription</h2>
        <div id="print-container">
          <PrescriptionsPrint prescribedMedications={prescribedMedications} prescriber={prescriber} patient={patient} />
        </div>
        <div className="buttons">
          <Button title="Imprimer" handleClick={print} view="primary" type="button" />
        </div>
      </div>
    </div>
  )
}

export default PrescriptionPrintModal
