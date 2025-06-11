import { Address, type Duration, Medication } from '@icure/be-fhc-api'
import { Commercialization, Reimbursement, SupplyProblem, VmpStub } from '@icure/cardinal-be-sam'

export type PractitionerVisibility = 'open' | 'locked' | 'gmd_prescriber'
export type PharmacistVisibility = 'NULL' | 'locked'

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
  deliveryModusSpecificationCode?: 'Sp' | 'Sp1' | 'Sp/S' | 'Sp1/S' | 'IMP/Sp' | 'IMP/Sp1'
  deliveryModusSpecification?: string
  reimbursements?: Reimbursement
}

export type PrescribedMedicationType = {
  uuid: string
  medication: Medication
  rid?: string
  ampId?: string
  cnk?: string
  dmppProductId?: string
  prescriberVisibility?: PractitionerVisibility
  pharmacistVisibility?: PharmacistVisibility
}

export type AddMedicationFormType = {
  dosage?: string | undefined
  duration?: number | undefined | Duration
  durationTimeUnit?: string

  treatmentStartDate?: string | undefined
  executableUntil?: string | undefined

  prescriptionsNumber?: number | undefined
  periodicityTimeUnit?: string
  periodicityDaysNumber?: number | undefined
  substitutionAllowed?: boolean

  recipeInstructionForPatient?: string
  instructionsForReimbursement?: string
  prescriberVisibility?: PractitionerVisibility
  pharmacistVisibility?: PharmacistVisibility
}

export interface Prescriber {
  lastName: string
  firstName: string
  ssin: string
  nihii: string
  addresses: Address[]
}

export interface Patient {
  lastName: string
  firstName: string
  ssin: string
  dateOfBirth: number
}
