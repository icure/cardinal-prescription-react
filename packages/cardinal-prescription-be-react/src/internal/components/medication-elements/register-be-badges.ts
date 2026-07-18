import { registerRegulatoryBadge } from '../../../shared/services/regulatory-badges'
import { PriceReimbursementBadge } from './MedicationCard/summary-elements/PriceReimbursementBadge'
import { DeliveryConditionsSummaryBadge } from './MedicationCard/summary-elements/DeliveryConditionsSummaryBadge'
import { PrescriptionConditionsSummaryBadge } from './MedicationCard/summary-elements/PrescriptionConditionsSummaryBadge'
import { BlackTriangleBadge } from './MedicationCard/infographic-elements/BlackTriangleBadge'
import { RmaProfessionalLinkBadge } from './MedicationCard/infographic-elements/RmaProfessionalLinkContent'
import { SpeciallyRegulatedBadge } from './MedicationCard/infographic-elements/SpeciallyRegulatedBadge'
import { GenericPrescriptionRequiredBadge } from './MedicationCard/infographic-elements/GenericPrescriptionRequiredBadge'
import { SupplyProblemsBadge, SupplyProblemsExpandedBadge } from './MedicationCard/infographic-elements/SupplyProblemsContent'
import { EndOfCommercialisationBadge, EndOfCommercialisationExpandedBadge } from './MedicationCard/infographic-elements/EndOfCommercialisationContent'
import { StartOfCommercialisationBadge, StartOfCommercialisationExpandedBadge } from './MedicationCard/infographic-elements/StartOfCommercialisationContent'
import { ReimbursementsBadge, ReimbursementsExpandedBadge } from './MedicationCard/infographic-elements/ReimbursementsContent'
import { DeliveryConditionsBadge, DeliveryConditionsExpandedBadge } from './MedicationCard/infographic-elements/DeliveryConditionsContent'
import { PrescriptionConditionsBadge, PrescriptionConditionsExpandedBadge } from './MedicationCard/infographic-elements/PrescriptionConditionsContent'
import { VmpBadge } from './MedicationCard/expanded-elements/VmpBadge'
import { LinksBadge } from './MedicationCard/expanded-elements/LinksBadge'

// `summary` placement — Header's collapsed row. Registration order doesn't matter here since
// Header renders all 3 as one flat row inside a single flex-wrap container (no visual grouping
// to preserve), but keeping source order == render order regardless.
registerRegulatoryBadge('be', 'price', PriceReimbursementBadge, 'summary')
registerRegulatoryBadge('be', 'deliveryConditions', DeliveryConditionsSummaryBadge, 'summary')
registerRegulatoryBadge('be', 'prescriptionConditions', PrescriptionConditionsSummaryBadge, 'summary')

// `detail` placement — MedicationInfographics' expanded row. Order matches the original
// hardcoded render order exactly (core infographics, then availability, then
// delivery/prescription/reimbursement), since that's now the only thing determining DOM order.
registerRegulatoryBadge('be', 'blackTriangle', BlackTriangleBadge, 'detail')
registerRegulatoryBadge('be', 'rmaProfessionalLink', RmaProfessionalLinkBadge, 'detail')
registerRegulatoryBadge('be', 'speciallyRegulated', SpeciallyRegulatedBadge, 'detail')
registerRegulatoryBadge('be', 'genericPrescriptionRequired', GenericPrescriptionRequiredBadge, 'detail')
registerRegulatoryBadge('be', 'supplyProblems', SupplyProblemsBadge, 'detail')
registerRegulatoryBadge('be', 'endOfCommercialisation', EndOfCommercialisationBadge, 'detail')
registerRegulatoryBadge('be', 'startOfCommercialisation', StartOfCommercialisationBadge, 'detail')
registerRegulatoryBadge('be', 'reimbursement', ReimbursementsBadge, 'detail')
registerRegulatoryBadge('be', 'deliveryConditions', DeliveryConditionsBadge, 'detail')
registerRegulatoryBadge('be', 'prescriptionConditions', PrescriptionConditionsBadge, 'detail')

// `expanded` placement — MedicationCard's Extension panel (the always-visible full-detail view
// shown below the header when a card is clicked open). Order matches Extension's original
// render order exactly, since registration order == render order.
registerRegulatoryBadge('be', 'vmp', VmpBadge, 'expanded')
registerRegulatoryBadge('be', 'links', LinksBadge, 'expanded')
registerRegulatoryBadge('be', 'reimbursement', ReimbursementsExpandedBadge, 'expanded')
registerRegulatoryBadge('be', 'prescriptionConditions', PrescriptionConditionsExpandedBadge, 'expanded')
registerRegulatoryBadge('be', 'deliveryConditions', DeliveryConditionsExpandedBadge, 'expanded')
registerRegulatoryBadge('be', 'supplyProblems', SupplyProblemsExpandedBadge, 'expanded')
registerRegulatoryBadge('be', 'endOfCommercialisation', EndOfCommercialisationExpandedBadge, 'expanded')
registerRegulatoryBadge('be', 'startOfCommercialisation', StartOfCommercialisationExpandedBadge, 'expanded')
