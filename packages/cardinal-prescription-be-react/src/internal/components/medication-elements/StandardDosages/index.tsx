import React, { useState } from 'react'
import { marshal, RegimenItem as ParsedRegimenItem } from '@icure/medication-sdk'
import { ChevronIcn, WarningIcn } from '../../common/Icons'
import { t } from '../../../../shared/services/i18n'
import {
  StyledStandardDosages,
  StyledStandardDosagesContent,
  StyledStandardDosagesHeader,
  StyledStandardDosagesHeaderContent,
  StyledStandardDosagesItem,
  StyledStandardDosagesToggle,
} from './styles'

interface StandardDosagesProps {
  dosages: ParsedRegimenItem[]
  language: 'fr' | 'nl' | 'de' | 'en'
  onSelectDosage: (dosage: ParsedRegimenItem) => void
}

export const StandardDosages: React.FC<StandardDosagesProps> = ({ dosages, language, onSelectDosage }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  if (!dosages || dosages.length === 0) {
    return null
  }

  return (
    <StyledStandardDosages className="StyledStandardDosages">
      <StyledStandardDosagesHeader type="button" aria-expanded={isExpanded} onClick={() => setIsExpanded((v) => !v)}>
        <StyledStandardDosagesHeaderContent>
          <WarningIcn />
          {t('medication.drugInfographic.standardDosagesMessage')}
        </StyledStandardDosagesHeaderContent>
        <StyledStandardDosagesToggle aria-hidden="true" $expanded={isExpanded}>
          <ChevronIcn />
        </StyledStandardDosagesToggle>
      </StyledStandardDosagesHeader>

      {isExpanded && (
        <StyledStandardDosagesContent>
          {dosages.map((dosage, index) => (
            <StyledStandardDosagesItem key={index}>
              <button type="button" onClick={() => onSelectDosage(dosage)}>
                {marshal(dosage, language)}
              </button>
            </StyledStandardDosagesItem>
          ))}
        </StyledStandardDosagesContent>
      )}
    </StyledStandardDosages>
  )
}
