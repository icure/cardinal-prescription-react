import { Tooltip } from '../../../../common/Tooltip'
import { ChevronIcn, LeafIcn, MoleculeIcn, SolidPillIcn } from '../../../../common/Icons'
import React, { FC, useRef } from 'react'
import type { MedicationType } from '../../../../../../shared/types'
import { t } from '../../../../../../shared/services/i18n'
import { MedicationInfographics } from '../../../MedicationInfographics'
import { StyledCheapBadge, StyledExpandButton, StyledHeader, StyledTextToIcon } from './styles'

interface Props {
  handleAddPrescription: () => void
  medication: MedicationType
  isMedicationCardExpanded: boolean
  setMedicationCardExpanded: (status: boolean) => void
  subMedication?: boolean
}

export const Header: FC<Props> = ({ handleAddPrescription, medication, isMedicationCardExpanded, setMedicationCardExpanded, subMedication }) => {
  const medicationCardRef = useRef<HTMLDivElement>(null)
  const medicationReimbursement = medication.regulatory?.be?.reimbursements

  const ReimbursementIcn = () => (
    <StyledTextToIcon className="StyledTextToIcon" $color={'green'}>
      <p>{medicationReimbursement?.reimbursementCriterion?.category}</p>
    </StyledTextToIcon>
  )
  const DeliveryConditionsIcn = () => (
    <StyledTextToIcon className="StyledTextToIcon" $color={'orange'}>
      <p>{medication.regulatory?.be?.deliveryModusCode}</p>
    </StyledTextToIcon>
  )
  const PrescriptionConditionsIcn = () => (
    <StyledTextToIcon className="StyledTextToIcon" $color={'red'}>
      <p>{medication.regulatory?.be?.deliveryModusSpecificationCode}</p>
    </StyledTextToIcon>
  )
  const NonApplicableIcn = ({ text, colorGrey }: { text: string; colorGrey?: boolean }) => (
    <StyledTextToIcon className="StyledTextToIcon" $color={colorGrey ? 'grey' : 'green'}>
      <p>{text}</p>
    </StyledTextToIcon>
  )

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
            {medication.regulatory?.be?.price && (
              <>
                <div className="medication__content__description__item">
                  <span>{t('medication.ui.price')}</span>
                  <p className="price">{medication.regulatory.be.price}</p>
                </div>
                <div className="medication__content__description__item">
                  <span> {t('medication.reimbursement.title')}</span>
                  {medicationReimbursement ? <ReimbursementIcn /> : <NonApplicableIcn text={t('medication.reimbursement.non')} colorGrey={true} />}
                </div>
              </>
            )}
            <div className="medication__content__description__item">
              <span>{t('medication.delivery.title')}</span>
              {medication.regulatory?.be?.deliveryModusCode ? <DeliveryConditionsIcn /> : <NonApplicableIcn text={t('medication.delivery.notApplicable')} />}
            </div>
            <div className="medication__content__description__item">
              <span>{t('medication.prescription.title')}</span>
              {medication.regulatory?.be?.deliveryModusSpecificationCode ? <PrescriptionConditionsIcn /> : <NonApplicableIcn text={t('medication.prescription.free')} />}
            </div>
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
