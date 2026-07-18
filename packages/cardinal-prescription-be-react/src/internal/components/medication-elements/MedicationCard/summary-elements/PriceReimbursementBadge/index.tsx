import { t } from '../../../../../../shared/services/i18n'
import type { RegulatoryBadgeComponent } from '../../../../../../shared/services/regulatory-badges'
import { StyledTextToIcon } from '../../medication-card-elements/Header/styles'

// Registered `be` summary badge — today's Header couples the price row and the reimbursement
// pill: the whole pair only shows when `price` is truthy, the reimbursement half falls back to
// a grey "not applicable" pill when there's no reimbursement even though a price exists. Kept
// as ONE badge (rather than two independently-gated ones) to preserve that exact coupling —
// splitting it would let either half show up without the other, a behavior change.
export const PriceReimbursementBadge: RegulatoryBadgeComponent = ({ medication }) => {
  const be = medication.regulatory?.be
  if (!be?.price) return null

  const reimbursement = be.reimbursements

  return (
    <>
      <div className="medication__content__description__item">
        <span>{t('medication.ui.price')}</span>
        <p className="price">{be.price}</p>
      </div>
      <div className="medication__content__description__item">
        <span> {t('medication.reimbursement.title')}</span>
        {reimbursement ? (
          <StyledTextToIcon className="StyledTextToIcon" $color="green">
            <p>{reimbursement.reimbursementCriterion?.category}</p>
          </StyledTextToIcon>
        ) : (
          <StyledTextToIcon className="StyledTextToIcon" $color="grey">
            <p>{t('medication.reimbursement.non')}</p>
          </StyledTextToIcon>
        )}
      </div>
    </>
  )
}
