import type { ComponentType } from 'react'
import type { RegimenItem } from '@icure/be-fhc-lite-api'
import type { RegimenItem as ParsedRegimenItem } from '@icure/medication-sdk'
import type { MedicationType, PrescribedMedicationType } from './medication'

/** What a posology editor edits: the structured FHC regimen and its human-readable text. */
export interface PosologyEditorValue {
  /** Structured regimen sent to Recip-e as `Medication.regimen`. Empty when the posology is text only. */
  regimen: RegimenItem[]
  /** Posology text sent as `Medication.instructionForPatient` and shown on the printed prescription. */
  text: string
}

/** The product being prescribed and what the library knows about it. Read-only for the editor. */
export interface PosologyEditorContext {
  /** The medication being prescribed; undefined when modifying a free-text (compound) prescription. */
  medication?: MedicationType
  /** The prescription being modified, when the modal is in `modify` mode. */
  prescriptionToModify?: PrescribedMedicationType
  /** Current library language. */
  language: 'fr' | 'nl' | 'de' | 'en'
  /** SAM standard dosages of the medication's VMP group, filtered by `standardDosageContext`. */
  standardDosages: ParsedRegimenItem[]
  /** Patient context the host passed to the modal. */
  standardDosageContext?: { ageInYears?: number; weightInKg?: number; renalFunctionMlPerMin?: number }
}

export interface PosologyEditorProps {
  /** Id the editor's main control should carry (the modal's form field id, `dosage`). */
  id: string
  /** Translated field label ("Posologie" / "Dosering" / ...). The editor renders it. */
  label: string
  /** Current value: the regimen and text of the prescription being modified, or empty. */
  value: PosologyEditorValue
  context: PosologyEditorContext
  /** Call on every change; the modal keeps the last value and submits it unchanged. */
  onChange: (value: PosologyEditorValue) => void
  /** Validation message the modal shows below the editor, if any. */
  errorMessage?: string
  /** Id of the element holding `errorMessage`, for `aria-describedby`. */
  errorMessageId: string
}

/** A host-supplied posology editor, rendered by `PrescriptionModal` in place of its free-text field. */
export type PosologyEditorComponent = ComponentType<PosologyEditorProps>
