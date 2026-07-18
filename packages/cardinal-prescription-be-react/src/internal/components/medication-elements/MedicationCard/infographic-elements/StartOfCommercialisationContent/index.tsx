import { t } from '../../../../../../shared/services/i18n'
import { formatTimestamp } from '../../../../../utils/date-helpers'
import React, { FC } from 'react'
import { Commercialization } from '@icure/cardinal-be-sam-sdk'
import { Tooltip } from '../../../../common/Tooltip'
import { StartOfCommercialisationIcn } from '../../../../common/Icons'
import type { RegulatoryBadgeComponent } from '../../../../../../shared/services/regulatory-badges'
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

// Registered `be` detail badge — presence-check relocated here from `MedicationInfographics`;
// keyed on a commercialization entry existing WITHOUT an `endOfComercialization` value (the
// two are mutually exclusive at render time, matching today's `&& !...endOfComercialization`).
export const StartOfCommercialisationBadge: RegulatoryBadgeComponent = ({ medication, boundaryBox }) => {
  const medicationCommercialization = medication.regulatory?.be?.commercializations?.[0]
  if (!medicationCommercialization || medicationCommercialization.endOfComercialization) return null

  return (
    <div className="regulatoryBadgeIcon regulatoryBadgeIcon--green">
      <Tooltip
        contentSnippet={<StartOfCommercialisationContent medicationCommercialization={medicationCommercialization} />}
        iconSnippet={<StartOfCommercialisationIcn />}
        boundaryBox={boundaryBox}
      />
    </div>
  )
}
