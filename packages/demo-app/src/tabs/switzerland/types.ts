import { MedicationType } from '@icure/cardinal-prescription-be-react'

// `ch` has no equivalent of the library's `PrescribedMedicationType` (that type is built around
// `@icure/be-fhc-lite-api`'s `Medication`, `ampId`/`cnk`/`dmppProductId`, and `rid` — all
// Belgian-only concepts, see CONTEXT.md). This is a demo-app-local shape covering just enough to
// represent "a medication with a freeform posology, quantity/duration, and a start date" without
// any recip-e/transmission concept.
export type ChDurationUnit = 'days' | 'weeks' | 'months'

export interface ChPrescriptionDraft {
  id: string
  medication: MedicationType
  posologyText: string
  quantity: number
  durationUnit: ChDurationUnit
  startDate: string
}

// Demo-app-local identification blocks for the Swiss ordonnance print layout. GLN is the Swiss
// GS1 identifier every prescriber carries; RCC (registre des codes-créanciers, a.k.a. ZSR) is the
// insurers' billing number — both are printed on every Swiss prescription.
export interface ChPrescriber {
  name: string
  specialty: string
  street: string
  postalCode: string
  city: string
  phone: string
  gln: string
  rcc: string
}

export interface ChPatient {
  name: string
  dateOfBirth: string
  address: string
}
