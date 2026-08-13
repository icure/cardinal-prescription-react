import { t } from '../../../../../../shared/services/i18n'
import type { RegulatoryBadgeComponent } from '../../../../../../shared/services/regulatory-badges'
import { StyledTextToIcon } from '../../medication-card-elements/Header/styles'

// Registered `be` summary badge — always rendered, same reasoning as `DeliveryConditionsSummaryBadge`.
export const PrescriptionConditionsSummaryBadge: RegulatoryBadgeComponent = ({ medication }) => {
  const code = medication.regulatory?.be?.deliveryModusSpecificationCode
  const specification = medication.regulatory?.be?.deliveryModusSpecification

  return (
    <div className="medication__content__description__item">
      <span>{t('medication.prescription.title')}</span>
      {code && specification ? (
        <StyledTextToIcon className="StyledTextToIcon" $color="red">
          <p>{code}</p>
        </StyledTextToIcon>
      ) : (
        <StyledTextToIcon className="StyledTextToIcon" $color="green">
          <p>{t('medication.delivery.notApplicable')}</p>
        </StyledTextToIcon>
      )}
    </div>
  )
}
