import React, { useState } from 'react'
import type { MedicationType } from '../../../../shared/types'
import { Header } from './medication-card-elements/Header'
import { Extension } from './medication-card-elements/Extension'
import { StyledMedicationCard } from './styles'

interface MedicationCardProps {
  medication: MedicationType
  handleAddPrescription: (medication: MedicationType) => void
  id: string
  focused?: boolean
  disableHover?: boolean
  short?: boolean
  subMedication?: boolean
  // Read-only rendering (used in the prescription modal, like the angular implementation):
  // not clickable, no summary badges, no expand arrow, never expandable.
  readOnly?: boolean
}

export const MedicationCard: React.FC<MedicationCardProps> = ({ medication, handleAddPrescription, id, focused, disableHover, subMedication, readOnly }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <StyledMedicationCard className="StyledMedicationCard" $focused={focused} $isExpanded={isExpanded} $disableHover={disableHover} $subMedication={subMedication} id={id}>
      <Header
        handleAddPrescription={() => handleAddPrescription(medication)}
        medication={medication}
        isMedicationCardExpanded={isExpanded}
        setMedicationCardExpanded={(status: boolean) => setIsExpanded(status)}
        subMedication={subMedication}
        readOnly={readOnly}
      />
      {isExpanded && !readOnly && <Extension medication={medication} />}
    </StyledMedicationCard>
  )
}
