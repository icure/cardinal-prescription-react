import { t } from '../../../../../../shared/services/i18n'
import type { RegulatoryBadgeComponent } from '../../../../../../shared/services/regulatory-badges'

// Registered `ch` expanded badge — medINDEX returns one or more GTIN barcodes per package;
// nothing in the existing `summary`/`detail` badges surfaces the full list (only
// `swissmedicCategory`/`narcotic`/`coldChain`/`price` do), so this is genuinely new
// information rather than a duplicate of an existing badge.
export const GtinBadge: RegulatoryBadgeComponent = ({ medication }) => {
  const gtin = medication.regulatory?.ch?.gtin
  if (!gtin || gtin.length === 0) return null

  return (
    <div className="regulatoryField">
      <span>{t('medication.swissmedic.gtin')}</span>
      <p>{gtin.join(', ')}</p>
    </div>
  )
}
