import { Tooltip } from '../../../../common/Tooltip'
import { ChevronIcn, LeafIcn, MoleculeIcn, SolidPillIcn } from '../../../../common/Icons'
import React, { FC, useRef } from 'react'
import type { MedicationType } from '../../../../../../shared/types'
import { t } from '../../../../../../shared/services/i18n'
import { MedicationInfographics } from '../../../MedicationInfographics'
import { RegulatoryBadges } from '../../../../common/RegulatoryBadges'
import { StyledCheapBadge, StyledExpandButton, StyledHeader } from './styles'

interface Props {
  handleAddPrescription: () => void
  medication: MedicationType
  isMedicationCardExpanded: boolean
  setMedicationCardExpanded: (status: boolean) => void
  subMedication?: boolean
}

export const Header: FC<Props> = ({ handleAddPrescription, medication, isMedicationCardExpanded, setMedicationCardExpanded, subMedication }) => {
  const medicationCardRef = useRef<HTMLDivElement>(null)

  return (
    <StyledHeader className="StyledHeader" ref={medicationCardRef}>
      <div
        className="medication"
        onClick={handleAddPrescription}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'Enter') handleAddPrescription()
        }}
      >
        <div className="medication__content">
          <div className="medication__content__heading">
            <div className="medication__content__heading__title">
              {!subMedication &&
                (medication.kind === 'product' ? (
                  <Tooltip content={t('medication.drugType.medication')} iconSnippet={<SolidPillIcn />} boundaryBox={medicationCardRef} />
                ) : medication.kind === 'nonMedicinal' ? (
                  <Tooltip content={t('medication.drugType.homologation')} iconSnippet={<LeafIcn />} boundaryBox={medicationCardRef} />
                ) : medication.kind === 'molecule' ? (
                  <Tooltip content={t('medication.drugType.molecule')} iconSnippet={<MoleculeIcn />} boundaryBox={medicationCardRef} />
                ) : null)}

              <h3>{medication.title}</h3>

              {medication.regulatory?.be?.cheapest ? (
                <StyledCheapBadge className="StyledCheapBadge" $variant="cheapest">
                  {t('medication.drugInfographic.cheapest')}
                </StyledCheapBadge>
              ) : medication.regulatory?.be?.cheap ? (
                <StyledCheapBadge className="StyledCheapBadge" $variant="cheap">
                  {t('medication.drugInfographic.cheap')}
                </StyledCheapBadge>
              ) : null}

              <MedicationInfographics medication={medication} boundaryBox={medicationCardRef} />
            </div>

            <p className="medication__content__heading__activeIngredient">{medication.activeIngredient}</p>
          </div>
          <div className="medication__content__description">
            <RegulatoryBadges medication={medication} placement="summary" boundaryBox={medicationCardRef} />
          </div>
        </div>
      </div>

      <StyledExpandButton
        className="StyledExpandButton"
        $isExpanded={isMedicationCardExpanded}
        onClick={(e) => {
          e.stopPropagation()
          setMedicationCardExpanded(!isMedicationCardExpanded)
        }}
        type="button"
      >
        <ChevronIcn />
      </StyledExpandButton>
    </StyledHeader>
  )
}
