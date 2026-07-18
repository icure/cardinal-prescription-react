import { t } from '../../../../../../shared/services/i18n'
import { Tooltip } from '../../../../common/Tooltip'
import type { RegulatoryBadgeComponent } from '../../../../../../shared/services/regulatory-badges'
import { StyledTextToIcon } from '../../medication-card-elements/Header/styles'

// Registered `ch` detail badge — boolean cold-chain flag. No existing icon is a reasonable
// semantic match for "requires cold-chain transport", so this reuses `be`'s plain
// text-to-icon pattern (a short abbreviation in a colored pill) instead of inventing new SVG.
export const ColdChainBadge: RegulatoryBadgeComponent = ({ medication, boundaryBox }) => {
  if (!medication.regulatory?.ch?.coldChain) return null

  return (
    <Tooltip
      content={t('medication.swissmedic.coldChain')}
      iconSnippet={
        <StyledTextToIcon className="StyledTextToIcon" $color="grey">
          <p>{t('medication.swissmedic.coldChainAbbreviation')}</p>
        </StyledTextToIcon>
      }
      boundaryBox={boundaryBox}
    />
  )
}
