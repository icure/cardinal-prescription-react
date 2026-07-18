import { Medication } from '@icure/be-fhc-lite-api'
import { Commercialization, Reimbursement, SupplyProblem, VmpGroup, VmpStub } from '@icure/cardinal-be-sam-sdk'

import { PractitionerVisibilityType, PharmacistVisibilityType } from './visibility'

export type DeliveryModusSpecificationCodeType = 'Sp' | 'Sp1' | 'Sp/S' | 'Sp1/S' | 'IMP/Sp' | 'IMP/Sp1'

export type Med = MedicationType | MedicationProductType

export type MedicationKind = 'product' | 'molecule' | 'nonMedicinal'

// Every field below only exists because SAM (Belgium's medication source) exposes it —
// none of it generalizes to another country's regulator, hence it lives under `regulatory.be`
// rather than on `MedicationType` itself.
export interface BeRegulatoryFields {
  ampId?: string
  vmpGroupId?: string
  nmpId?: string
  cnk?: string
  dmppProductId?: string
  vmpTitle?: string
  price?: string
  cheap?: boolean
  cheapest?: boolean
  crmLink?: string
  patientInformationLeafletLink?: string
  blackTriangle?: boolean
  speciallyRegulated?: number
  genericPrescriptionRequired?: boolean
  intendedName?: string
  rmaProfessionalLink?: string
  spcLink?: string
  dhpcLink?: string
  rmakeyMessages?: string
  vmp?: VmpStub
  vmpGroup?: VmpGroup
  supplyProblems?: SupplyProblem[]
  commercializations?: Commercialization[]
  deliveryModusCode?: string
  deliveryModus?: string
  deliveryModusSpecificationCode?: DeliveryModusSpecificationCodeType
  deliveryModusSpecification?: string
  reimbursements?: Reimbursement
}

// A structured amount/currency pair rather than a pre-formatted string like BE's `price`:
// Switzerland has three official languages (de/fr/it) with different number-formatting
// conventions (decimal comma vs point, symbol placement), so baking a display string at
// mapping time would hardcode one locale's formatting. Keeping the raw amount lets the
// (future) regulatory badge renderer format it per the active language, the same way the
// rest of this library already resolves display language lazily via `cardinalLanguage`.
export interface ChPriceType {
  amount: number
  currency: 'CHF'
}

// medINDEX regulatory fields — additive-only and all optional: only what medINDEX's
// MedicationProductDto/MedicationPackageDto are known to supply, nothing speculative.
export interface ChRegulatoryFields {
  pharmacode?: string
  gtin?: string[]
  swissmedicCategory?: string
  price?: ChPriceType
  narcotic?: boolean
  coldChain?: boolean
  genericGroup?: string
}

export interface MedicationType {
  id?: string
  kind?: MedicationKind
  title: string
  activeIngredient?: string
  index?: number
  // Absent key means "no such concept for this country," not "data missing" — a provider
  // must never populate a country's key with null/empty just because the field is unknown.
  regulatory?: {
    be?: BeRegulatoryFields
    ch?: ChRegulatoryFields
  }
}

export interface MedicationProductType {
  id: string
  title: string
  medications: MedicationType[]
}

export interface PrescribedMedicationType {
  uuid: string
  medication: Medication
  rid?: string
  ampId?: string
  cnk?: string
  dmppProductId?: string
  prescriberVisibility?: PractitionerVisibilityType
  pharmacistVisibility?: PharmacistVisibilityType
}
