import { getSamTextTranslation, t } from '../../../../../../shared/services/i18n'
import { formatTimestamp } from '../../../../../utils/date-helpers'
import React, { FC } from 'react'
import { Commercialization } from '@icure/cardinal-be-sam-sdk'
import { Tooltip } from '../../../../common/Tooltip'
import { EndOfCommercialisationIcn } from '../../../../common/Icons'
import type { RegulatoryBadgeComponent } from '../../../../../../shared/services/regulatory-badges'
import { StyledEndCommercialization } from './styles'

interface Props {
  medicationCommercialization: Commercialization
}

export const EndOfCommercialisationContent: FC<Props> = ({ medicationCommercialization }) => {
  return (
    <StyledEndCommercialization className="StyledEndCommercialization">
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

// Registered `be` detail badge — presence-check relocated here from `MedicationInfographics`;
// keyed on the first commercialization entry having an `endOfComercialization` value.
export const EndOfCommercialisationBadge: RegulatoryBadgeComponent = ({ medication, boundaryBox }) => {
  const medicationCommercialization = medication.regulatory?.be?.commercializations?.[0]
  if (!medicationCommercialization?.endOfComercialization) return null

  return (
    <div className="regulatoryBadgeIcon regulatoryBadgeIcon--red">
      <Tooltip
        contentSnippet={<EndOfCommercialisationContent medicationCommercialization={medicationCommercialization} />}
        iconSnippet={<EndOfCommercialisationIcn />}
        boundaryBox={boundaryBox}
      />
    </div>
  )
}

// Registered `be` expanded badge — Extension's end-of-commercialisation block; same gating as
// the `detail` badge above (mutually exclusive with `StartOfCommercialisationExpandedBadge`).
export const EndOfCommercialisationExpandedBadge: RegulatoryBadgeComponent = ({ medication }) => {
  const medicationCommercialization = medication.regulatory?.be?.commercializations?.[0]
  if (!medicationCommercialization?.endOfComercialization) return null

  return <EndOfCommercialisationContent medicationCommercialization={medicationCommercialization} />
}
