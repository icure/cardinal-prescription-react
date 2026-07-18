import { t } from '../../../../../../shared/services/i18n'
import { Tooltip } from '../../../../common/Tooltip'
import { PillsBottleIcn } from '../../../../common/Icons'
import type { RegulatoryBadgeComponent } from '../../../../../../shared/services/regulatory-badges'

const getSpecialRegulation = (code?: number) => {
  switch (code) {
    case 1:
      return t('medication.drugSpecialRegulation.noNarcoticRegulation')
    case 2:
      return t('medication.drugSpecialRegulation.narcoticRegulation')
    default:
      return t('medication.drugSpecialRegulation.noSpecialRegulation')
  }
}

// Registered `be` detail badge — extracted from the inline Tooltip call that used to live
// directly in `MedicationInfographics`, three-way switch on the numeric code preserved as-is.
export const SpeciallyRegulatedBadge: RegulatoryBadgeComponent = ({ medication, boundaryBox }) => {
  const code = medication.regulatory?.be?.speciallyRegulated
  if (!code) return null

  return (
    <div className="regulatoryBadgeIcon regulatoryBadgeIcon--outline">
      <Tooltip content={getSpecialRegulation(code)} iconSnippet={<PillsBottleIcn />} boundaryBox={boundaryBox} />
    </div>
  )
}
