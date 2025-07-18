import { Tooltip } from '../../../../common/Tooltip'
import {
  BlackTriangleIcn,
  ChevronIcn,
  EndOfCommercialisationIcn,
  LeafIcn,
  MoleculeIcn,
  OrangeTriangleIcn,
  PillsBottleIcn,
  PrescriptionIcn,
  SolidPillIcn,
  StartOfCommercialisationIcn,
  SupplyIcn,
} from '../../../../common/Icons'
import { RmaProfessionalLinkContent } from '../../infographic-elements/RmaProfessionalLinkContent'
import { SupplyProblemsContent } from '../../infographic-elements/SupplyProblemsContent'
import { EndOfCommercialisationContent } from '../../infographic-elements/EndOfCommercialisationContent'
import { StartOfCommercialisationContent } from '../../infographic-elements/StartOfCommercialisationContent'
import { ReimbursementsContent } from '../../infographic-elements/ReimbursementsContent'
import { DeliveryConditionsContent } from '../../infographic-elements/DeliveryConditionsContent'
import { PrescriptionConditionsContent } from '../../infographic-elements/PrescriptionConditionsContent'
import React, { FC, useRef } from 'react'
import type { MedicationType } from '../../../../../types'
import { getSamTextTranslation, t } from '../../../../../services/i18n'
import { StyledExpandButton, StyledHeader, StyledTextToIcon } from './styles'

interface Props {
  handleAddPrescription: () => void
  medication: MedicationType
  isMedicationCardExpanded: boolean
  setMedicationCardExpanded: (status: boolean) => void
}

