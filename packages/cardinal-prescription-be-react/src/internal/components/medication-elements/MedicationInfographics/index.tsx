import { FC, RefObject } from 'react'
import type { MedicationType } from '../../../../shared/types'
import { t } from '../../../../shared/services/i18n'
import { Tooltip } from '../../common/Tooltip'
import { BlackTriangleIcn, EndOfCommercialisationIcn, OrangeTriangleIcn, PillsBottleIcn, PrescriptionIcn, StartOfCommercialisationIcn, SupplyIcn } from '../../common/Icons'
import { RmaProfessionalLinkContent } from '../MedicationCard/infographic-elements/RmaProfessionalLinkContent'
import { SupplyProblemsContent } from '../MedicationCard/infographic-elements/SupplyProblemsContent'
import { EndOfCommercialisationContent } from '../MedicationCard/infographic-elements/EndOfCommercialisationContent'
import { StartOfCommercialisationContent } from '../MedicationCard/infographic-elements/StartOfCommercialisationContent'
import { ReimbursementsContent } from '../MedicationCard/infographic-elements/ReimbursementsContent'
import { DeliveryConditionsContent } from '../MedicationCard/infographic-elements/DeliveryConditionsContent'
import { PrescriptionConditionsContent } from '../MedicationCard/infographic-elements/PrescriptionConditionsContent'
import { StyledTextToIcon } from '../MedicationCard/medication-card-elements/Header/styles'
import { StyledMedicationInfographics } from './styles'

interface Props {
  medication: MedicationType
  boundaryBox?: RefObject<HTMLElement>
}

export const MedicationInfographics: FC<Props> = ({ medication, boundaryBox }) => {
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
    <StyledTextToIcon className="StyledTextToIcon" $color={'green'}>
      <p>{medicationReimbursement?.reimbursementCriterion?.category}</p>
    </StyledTextToIcon>
  )
  const DeliveryConditionsIcn = () => (
    <StyledTextToIcon className="StyledTextToIcon" $color={'orange'}>
      <p>{medication.deliveryModusCode}</p>
    </StyledTextToIcon>
  )
  const PrescriptionConditionsIcn = () => (
    <StyledTextToIcon className="StyledTextToIcon" $color={'red'}>
      <p>{medication.deliveryModusSpecificationCode}</p>
    </StyledTextToIcon>
  )

  return (
    <StyledMedicationInfographics className="StyledMedicationInfographics">
      <div className="medicationInfographics">
        {medication.blackTriangle && (
          <div className="medicationInfographics__item">
            <Tooltip content={t('medication.drugInfographic.blackTriangle')} iconSnippet={<BlackTriangleIcn />} boundaryBox={boundaryBox} />
          </div>
        )}
        {medication.rmaProfessionalLink && (
          <div className="medicationInfographics__item">
            <Tooltip
              contentSnippet={<RmaProfessionalLinkContent rmaProfessionalLink={medication.rmaProfessionalLink} rmakeyMessages={medication.rmakeyMessages} />}
              iconSnippet={<OrangeTriangleIcn />}
              boundaryBox={boundaryBox}
            />
          </div>
        )}
        {medication.speciallyRegulated && (
          <div className="medicationInfographics__item">
            <Tooltip content={getSpecialRegulation(medication.speciallyRegulated)} iconSnippet={<PillsBottleIcn />} boundaryBox={boundaryBox} />
          </div>
        )}
        {medication.genericPrescriptionRequired && (
          <div className="medicationInfographics__item">
            <Tooltip content={t('medication.drugInfographic.genericPrescriptionRequired')} iconSnippet={<PrescriptionIcn />} boundaryBox={boundaryBox} />
          </div>
        )}
      </div>
      <div className="medicationAvailabilityInfographics">
        {medicationSupplyProblem && (
          <div className="medicationAvailabilityInfographics__item medicationAvailabilityInfographics__item--orange">
            <Tooltip contentSnippet={<SupplyProblemsContent medicationSupplyProblem={medicationSupplyProblem} />} iconSnippet={<SupplyIcn />} boundaryBox={boundaryBox} />
          </div>
        )}
        {medicationCommercialization?.endOfComercialization && (
          <div className="medicationAvailabilityInfographics__item medicationAvailabilityInfographics__item--red">
            <Tooltip
              contentSnippet={<EndOfCommercialisationContent medicationCommercialization={medicationCommercialization} />}
              iconSnippet={<EndOfCommercialisationIcn />}
              boundaryBox={boundaryBox}
            />
          </div>
        )}
        {medicationCommercialization && !medicationCommercialization?.endOfComercialization && (
          <div className="medicationAvailabilityInfographics__item medicationAvailabilityInfographics__item--green">
            <Tooltip
              contentSnippet={<StartOfCommercialisationContent medicationCommercialization={medicationCommercialization} />}
              iconSnippet={<StartOfCommercialisationIcn />}
              boundaryBox={boundaryBox}
            />
          </div>
        )}
      </div>
      <div className="deliveryPrescriptionConditions">
        {medicationReimbursement && (
          <Tooltip contentSnippet={<ReimbursementsContent reimbursement={medication.reimbursements} />} iconSnippet={<ReimbursementIcn />} boundaryBox={boundaryBox} />
        )}
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
            boundaryBox={boundaryBox}
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
            boundaryBox={boundaryBox}
          />
        )}
      </div>
    </StyledMedicationInfographics>
  )
}
