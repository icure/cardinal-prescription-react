import React from 'react'
import { PrescribedMedicationType } from '../../../types'
import { DeleteIcn, EditIcn } from '../../common/Icons'
import { StyledPrescriptionCard } from './styles'

interface PrescriptionCardProps {
  prescribedMedication: PrescribedMedicationType
  handleModifyPrescription: (medication: PrescribedMedicationType) => void
  handleDeletePrescription: (medication: PrescribedMedicationType) => void
}

export const PrescriptionCard: React.FC<PrescriptionCardProps> = ({ prescribedMedication, handleModifyPrescription, handleDeletePrescription }) => {
  return (
    <StyledPrescriptionCard className="StyledPrescriptionCard" $prescribed={!!prescribedMedication.rid}>
      <div className="header">
        <div className="header__prescription">
          <div className="header__prescription__content">
            <div className="header__prescription__content__title">
              <h3>
                {prescribedMedication.medication.medicinalProduct?.intendedname ??
                  prescribedMedication.medication.substanceProduct?.intendedname ??
                  prescribedMedication.medication.compoundPrescription}
              </h3>
            </div>
            <p>{prescribedMedication.medication.instructionForPatient}</p>
          </div>
        </div>
      </div>

      {!prescribedMedication.rid ? (
        <div className="actions">
          <button className="edit" onClick={() => handleModifyPrescription(prescribedMedication)}>
            <EditIcn />
          </button>
          <button className="delete" onClick={() => handleDeletePrescription(prescribedMedication)}>
            <DeleteIcn />
          </button>
        </div>
      ) : (
        <div className="rid">{prescribedMedication.rid}</div>
      )}
    </StyledPrescriptionCard>
  )
}
