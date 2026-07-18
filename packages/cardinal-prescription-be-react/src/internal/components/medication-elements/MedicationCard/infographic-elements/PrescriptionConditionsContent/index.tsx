import React, { FC } from 'react'
import { StyledPrescriptionConditions, StyledPrescriptionConditionsNotApplicable } from './styles'
import { t } from '../../../../../../shared/services/i18n'
import { Tooltip } from '../../../../common/Tooltip'
import type { RegulatoryBadgeComponent } from '../../../../../../shared/services/regulatory-badges'
import { StyledTextToIcon } from '../../medication-card-elements/Header/styles'

interface Props {
  deliveryModusSpecificationCode: string
  deliveryModusSpecification?: string
}

export const PrescriptionConditionsContent: FC<Props> = ({ deliveryModusSpecificationCode, deliveryModusSpecification }) => {
  return deliveryModusSpecificationCode ? (
    <StyledPrescriptionConditions className="StyledPrescriptionConditions">
      <h6>{t('medication.prescription.title')}</h6>
      <div className="content">
        <div>
          <span>{t('medication.delivery.code')}</span>
          <p>{deliveryModusSpecificationCode}</p>
        </div>

        {deliveryModusSpecification && (
          <div>
            <span>{t('medication.delivery.specification')}</span>
            <p>{deliveryModusSpecification}</p>
          </div>
        )}
      </div>
    </StyledPrescriptionConditions>
  ) : (
    <StyledPrescriptionConditionsNotApplicable className="StyledPrescriptionConditionsNotApplicable">
      <h6>{t('medication.prescription.title')}</h6>
      <div className="content">
        <div>
          <p>{t('medication.delivery.notApplicable')}</p>
        </div>
      </div>
    </StyledPrescriptionConditionsNotApplicable>
  )
}

// Registered `be` detail badge — presence-check relocated here from `MedicationInfographics`;
// note the (deliveryModusCode && deliveryModusSpecificationCode) coupling is preserved as-is.
export const PrescriptionConditionsBadge: RegulatoryBadgeComponent = ({ medication, boundaryBox }) => {
  const be = medication.regulatory?.be
  if (!be?.deliveryModusCode || !be?.deliveryModusSpecificationCode) return null

  return (
    <Tooltip
      contentSnippet={
        <PrescriptionConditionsContent deliveryModusSpecificationCode={be.deliveryModusSpecificationCode} deliveryModusSpecification={be.deliveryModusSpecification} />
      }
      iconSnippet={
        <StyledTextToIcon className="StyledTextToIcon" $color="red">
          <p>{be.deliveryModusSpecificationCode}</p>
        </StyledTextToIcon>
      }
      boundaryBox={boundaryBox}
    />
  )
}

// Registered `be` expanded badge — Extension always renders this block, regardless of
// presence; `PrescriptionConditionsContent` handles its own "not applicable" fallback
// internally, so (unlike the compact `detail` badge above, which gates to avoid an empty
// tooltip icon) no presence gate is needed here.
export const PrescriptionConditionsExpandedBadge: RegulatoryBadgeComponent = ({ medication }) => {
  const be = medication.regulatory?.be
  return <PrescriptionConditionsContent deliveryModusSpecificationCode={be?.deliveryModusSpecificationCode} deliveryModusSpecification={be?.deliveryModusSpecification} />
}
