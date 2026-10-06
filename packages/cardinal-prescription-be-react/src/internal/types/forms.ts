import { Duration, RegimenItem } from '@icure/be-fhc-lite-api'
import { PractitionerVisibilityType, PharmacistVisibilityType } from '../../shared/types/visibility'
import { ReimbursementType } from './reimbursement'

export type PrescriptionFormType = {
  medicationTitle?: string
  dosage?: string
  /** Structured regimen supplied by a host posology editor; when absent, the regimen is parsed from `dosage`. */
  regimen?: RegimenItem[]
  duration?: number | Duration
  durationTimeUnit?: string
  treatmentStartDate?: string
  executableUntil?: string
  prescriptionsNumber?: number
  periodicityTimeUnit?: string
  periodicityDaysNumber?: number
  substitutionAllowed?: boolean
  recipeInstructionForPatient?: string
  instructionsForReimbursement?: ReimbursementType
  prescriberVisibility?: PractitionerVisibilityType
  pharmacistVisibility?: PharmacistVisibilityType
}
