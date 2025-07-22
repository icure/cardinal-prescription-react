import React, { useEffect, useRef } from 'react'
import JsBarcode from 'jsbarcode'
import { PrescribedMedicationType } from '../../../types'
import { dateDecode } from '../../../utils/date-helpers'
import { HealthcareParty, Patient } from '@icure/be-fhc-lite-api'
import { t } from '../../../services/i18n'
import { StyledPrescriptionDocument } from './styles'
import { trim } from '../../../utils/string-helpers'

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

export const PrescriptionDocumentToPrint: React.FC<Props> = ({ prescribedMedications, prescriber, patient }) => {
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
    <StyledPrescriptionDocument className="StyledPrescriptionDocument">
      {prescribedMedications?.length
        ? chunks.map((chunk, chunkIndex) => (
            <div className="prescription" key={chunkIndex}>
              <div className="header">
                <h1>{t('prescription.pdf.title')}</h1>
                <p>{t('prescription.pdf.instructions')}</p>
              </div>
              <div className="divider"></div>
              <div className="options">
                <h5>
                  <strong>{t('prescription.pdf.options.title')}</strong>
                </h5>
                <ol>
                  <li>{t('prescription.pdf.options.option1')}</li>
                  <li>{t('prescription.pdf.options.option2')}</li>
                </ol>
              </div>
              <div className="divider"></div>

              <div className="prescription-section">
                <div className="prescription-section__persons">
                  <p>
                    <strong>{t('prescription.pdf.prescriber')}: </strong>
                    {prescriber.lastName} {prescriber.firstName} {prescriber.nihii}
                  </p>
                  <p>
                    <strong>{t('prescription.pdf.patient')}: </strong>
                    {patient.lastName} {patient.firstName} {patient.ssin}
                  </p>
                </div>
                <h3>{t('prescription.pdf.electronicContent')}</h3>
                {chunk.map((prescription, prescriptionIndex) => (
                  <div className="prescription-item" key={prescriptionIndex}>
                    <div className="prescription-item__block">
                      <p>
                        {t('prescription.pdf.product')} {''}
                        <strong>
                          {trim(
                            prescription.medication.medicinalProduct?.intendedname ??
                              prescription.medication?.substanceProduct?.intendedname ??
                              prescription.medication?.compoundPrescription ??
                              '',
                          )}
                        </strong>
                      </p>
                      <p>
                        {t('prescription.pdf.dosage')} {prescription.medication.instructionForPatient}
                      </p>
                      <p>
                        {t('prescription.pdf.date')} {formatDate(prescription.medication.beginMoment)}
                      </p>
                      <p>
                        {t('prescription.pdf.validUntil')} {prescription.medication.endMoment ? formatDate(prescription.medication.endMoment) : '-'}
                      </p>
                    </div>
                    <div className="prescription-item__block prescription-item__block--right">
                      <strong className="ridTitle">RID {prescriptionIndex + 1}</strong>
                      <div className="barcode">
                        <svg ref={(el) => (ridElements.current[chunkIndex * 4 + prescriptionIndex] = el)} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        : null}
    </StyledPrescriptionDocument>
  )
}
