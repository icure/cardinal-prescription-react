import { FC } from 'react'
import type { MedicationType } from '../../../../../../shared/types'
import { RegulatoryBadges } from '../../../../common/RegulatoryBadges'
import { StyledExtension } from './styles'

interface Props {
  medication: MedicationType
}

export const Extension: FC<Props> = ({ medication }) => (
  <StyledExtension className="StyledExtension">
    <RegulatoryBadges medication={medication} placement="expanded" />
  </StyledExtension>
)
