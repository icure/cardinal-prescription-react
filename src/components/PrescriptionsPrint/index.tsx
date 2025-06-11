import React, { useEffect, useRef } from 'react'
import JsBarcode from 'jsbarcode'
import './index.css'

interface Medication {
  beginMoment?: number
  endMoment?: number
}

interface PrescribedMedicationType {
  rid?: string
  medication: Medication
}

interface Prescriber {
  lastName: string
  firstName: string
  nihii: string
}

interface Patient {
  lastName: string
  firstName: string
  ssin: string
}

interface Props {
  prescribedMedications: PrescribedMedicationType[]
  prescriber: Prescriber
  patient: Patient
}

function chunk<K>(arr: K[], chunkSize = 1, cache: K[][] = []) {
  const tmp = [...arr]
  if (chunkSize <= 0) return cache
  while (tmp.length) cache.push(tmp.splice(0, chunkSize))
  return cache
}

function dateDecode(ts?: number): Date | undefined {
  if (!ts) return undefined
  // Example: 20230601 -> 2023-06-01
  const str = ts.toString()
  if (str.length !== 8) return undefined
  const year = +str.slice(0, 4)
  const month = +str.slice(4, 6) - 1
  const day = +str.slice(6, 8)
  return new Date(year, month, day)
}

const PrescriptionsPrint: React.FC<Props> = ({ prescribedMedications, prescriber, patient }) => {
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

  return (
    <>
      {prescribedMedications?.length
        ? chunks.map((chunk, chunkIndex) => (
            <div className="prescription" key={chunkIndex}>
              <div className="header">
                <h1>PREUVE DE PRESCRIPTION ELECTRONIQUE</h1>
                <p>Veuillez présenter ce document à votre pharmacien pour scanner le code-barres et vous délivrer les médicaments prescrits.</p>
              </div>

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

              <div className="prescription-section">
                <p>
                  <strong>Prescripteur :</strong> {prescriber.lastName} {prescriber.firstName} {prescriber.nihii}
                  &nbsp;&nbsp;&nbsp;
                  <strong>Bénéficiaire :</strong> {patient.lastName} {patient.firstName} {patient.ssin}
                </p>

                <h3>Contenu de la prescription électronique</h3>

                <div className="prescription-item">
                  <div>
                    <p>
                      <strong>Produit 1</strong>
                    </p>
                    <p>Date :{(chunk[0]?.medication.beginMoment && dateDecode(chunk[0].medication.beginMoment)?.toLocaleDateString()) || '-'}</p>
                    <p>Date de fin pour l&apos;exécution :{chunk[0]?.medication.endMoment ? chunk[0]?.medication.endMoment : '-'}</p>
                  </div>
                  <div>
                    <div className="right">
                      <strong>RID 1</strong>
                    </div>
                    <div className="barcode right">
                      <svg ref={(el) => (ridElements.current[chunkIndex * 4] = el)} />
                    </div>
                  </div>
                </div>

                {chunk[1] && (
                  <div className="prescription-item">
                    <div>
                      <div>
                        <strong>RID 2</strong>
                      </div>
                      <div className="barcode">
                        <svg ref={(el) => (ridElements.current[chunkIndex * 4 + 1] = el)} />
                      </div>
                    </div>
                    <div>
                      <p>
                        <strong>Produit 2</strong>
                      </p>
                      <p>Date :{(chunk[1]?.medication.beginMoment && dateDecode(chunk[1].medication.beginMoment)?.toLocaleDateString()) || '-'}</p>
                      <p>Date de fin pour l&apos;exécution :{chunk[1]?.medication.endMoment ? chunk[1]?.medication.endMoment : '-'}</p>
                    </div>
                  </div>
                )}

                {chunk[2] && (
                  <div className="prescription-item">
                    <div>
                      <p>
                        <strong>Produit 3</strong>
                      </p>
                      <p>Date :{(chunk[2]?.medication.beginMoment && dateDecode(chunk[2].medication.beginMoment)?.toLocaleDateString()) || '-'}</p>
                      <p>Date de fin pour l&apos;exécution :{chunk[2]?.medication.endMoment ? chunk[2]?.medication.endMoment : '-'}</p>
                    </div>
                    <div>
                      <div className="right">
                        <strong>RID 3</strong>
                      </div>
                      <div className="barcode right">
                        <svg ref={(el) => (ridElements.current[chunkIndex * 4 + 2] = el)} />
                      </div>
                    </div>
                  </div>
                )}

                {chunk[3] && (
                  <div className="prescription-item">
                    <div>
                      <div>
                        <strong>RID 4</strong>
                      </div>
                      <div className="barcode">
                        <svg ref={(el) => (ridElements.current[chunkIndex * 4 + 3] = el)} />
                      </div>
                    </div>
                    <div>
                      <p>
                        <strong>Produit 4</strong>
                      </p>
                      <p>Date :{(chunk[3]?.medication.beginMoment && dateDecode(chunk[3].medication.beginMoment)?.toLocaleDateString()) || '-'}</p>
                      <p>Date de fin pour l&apos;exécution :{chunk[3]?.medication.endMoment ? chunk[3]?.medication.endMoment : '-'}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        : null}
    </>
  )
}

export default PrescriptionsPrint
