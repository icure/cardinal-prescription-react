import { t } from '../../../../../services/i18n'
import { formatTimestamp } from '../../../../../utils/date-helpers'
import React, { FC } from 'react'
import { Commercialization } from '@icure/api'
import { StyledStartCommercialization } from './styles'

interface Props {
  medicationCommercialization: Commercialization
}

export const StartOfCommercialisationContent: FC<Props> = ({ medicationCommercialization }) => {
  return (
    <StyledStartCommercialization className="StyledStartCommercialization">
      <h6>{t('medication.commercialization.start')}</h6>
      <div className="content">
        {medicationCommercialization.from && (
          <div>
            <span>{t('medication.commercialization.startAvailableFrom')}</span>
            <p>{formatTimestamp(medicationCommercialization.from)}</p>
          </div>
        )}
      </div>
    </StyledStartCommercialization>
  )
}
