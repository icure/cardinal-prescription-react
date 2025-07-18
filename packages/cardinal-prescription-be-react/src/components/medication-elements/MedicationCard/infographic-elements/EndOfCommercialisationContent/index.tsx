import { getSamTextTranslation, t } from '../../../../../services/i18n'
import { formatTimestamp } from '../../../../../utils/date-helpers'
import React, { FC } from 'react'
import { Commercialization } from '@icure/cardinal-be-sam-sdk'
import { StyledEndCommercialization } from './styles'

interface Props {
  medicationCommercialization: Commercialization
}

export const EndOfCommercialisationContent: FC<Props> = ({ medicationCommercialization }) => {
  return (
    <StyledEndCommercialization>
      <h6>{t('medication.commercialization.end')}</h6>
      <div className="content">
        {medicationCommercialization.from && (
          <div>
            <span>{t('medication.commercialization.limitedAvailabilityFrom')}</span>
            <p>{formatTimestamp(medicationCommercialization.from)}</p>
          </div>
        )}
        {medicationCommercialization.to && (
          <div>
            <span>{t('medication.commercialization.end')}</span>
            <p>{formatTimestamp(medicationCommercialization.to)}</p>
          </div>
        )}
        {getSamTextTranslation(medicationCommercialization.endOfComercialization) && (
          <div>
            <span>{t('medication.commercialization.unavailableFrom')}</span>
            <p>{getSamTextTranslation(medicationCommercialization.endOfComercialization)}</p>
          </div>
        )}
        {getSamTextTranslation(medicationCommercialization.reason) && (
          <div>
            <span>{t('medication.commercialization.endReason')}</span>
            <p>{getSamTextTranslation(medicationCommercialization.reason)}</p>
          </div>
        )}
        {getSamTextTranslation(medicationCommercialization.impact) && (
          <div>
            <span>{t('medication.commercialization.endImpact')}</span>
            <p>{getSamTextTranslation(medicationCommercialization.impact)}</p>
          </div>
        )}
        {getSamTextTranslation(medicationCommercialization.additionalInformation) && (
          <div>
            <span>{t('medication.commercialization.endAdditionalInformation')}</span>
            {getSamTextTranslation(medicationCommercialization.additionalInformation)
              .split('\n')
              .map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
          </div>
        )}
      </div>
    </StyledEndCommercialization>
  )
}
