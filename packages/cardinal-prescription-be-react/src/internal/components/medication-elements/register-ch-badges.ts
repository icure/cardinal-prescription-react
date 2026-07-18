import { registerRegulatoryBadge } from '../../../shared/services/regulatory-badges'
import { ChPriceBadge } from './MedicationCard/summary-elements/ChPriceBadge'
import { SwissmedicCategoryBadge } from './MedicationCard/infographic-elements/SwissmedicCategoryContent'
import { NarcoticBadge } from './MedicationCard/infographic-elements/NarcoticContent'
import { ColdChainBadge } from './MedicationCard/infographic-elements/ColdChainContent'

// `summary` placement — Header's collapsed row. `ch` has no reimbursement/delivery/prescription
// concepts, so unlike `be` there is no always-rendered "not applicable" placeholder to register:
// an unpopulated slot for `ch` genuinely has nothing to show.
registerRegulatoryBadge('ch', 'price', ChPriceBadge, 'summary')

// `detail` placement — MedicationInfographics' expanded row.
registerRegulatoryBadge('ch', 'swissmedicCategory', SwissmedicCategoryBadge, 'detail')
registerRegulatoryBadge('ch', 'narcotic', NarcoticBadge, 'detail')
registerRegulatoryBadge('ch', 'coldChain', ColdChainBadge, 'detail')
