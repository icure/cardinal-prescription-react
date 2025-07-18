import React, { FC } from 'react'
import { StyledRmaLink } from './styles'
import { t } from '../../../../../services/i18n'

interface Props {
  rmaProfessionalLink: string
  rmakeyMessages?: string
}

export const RmaProfessionalLinkContent: FC<Props> = ({ rmaProfessionalLink, rmakeyMessages }) => {
  return (
    <StyledRmaLink>
      <div className="content">
        {!!rmakeyMessages && <p>{rmakeyMessages}</p>}
        <a href={rmaProfessionalLink}>{t('medication.links.rma')}</a>
      </div>
    </StyledRmaLink>
  )
}
