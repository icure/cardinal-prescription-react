import React, { FC } from 'react'
import { StyledRmaLink } from './styles'
import { t } from '../../../../../../shared/services/i18n'
import { Tooltip } from '../../../../common/Tooltip'
import { OrangeTriangleIcn } from '../../../../common/Icons'
import type { RegulatoryBadgeComponent } from '../../../../../../shared/services/regulatory-badges'

interface Props {
  rmaProfessionalLink: string
  rmakeyMessages?: string
}

export const RmaProfessionalLinkContent: FC<Props> = ({ rmaProfessionalLink, rmakeyMessages }) => {
  return (
    <StyledRmaLink className="StyledRmaLink">
      <div className="content">
        {!!rmakeyMessages && <p>{rmakeyMessages}</p>}
        <a href={rmaProfessionalLink}>{t('medication.links.rma')}</a>
      </div>
    </StyledRmaLink>
  )
}

// Registered `be` detail badge — presence-check relocated here from `MedicationInfographics`.
export const RmaProfessionalLinkBadge: RegulatoryBadgeComponent = ({ medication, boundaryBox }) => {
  const be = medication.regulatory?.be
  if (!be?.rmaProfessionalLink) return null

  return (
    <div className="regulatoryBadgeIcon regulatoryBadgeIcon--outline">
      <Tooltip
        contentSnippet={<RmaProfessionalLinkContent rmaProfessionalLink={be.rmaProfessionalLink} rmakeyMessages={be.rmakeyMessages} />}
        iconSnippet={<OrangeTriangleIcn />}
        boundaryBox={boundaryBox}
      />
    </div>
  )
}
