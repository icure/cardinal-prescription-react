import { t } from '../../../../../../shared/services/i18n'
import type { RegulatoryBadgeComponent } from '../../../../../../shared/services/regulatory-badges'
import { StyledTextToIcon } from '../../medication-card-elements/Header/styles'

// Registered `be` summary badge — this row is always rendered (unlike most badges, which
// return null when absent): a real delivery-code pill when known, otherwise a "free of
// prescription" placeholder pill. That fallback is `be`-specific UX, not a generic
// "absent = don't render" rule, so this badge intentionally never returns null.
export const DeliveryConditionsSummaryBadge: RegulatoryBadgeComponent = ({ medication }) => {
  const code = medication.regulatory?.be?.deliveryModusCode

  return (
    <div className="medication__content__description__item">
      <span>{t('medication.delivery.title')}</span>
      {code ? (
        <StyledTextToIcon className="StyledTextToIcon" $color="orange">
          <p>{code}</p>
        </StyledTextToIcon>
      ) : (
        <StyledTextToIcon className="StyledTextToIcon" $color="green">
          <p>{t('medication.prescription.free')}</p>
        </StyledTextToIcon>
      )}
    </div>
  )
}
