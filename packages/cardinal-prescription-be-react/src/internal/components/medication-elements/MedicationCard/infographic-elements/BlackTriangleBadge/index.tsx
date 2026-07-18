import { t } from '../../../../../../shared/services/i18n'
import { Tooltip } from '../../../../common/Tooltip'
import { BlackTriangleIcn } from '../../../../common/Icons'
import type { RegulatoryBadgeComponent } from '../../../../../../shared/services/regulatory-badges'

// Registered `be` detail badge — extracted from the inline Tooltip call that used to live
// directly in `MedicationInfographics`.
export const BlackTriangleBadge: RegulatoryBadgeComponent = ({ medication, boundaryBox }) => {
  if (!medication.regulatory?.be?.blackTriangle) return null

  return (
    <div className="regulatoryBadgeIcon regulatoryBadgeIcon--outline">
      <Tooltip content={t('medication.drugInfographic.blackTriangle')} iconSnippet={<BlackTriangleIcn />} boundaryBox={boundaryBox} />
    </div>
  )
}
