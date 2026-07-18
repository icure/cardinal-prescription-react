import { registerRegulatoryBadge } from '../../../shared/services/regulatory-badges'
import { ChPriceBadge } from './MedicationCard/summary-elements/ChPriceBadge'
import { SwissmedicCategoryBadge } from './MedicationCard/infographic-elements/SwissmedicCategoryContent'
import { NarcoticBadge } from './MedicationCard/infographic-elements/NarcoticContent'
import { ColdChainBadge } from './MedicationCard/infographic-elements/ColdChainContent'
import { GtinBadge } from './MedicationCard/expanded-elements/GtinBadge'
import { GenericGroupBadge } from './MedicationCard/expanded-elements/GenericGroupBadge'

// `summary` placement — Header's collapsed row. `ch` has no reimbursement/delivery/prescription
// concepts, so unlike `be` there is no always-rendered "not applicable" placeholder to register:
// an unpopulated slot for `ch` genuinely has nothing to show.
registerRegulatoryBadge('ch', 'price', ChPriceBadge, 'summary')

// `detail` placement — MedicationInfographics' expanded row.
registerRegulatoryBadge('ch', 'swissmedicCategory', SwissmedicCategoryBadge, 'detail')
registerRegulatoryBadge('ch', 'narcotic', NarcoticBadge, 'detail')
registerRegulatoryBadge('ch', 'coldChain', ColdChainBadge, 'detail')

// `expanded` placement — MedicationCard's Extension panel. `ch` has no VMP/links/reimbursement/
// commercialisation equivalent (see `ChRegulatoryFields`), so only the two fields not already
// surfaced by a `summary`/`detail` badge (`gtin`, `genericGroup`) get registered here; everything
// else meaningful is already covered above.
registerRegulatoryBadge('ch', 'gtin', GtinBadge, 'expanded')
registerRegulatoryBadge('ch', 'genericGroup', GenericGroupBadge, 'expanded')
