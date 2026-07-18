import { FC, RefObject } from 'react'
import type { MedicationType } from '../../../../shared/types'
import { RegulatoryBadges } from '../../common/RegulatoryBadges'
import { StyledMedicationInfographics } from './styles'

interface Props {
  medication: MedicationType
  boundaryBox?: RefObject<HTMLElement>
}

// Fully country-blind: every icon/tooltip that used to be gated here on a `regulatory.be.X`
// field presence-check now lives in its own registered `detail`-placement badge (see
// `register-be-badges.ts` / `register-ch-badges.ts`), each deciding for itself whether it
// applies to the given medication.
export const MedicationInfographics: FC<Props> = ({ medication, boundaryBox }) => (
  <StyledMedicationInfographics className="StyledMedicationInfographics">
    <RegulatoryBadges medication={medication} placement="detail" boundaryBox={boundaryBox} />
  </StyledMedicationInfographics>
)
