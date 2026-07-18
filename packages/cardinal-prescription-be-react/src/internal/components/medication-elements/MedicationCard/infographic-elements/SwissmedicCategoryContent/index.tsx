import { t } from '../../../../../../shared/services/i18n'
import { Tooltip } from '../../../../common/Tooltip'
import { PillsBottleIcn } from '../../../../common/Icons'
import type { RegulatoryBadgeComponent } from '../../../../../../shared/services/regulatory-badges'

// Registered `ch` detail badge — simple tooltip showing medINDEX's Swissmedic dispensing
// category letter. No per-letter description is fabricated here (unlike `be`'s
// `speciallyRegulated` three-way switch): the exact regulatory meaning of each Swissmedic
// category is out of scope for this pass, so the raw code is shown as-is with a generic label.
export const SwissmedicCategoryBadge: RegulatoryBadgeComponent = ({ medication, boundaryBox }) => {
  const category = medication.regulatory?.ch?.swissmedicCategory
  if (!category) return null

  return (
    <div className="regulatoryBadgeIcon regulatoryBadgeIcon--outline">
      <Tooltip content={`${t('medication.swissmedic.category')} ${category}`} iconSnippet={<PillsBottleIcn />} boundaryBox={boundaryBox} />
    </div>
  )
}