export const Header: FC<Props> = ({ handleAddPrescription, medication, isMedicationCardExpanded, setMedicationCardExpanded }) => {
  const medicationCardRef = useRef<HTMLDivElement>(null)
  const medicationCommercialization = medication.commercializations?.[0]
  const medicationSupplyProblem = medication.supplyProblems?.[0]
  const medicationReimbursement = medication.reimbursements

  const getSpecialRegulation = (code?: number) => {
    switch (code) {
      case 1:
        return t('medication.drugSpecialRegulation.noNarcoticRegulation')
      case 2:
        return t('medication.drugSpecialRegulation.narcoticRegulation')
      default:
        return t('medication.drugSpecialRegulation.noSpecialRegulation')
    }
  }

  const ReimbursementIcn = () => (
    <StyledTextToIcon $color={'green'}>
      <p>{medicationReimbursement.reimbursementCriterion?.category}</p>
    </StyledTextToIcon>
  )
  const DeliveryConditionsIcn = () => (
    <StyledTextToIcon $color={'orange'}>
      <p>{medication.deliveryModusCode}</p>
    </StyledTextToIcon>
  )
  const PrescriptionConditionsIcn = () => (
    <StyledTextToIcon $color={'red'}>
      <p>{medication.deliveryModusSpecificationCode}</p>
    </StyledTextToIcon>
  )
  const NonApplicableIcn = ({ text, colorGrey }: { text: string; colorGrey?: boolean }) => (
    <StyledTextToIcon $color={colorGrey ? 'grey' : 'green'}>
      <p>{text}</p>
    </StyledTextToIcon>
  )

  return (
    <StyledHeader ref={medicationCardRef}>
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
              {medication.ampId ? (
                <Tooltip content={t('medication.drugType.medication')} iconSnippet={<SolidPillIcn />} boundaryBox={medicationCardRef} />
              ) : medication.nmpId ? (
                <Tooltip content={t('medication.drugType.homologation')} iconSnippet={<LeafIcn />} boundaryBox={medicationCardRef} />
              ) : medication.vmpGroupId ? (
                <Tooltip content={t('medication.drugType.molecule')} iconSnippet={<MoleculeIcn />} boundaryBox={medicationCardRef} />
              ) : null}

              <h3>{medication.title}</h3>

              <div className="medication__content__heading__infographics">
                <div className="medicationInfographics">
                  {medication.blackTriangle && (
                    <div className="medicationInfographics__item">
                      <Tooltip content={t('medication.drugInfographic.blackTriangle')} iconSnippet={<BlackTriangleIcn />} boundaryBox={medicationCardRef} />
                    </div>
                  )}
                  {medication.rmaProfessionalLink && (
                    <div className="medicationInfographics__item">
                      <Tooltip
                        contentSnippet={
                          <RmaProfessionalLinkContent rmaProfessionalLink={medication.rmaProfessionalLink} rmakeyMessages={getSamTextTranslation(medication.rmakeyMessages)} />
                        }
                        iconSnippet={<OrangeTriangleIcn />}
                        boundaryBox={medicationCardRef}
                      />
                    </div>
                  )}
                  {medication.speciallyRegulated && (
                    <div className="medicationInfographics__item">
                      <Tooltip content={getSpecialRegulation(medication.speciallyRegulated)} iconSnippet={<PillsBottleIcn />} boundaryBox={medicationCardRef} />
                    </div>
                  )}
                  {medication.genericPrescriptionRequired && (
                    <div className="medicationInfographics__item">
                      <Tooltip content={t('medication.drugInfographic.genericPrescriptionRequired')} iconSnippet={<PrescriptionIcn />} boundaryBox={medicationCardRef} />
                    </div>
                  )}
                </div>
                <div className="medicationAvailabilityInfographics">
                  {medicationSupplyProblem && (
                    <div className="medicationAvailabilityInfographics__item medicationAvailabilityInfographics__item--orange">
                      <Tooltip
                        contentSnippet={<SupplyProblemsContent medicationSupplyProblem={medicationSupplyProblem} />}
                        iconSnippet={<SupplyIcn />}
                        boundaryBox={medicationCardRef}
                      />
                    </div>
                  )}
                  {medicationCommercialization?.endOfComercialization && (
                    <div className="medicationAvailabilityInfographics__item medicationAvailabilityInfographics__item--red">
                      <Tooltip
                        contentSnippet={<EndOfCommercialisationContent medicationCommercialization={medicationCommercialization} />}
                        iconSnippet={<EndOfCommercialisationIcn />}
                        boundaryBox={medicationCardRef}
                      />
                    </div>
                  )}
                  {medicationCommercialization && !medicationCommercialization?.endOfComercialization && (
                    <div className="medicationAvailabilityInfographics__item medicationAvailabilityInfographics__item--green">
                      <Tooltip
                        contentSnippet={<StartOfCommercialisationContent medicationCommercialization={medicationCommercialization} />}
                        iconSnippet={<StartOfCommercialisationIcn />}
                        boundaryBox={medicationCardRef}
                      />
                    </div>
                  )}
                </div>
                <div className="deliveryPrescriptionConditions">
                  {medicationReimbursement && <Tooltip contentSnippet={<ReimbursementsContent reimbursement={medication.reimbursements} />} iconSnippet={<ReimbursementIcn />} />}
                  {medication.deliveryModusCode && (
                    <Tooltip
                      contentSnippet={
                        <DeliveryConditionsContent
                          deliveryModus={medication.deliveryModus}
                          deliveryModusSpecification={medication.deliveryModusSpecification}
                          deliveryModusCode={medication.deliveryModusCode}
                        />
                      }
                      iconSnippet={<DeliveryConditionsIcn />}
                      boundaryBox={medicationCardRef}
                    />
                  )}
                  {medication.deliveryModusCode && medication.deliveryModusSpecificationCode && (
                    <Tooltip
                      contentSnippet={
                        <PrescriptionConditionsContent
                          deliveryModusSpecificationCode={medication.deliveryModusSpecificationCode}
                          deliveryModusSpecification={medication.deliveryModusSpecification}
                        />
                      }
                      iconSnippet={<PrescriptionConditionsIcn />}
                      boundaryBox={medicationCardRef}
                    />
                  )}
                </div>
              </div>
            </div>

            <p className="medication__content__heading__activeIngredient">{medication.activeIngredient}</p>
          </div>
          <div className="medication__content__description">
            {medication.price && (
              <>
                <div className="medication__content__description__item">
                  <span>{t('medication.ui.price')}</span>
                  <p className="price">{medication.price}</p>
                </div>
                <div className="medication__content__description__item">
                  <span> {t('medication.reimbursement.title')}</span>
                  {medicationReimbursement ? <ReimbursementIcn /> : <NonApplicableIcn text={t('medication.reimbursement.non')} colorGrey={true} />}
                </div>
              </>
            )}
            <div className="medication__content__description__item">
              <span>{t('medication.delivery.title')}</span>
              {medication.deliveryModusCode ? <DeliveryConditionsIcn /> : <NonApplicableIcn text={t('medication.delivery.notApplicable')} />}
            </div>
            <div className="medication__content__description__item">
              <span>{t('medication.prescription.title')}</span>
              {medication.deliveryModusSpecificationCode ? <PrescriptionConditionsIcn /> : <NonApplicableIcn text={t('medication.prescription.free')} />}
            </div>
          </div>
        </div>
      </div>

      <StyledExpandButton
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
