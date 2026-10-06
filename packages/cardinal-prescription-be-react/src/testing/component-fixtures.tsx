import React from 'react'
import { Address, Duration, HealthcareParty, Medication, Medicinalproduct, Patient, RegimenItem } from '@icure/be-fhc-lite-api'
import type { SamV2Api } from '@icure/cardinal-be-sam-sdk'
import type { Med, MedicationProvider, MedicationType, PrescribedMedicationType } from '../shared/types'
import { MedicationSearch } from '../shared/components/MedicationSearch'
import { PrescriptionModal } from '../shared/components/PrescriptionModal'
import { PrescriptionList } from '../shared/components/PrescriptionList'
import { PrescriptionPrintModal } from '../shared/components/PrescriptionPrintModal'
import { PractitionerCertificate } from '../shared/components/PractitionerCertificate'

// Component fixtures: no network, no SAM backend. The SAM SDK is only reached by the cheap
// alternatives panel, which these fixtures never open.

export const fakeSamSdk = {} as SamV2Api

export const sampleMedication: MedicationType = {
  id: 'amp-1',
  kind: 'product',
  title: 'Dafalgan 1 g comprimés',
  activeIngredient: 'paracétamol 1 g',
  regulatory: {
    be: {
      ampId: 'amp-1',
      cnk: '1234567',
      dmppProductId: 'dmpp-1',
      intendedName: 'Dafalgan 1 g comprimés',
      price: '5,25 €',
      cheap: true,
      blackTriangle: true,
      deliveryModusCode: 'P',
      deliveryModus: 'Prescription médicale',
    },
  },
}

export const fakeMedicationProvider: MedicationProvider = {
  findByLabel: (): AsyncIterable<Med> => ({
    async *[Symbol.asyncIterator]() {
      yield sampleMedication
    },
  }),
}

export const sampleRegimen = [new RegimenItem({ administratedQuantity: { quantity: 1, unit: 'unit' }, dayPeriod: { type: 'CD-PERIOD', code: 'morning' } })]

export const samplePrescription = (rid?: string): PrescribedMedicationType => ({
  uuid: rid ? `sent-${rid}` : 'pending-1',
  rid,
  medication: new Medication({
    medicinalProduct: new Medicinalproduct({ intendedname: 'Dafalgan 1 g comprimés' }),
    instructionForPatient: '1 comprimé le matin',
    regimen: sampleRegimen,
    beginMoment: 20261006,
    endMoment: 20270104,
    duration: new Duration({ value: 30 }),
  }),
})

export const samplePatient: Patient = { firstName: 'Jeanne', lastName: 'Test', ssin: '00000000097', dateOfBirth: 19700101 }

export const samplePrescriber: HealthcareParty = {
  firstName: 'Paul',
  lastName: 'Test',
  ssin: '00000000196',
  nihii: '10000000000',
  addresses: [new Address({ addressType: Address.AddressTypeEnum.Clinic, street: 'Rue de la Loi', houseNumber: '16', postalCode: '1000', city: 'Bruxelles' })],
}

const noop = () => undefined

/** Every public component, mounted with fixtures, keyed by name. */
export const publicComponents: Record<string, () => React.ReactElement> = {
  MedicationSearch: () => <MedicationSearch medicationProvider={fakeMedicationProvider} onAddPrescription={noop} disableInputEventsTracking={false} />,
  PrescriptionModal: () => <PrescriptionModal sdk={fakeSamSdk} medicationToPrescribe={sampleMedication} onClose={noop} onSubmit={noop} modalMood="create" />,
  PrescriptionList: () => (
    <PrescriptionList
      prescribedMedications={[samplePrescription(), samplePrescription('BEP0000000001')]}
      handleModifyPrescription={noop}
      handleDeletePrescription={noop}
      handleSendPrescriptions={async () => undefined}
      handlePrintPrescriptions={async () => undefined}
    />
  ),
  PrescriptionPrintModal: () => (
    <PrescriptionPrintModal closeModal={noop} prescribedMedications={[samplePrescription('BEP0000000001')]} prescriber={samplePrescriber} patient={samplePatient} />
  ),
  PractitionerCertificate: () => (
    <PractitionerCertificate
      certificateValid={false}
      certificateUploaded={false}
      errorWhileVerifyingCertificate={undefined}
      onUploadCertificate={noop}
      onResetCertificate={noop}
      onDecryptCertificate={noop}
    />
  ),
}
