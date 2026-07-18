import { t } from '../../../../../../shared/services/i18n'
import type { RegulatoryBadgeComponent } from '../../../../../../shared/services/regulatory-badges'

// Registered `ch` expanded badge — medINDEX's generic-group reference, not surfaced by any
// `summary`/`detail` badge today.
export const GenericGroupBadge: RegulatoryBadgeComponent = ({ medication }) => {
  const genericGroup = medication.regulatory?.ch?.genericGroup
  if (!genericGroup) return null

  return (
    <div className="regulatoryField">
      <span>{t('medication.swissmedic.genericGroup')}</span>
      <p>{genericGroup}</p>
    </div>
  )
}
