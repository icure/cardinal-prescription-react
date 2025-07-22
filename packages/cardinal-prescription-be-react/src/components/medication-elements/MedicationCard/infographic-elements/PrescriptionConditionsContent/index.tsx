import React, { FC } from 'react'
import { StyledPrescriptionConditions, StyledPrescriptionConditionsNotApplicable } from './styles'
import { t } from '../../../../../services/i18n'

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
