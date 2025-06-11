import React, { useState } from 'react'
import './index.css'
import { PrescribedMedicationType } from '../../types'
import { DeleteIcn, EditIcn } from '../common/Icons'
// Replace with actual icon imports
// import { DeleteIcn, EditIcn } from '../icons'

interface Props {
  prescribedMedication: PrescribedMedicationType
  handleModifyPrescription: (medication: PrescribedMedicationType) => void
  handleDeletePrescription: (medication: PrescribedMedicationType) => void
}

const colors = {
  red: 'red',
  blue: '#3D87C5',
  gray: '#383A3C',
}

const PrescriptionRow: React.FC<Props> = ({ prescribedMedication, handleModifyPrescription, handleDeletePrescription }) => {
  const [editIcnColor, setEditIcnColor] = useState(colors.gray)
  const [deleteIcnColor, setDeleteIcnColor] = useState(colors.gray)

  return (
    <div className={`prescriptionRow${prescribedMedication.rid ? ' prescribed' : ''}`}>
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
          <button
            className="actions__btn"
            onClick={() => handleModifyPrescription(prescribedMedication)}
            onMouseEnter={() => setEditIcnColor(colors.blue)}
            onMouseLeave={() => setEditIcnColor(colors.gray)}
          >
            <EditIcn pathFill={editIcnColor} />
          </button>
          <button
            className="actions__btn"
            onClick={() => handleDeletePrescription(prescribedMedication)}
            onMouseEnter={() => setDeleteIcnColor(colors.red)}
            onMouseLeave={() => setDeleteIcnColor(colors.gray)}
          >
            <DeleteIcn pathFill={deleteIcnColor} />
          </button>
        </div>
      ) : (
        <div className="rid">{prescribedMedication.rid}</div>
      )}
    </div>
  )
}

export default PrescriptionRow
