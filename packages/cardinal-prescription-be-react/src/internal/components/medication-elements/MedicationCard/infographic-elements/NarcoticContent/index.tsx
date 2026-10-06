import { t } from '../../../../../../shared/services/i18n'
import { Tooltip } from '../../../../common/Tooltip'
import { WarningIcn } from '../../../../common/Icons'
import type { RegulatoryBadgeComponent } from '../../../../../../shared/services/regulatory-badges'
import { cp } from '../../../../../../styles'

// Registered `ch` detail badge — boolean narcotic/controlled-substance flag.
export const NarcoticBadge: RegulatoryBadgeComponent = ({ medication, boundaryBox }) => {
  if (!medication.regulatory?.ch?.narcotic) return null

  return (
    <div className="regulatoryBadgeIcon regulatoryBadgeIcon--red">
      <Tooltip content={t('medication.swissmedic.narcotic')} iconSnippet={<WarningIcn color={cp.iconCritical} />} boundaryBox={boundaryBox} />
    </div>
  )
}
