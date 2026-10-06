import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { Address, Duration, HealthcareParty, Medication, Medicinalproduct, Patient, RegimenItem } from '@icure/be-fhc-lite-api'
import type { SamV2Api } from '@icure/cardinal-be-sam-sdk'
import {
  cardinalLanguage,
  Med,
  MedicationProvider,
  MedicationSearch,
  MedicationType,
  PosologyEditorProps,
  PractitionerCertificate,
  PrescribedMedicationType,
  PrescriptionList,
  PrescriptionModal,
  PrescriptionPrintModal,
} from '@icure/cardinal-prescription-be-react'

// Offline fixtures: the harness never calls SAM, FHC or IndexedDB-backed certificate code.
const params = new URLSearchParams(window.location.search)
const mount = params.get('mount') ?? 'none'
const theme = params.get('theme') // 'dark' | 'auto' | 'light' | null
const skin = params.get('skin') === '1'
const slot = params.get('slot') === '1'

document.body.dataset.host = theme === 'dark' || params.get('host') === 'dark' ? 'dark' : 'light'

cardinalLanguage.setLanguage((params.get('lang') as 'fr' | 'nl' | 'en' | 'de' | null) ?? 'fr')

const medication: MedicationType = {
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

const provider: MedicationProvider = {
  findByLabel: (): AsyncIterable<Med> => ({
    async *[Symbol.asyncIterator]() {
      yield medication
    },
  }),
}

const prescription = (rid?: string): PrescribedMedicationType => ({
  uuid: rid ?? 'pending-1',
  rid,
  medication: new Medication({
    medicinalProduct: new Medicinalproduct({ intendedname: 'Dafalgan 1 g comprimés' }),
    instructionForPatient: '1 comprimé le matin',
    regimen: [new RegimenItem({ administratedQuantity: { quantity: 1, unit: 'unit' }, dayPeriod: { type: 'CD-PERIOD', code: 'morning' } })],
    beginMoment: 20261006,
    endMoment: 20270104,
    duration: new Duration({ value: 30 }),
  }),
})

const patient: Patient = { firstName: 'Jeanne', lastName: 'Test', ssin: '00000000097', dateOfBirth: 19700101 }
const prescriber: HealthcareParty = {
  firstName: 'Paul',
  lastName: 'Test',
  ssin: '00000000196',
  nihii: '10000000000',
  addresses: [new Address({ addressType: Address.AddressTypeEnum.Clinic, street: 'Rue de la Loi', houseNumber: '16', postalCode: '1000', city: 'Bruxelles' })],
}

/** A host posology editor, with host markup the library must not restyle. */
const HostPosologyEditor = ({ id, label, value, onChange, errorMessageId }: PosologyEditorProps) => (
  <div className="host-editor">
    <label htmlFor={id}>{label}</label>
    <input id={id} value={value.text} aria-describedby={errorMessageId} onChange={(e) => onChange({ regimen: value.regimen, text: e.target.value })} />
    <ul id="host-editor-list">
      <li>Host editor item</li>
    </ul>
  </div>
)

const noop = () => undefined

const Mounted = () => {
  const [log, setLog] = useState('')
  switch (mount) {
    case 'search':
      return <MedicationSearch medicationProvider={provider} onAddPrescription={(m) => setLog(m.title)} disableInputEventsTracking={false} />
    case 'modal':
      return (
        <PrescriptionModal
          sdk={{} as SamV2Api}
          medicationToPrescribe={medication}
          onClose={noop}
          onSubmit={(meds) => setLog(JSON.stringify(meds.map((m) => m.medication.instructionForPatient)))}
          modalMood="create"
          posologyEditor={slot ? HostPosologyEditor : undefined}
        />
      )
    case 'list':
      return (
        <PrescriptionList
          prescribedMedications={[prescription(), prescription('BEP0000000001')]}
          handleModifyPrescription={noop}
          handleDeletePrescription={noop}
          handleSendPrescriptions={async () => undefined}
          handlePrintPrescriptions={async () => undefined}
        />
      )
    case 'print':
      return <PrescriptionPrintModal closeModal={noop} prescribedMedications={[prescription('BEP0000000001')]} prescriber={prescriber} patient={patient} />
    case 'certificate':
      return (
        <PractitionerCertificate
          certificateValid={false}
          certificateUploaded={false}
          errorWhileVerifyingCertificate={undefined}
          onUploadCertificate={noop}
          onResetCertificate={noop}
          onDecryptCertificate={noop}
        />
      )
    default:
      return <output id="harness-log">{log}</output>
  }
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <div id="library-host" className={skin ? 'skinned' : undefined} data-cp-theme={theme ?? undefined}>
      <Mounted />
    </div>
  </React.StrictMode>,
)
