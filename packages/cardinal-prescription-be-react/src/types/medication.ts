import { Medication } from '@icure/be-fhc-lite-api'
import { Commercialization, Reimbursement, StandardDosage, SupplyProblem, VmpStub } from '@icure/cardinal-be-sam-sdk'

import { PharmacistVisibilityType, PractitionerVisibilityType } from './index'

export type MedicationType = {
  ampId?: string
  vmpGroupId?: string
  nmpId?: string
  cnk?: string
  dmppProductId?: string
  id?: string
  title: string
  vmpTitle?: string
  activeIngredient?: string
  price?: string
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
  supplyProblems?: SupplyProblem[]
  commercializations?: Commercialization[]
  deliveryModusCode?: string
  deliveryModus?: string
  deliveryModusSpecificationCode?: string
  deliveryModusSpecification?: string
  reimbursements?: Reimbursement
  standardDosage?: StandardDosage[]
}

export type PrescribedMedicationType = {
  uuid: string
  medication: Medication
  rid?: string
  ampId?: string
  cnk?: string
  dmppProductId?: string
  prescriberVisibility?: PractitionerVisibilityType
  pharmacistVisibility?: PharmacistVisibilityType
}
