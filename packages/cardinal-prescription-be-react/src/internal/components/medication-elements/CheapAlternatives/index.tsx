import React, { useState } from 'react'
import { SamV2Api } from '@icure/cardinal-be-sam-sdk'
import { MedicationType } from '../../../../shared/types'
import { loadVmpGroup } from '../../../../shared/services/cardinal-sam'
import { ChevronIcn, WarningIcn } from '../../common/Icons'
import { t } from '../../../../shared/services/i18n'
import {
  StyledCheapAlternatives,
  StyledCheapAlternativesContent,
  StyledCheapAlternativesHeader,
  StyledCheapAlternativesHeaderContent,
  StyledCheapAlternativesItem,
  StyledCheapAlternativesToggle,
} from './styles'

interface CheapAlternativesProps {
  sdk: SamV2Api
  medications: MedicationType[]
  onSelectMedication: (medication: MedicationType) => void
}

export const CheapAlternatives: React.FC<CheapAlternativesProps> = ({ sdk, medications, onSelectMedication }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isCheap, setIsCheap] = useState(false)

  if (!medications || medications.length === 0) {
    return null
  }

  const onMedicationClick = async (medication: MedicationType) => {
    setIsCheap(true)
    const vmpGroupCode = medication.regulatory?.be?.vmp?.vmpGroup?.code
    const vmpGroup = vmpGroupCode ? await loadVmpGroup(sdk, vmpGroupCode) : undefined
    onSelectMedication({ ...medication, regulatory: { ...medication.regulatory, be: { ...medication.regulatory?.be, vmpGroup } } })
  }

  return (
    <StyledCheapAlternatives>
      <StyledCheapAlternativesHeader type="button" aria-expanded={isExpanded} onClick={() => setIsExpanded((v) => !v)}>
        <StyledCheapAlternativesHeaderContent>
          <WarningIcn />
          <span>{isCheap ? t('medication.drugInfographic.otherCheapAlternativesMessage') : t('medication.drugInfographic.cheapAlternativesMessage')}</span>
        </StyledCheapAlternativesHeaderContent>
        <StyledCheapAlternativesToggle aria-hidden="true" $expanded={isExpanded}>
          <ChevronIcn />
        </StyledCheapAlternativesToggle>
      </StyledCheapAlternativesHeader>

      {isExpanded && (
        <StyledCheapAlternativesContent>
          {medications.map((medication, index) => (
            <StyledCheapAlternativesItem key={medication.id ?? index}>
              <button type="button" onClick={() => onMedicationClick(medication)}>
                {medication.title}
              </button>
            </StyledCheapAlternativesItem>
          ))}
        </StyledCheapAlternativesContent>
      )}
    </StyledCheapAlternatives>
  )
}
