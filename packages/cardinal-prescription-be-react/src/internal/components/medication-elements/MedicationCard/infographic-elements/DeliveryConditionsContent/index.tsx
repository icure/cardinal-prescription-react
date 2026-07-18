import React, { FC } from 'react'
import { t } from '../../../../../../shared/services/i18n'
import { Tooltip } from '../../../../common/Tooltip'
import type { RegulatoryBadgeComponent } from '../../../../../../shared/services/regulatory-badges'
import { StyledTextToIcon } from '../../medication-card-elements/Header/styles'
import { StyledDeliveryConditions, StyledDeliveryConditionsNotApplicable } from './styles'

interface Props {
  deliveryModusCode?: string
  deliveryModusSpecification?: string
  deliveryModus?: string
}

export const DeliveryConditionsContent: FC<Props> = ({ deliveryModusCode, deliveryModus, deliveryModusSpecification }) => {
  return deliveryModusCode ? (
    <StyledDeliveryConditions className="StyledDeliveryConditions">
      <h6>{t('medication.delivery.title')}</h6>
      <div className="content">
        {deliveryModusCode && (
          <div>
            <span>{t('medication.delivery.code')}</span>
            <p>{deliveryModusCode}</p>
          </div>
        )}

        {deliveryModus && (
          <div>
            <span>{t('medication.delivery.modus')}</span>
            <p>{deliveryModus}</p>
          </div>
        )}

        {deliveryModusSpecification && (
          <div>
            <span>{t('medication.delivery.specification')}</span>
            <p>{deliveryModusSpecification}</p>
          </div>
        )}
      </div>
    </StyledDeliveryConditions>
  ) : (
    <StyledDeliveryConditionsNotApplicable className="StyledDeliveryConditionsNotApplicable">
      <h6>{t('medication.delivery.title')}</h6>
      <div className="content">
        <div>
          <p>{t('medication.delivery.notApplicable')}</p>
        </div>
      </div>
    </StyledDeliveryConditionsNotApplicable>
  )
}

// Registered `be` detail badge — presence-check relocated here from `MedicationInfographics`.
export const DeliveryConditionsBadge: RegulatoryBadgeComponent = ({ medication, boundaryBox }) => {
  const be = medication.regulatory?.be
  if (!be?.deliveryModusCode) return null

  return (
    <Tooltip
      contentSnippet={
        <DeliveryConditionsContent deliveryModus={be.deliveryModus} deliveryModusSpecification={be.deliveryModusSpecification} deliveryModusCode={be.deliveryModusCode} />
      }
      iconSnippet={
        <StyledTextToIcon className="StyledTextToIcon" $color="orange">
          <p>{be.deliveryModusCode}</p>
        </StyledTextToIcon>
      }
      boundaryBox={boundaryBox}
    />
  )
}

// Registered `be` expanded badge — Extension always renders this block, regardless of
// presence; `DeliveryConditionsContent` handles its own "not applicable" fallback internally,
// so (unlike the compact `detail` badge above) no presence gate is needed here.
export const DeliveryConditionsExpandedBadge: RegulatoryBadgeComponent = ({ medication }) => {
  const be = medication.regulatory?.be
  return <DeliveryConditionsContent deliveryModus={be?.deliveryModus} deliveryModusSpecification={be?.deliveryModusSpecification} deliveryModusCode={be?.deliveryModusCode} />
}
