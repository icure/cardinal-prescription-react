import React, { useEffect, useRef } from 'react'
import JsBarcode from 'jsbarcode'
import { PrescribedMedicationType } from '../../../types'
import { dateDecode } from '../../../utils/date-helpers'
import { HealthcareParty, Patient } from '@icure/be-fhc-lite-api'
import './index.scss'

interface Props {
  prescribedMedications: PrescribedMedicationType[]
  prescriber: HealthcareParty
  patient: Patient
}

function chunk<K>(arr: K[], chunkSize = 1, cache: K[][] = []) {
  const tmp = [...arr]
  if (chunkSize <= 0) return cache
  while (tmp.length) cache.push(tmp.splice(0, chunkSize))
  return cache
}

export const PrescriptionsDocumentToPrint: React.FC<Props> = ({ prescribedMedications, prescriber, patient }) => {
  const chunks = chunk(prescribedMedications, 4)
  const ridElements = useRef<(SVGSVGElement | null)[]>([])

  useEffect(() => {
    prescribedMedications.forEach((med, idx) => {
      if (med.rid && ridElements.current[idx]) {
        JsBarcode(ridElements.current[idx], med.rid, {
          format: 'CODE128A',
          lineColor: '#000',
          width: 2,
          height: 40,
          displayValue: true,
        })
      }
    })
  }, [prescribedMedications])

  const formatDate = (date: number | undefined): string | 0 => {
    return (date && dateDecode(date)?.toLocaleDateString()) ?? '-'
  }

  return (
    <div className="prescriptionsHolder">
      {prescribedMedications?.length
        ? chunks.map((chunk, chunkIndex) => (
            <div className="prescription" key={chunkIndex}>
              <div className="header">
                <h1>PREUVE DE PRESCRIPTION ELECTRONIQUE</h1>
                <p>Veuillez présenter ce document à votre pharmacien pour scanner le code-barres et vous délivrer les médicaments prescrits.</p>
              </div>
              <div className="divider"></div>
              <div className="options">
                <p>
                  <strong>De quelles options disposez-vous pour vous rendre à la pharmacie si vous avez perdu ce document ?</strong>
                </p>
                <ol>
                  <li>Via Masanté.be - MyHealthViewer - App MesMédicaments ou toute autre App, vous pouvez montrer votre prescription au pharmacien, qui lira le code-barres.</li>
                  <li>
                    Vous pouvez également aller chercher les produits prescrits avec votre eID (ou votre numéro de registre national si votre eID a été lue par le pharmacien qui
                    vous délivre les produits dans les 15 mois précédents).
                  </li>
                </ol>
              </div>
              <div className="divider"></div>

              <div className="prescription-section">
                <div className="prescription-section__persons">
                  <p>
                    <strong>Prescripteur :</strong> {prescriber.lastName} {prescriber.firstName} {prescriber.nihii}
                  </p>
                  <p>
                    <strong>Bénéficiaire :</strong> {patient.lastName} {patient.firstName} {patient.ssin}
                  </p>
                </div>
                <h3>Contenu de la prescription électronique</h3>
                {chunk.map((prescription, prescriptionIndex) => (
                  <div className="prescription-item" key={prescriptionIndex}>
                    <div className="prescription-item__block">
                      <p>
                        Produit :<strong>{prescription.medication.medicinalProduct?.intendedname}</strong>
                      </p>
                      <p>Posologie :{prescription.medication.instructionForPatient}</p>
                      <p>Date de début :{formatDate(prescription.medication.beginMoment)}</p>
                      <p>
                        Date de fin pour l`exécution
                        {prescription.medication.endMoment ? formatDate(prescription.medication.endMoment) : '-'}
                      </p>
                    </div>
                    <div className="prescription-item__block prescription-item__block--right">
                      <strong className="ridTitle">RID {prescriptionIndex + 1}</strong>
                      <div className="barcode">
                        <svg ref={(el) => (ridElements.current[chunkIndex * 4] = el)} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        : null}
    </div>
  )
}
