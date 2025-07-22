import React, { FC } from 'react'
import { t } from '../../../../../services/i18n'
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
