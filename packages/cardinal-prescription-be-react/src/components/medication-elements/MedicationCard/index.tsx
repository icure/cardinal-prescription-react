import React, { useState } from 'react'
import type { MedicationType } from '../../../types'
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
}

export const MedicationCard: React.FC<MedicationCardProps> = ({ medication, handleAddPrescription, id, focused, disableHover }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <StyledMedicationCard className="StyledMedicationCard" $focused={focused} $isExpanded={isExpanded} $disableHover={disableHover} id={id}>
      {/*TODO: the medication must be past to the handleAddPrescription function on upper level*/}
      <Header
        handleAddPrescription={() => handleAddPrescription(medication)}
        medication={medication}
        isMedicationCardExpanded={isExpanded}
        setMedicationCardExpanded={(status: boolean) => setIsExpanded(status)}
      />
      {isExpanded && <Extension medication={medication} />}
    </StyledMedicationCard>
  )
}
