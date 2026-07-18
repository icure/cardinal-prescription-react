import { t } from '../../../../../../shared/services/i18n'
import type { RegulatoryBadgeComponent } from '../../../../../../shared/services/regulatory-badges'

// Registered `ch` summary badge — `ch` has no reimbursement concept, so unlike `be`'s combined
// price+reimbursement badge this is a standalone price row.
export const ChPriceBadge: RegulatoryBadgeComponent = ({ medication }) => {
  const price = medication.regulatory?.ch?.price
  if (!price) return null

  return (
    <div className="medication__content__description__item">
      <span>{t('medication.ui.price')}</span>
      <p className="price">{`${price.currency} ${price.amount.toFixed(2)}`}</p>
    </div>
  )
}
