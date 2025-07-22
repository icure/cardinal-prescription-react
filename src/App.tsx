import React, { useEffect, useState } from 'react'
import { CardinalBeSamSdk, Credentials } from '@icure/cardinal-be-sam-sdk'
import '@fontsource-variable/inter'
// Placeholder imports for components to be implemented
import PrescribeMedicationsSearch from './components/medication-elements/MedicationSearch'
import MedicationPrescriptionModal from './components/prescription-elements/PrescriptionModal'
import Prescriptions from './components/prescription-elements/PrescriptionList'
import CertificateUpload from './components/certificate-elements/CertificateUpload'
import Button from './components/form-elements/Button'
import TextInput from './components/form-elements/TextInput'
import PrintPrescriptionModal from './components/prescription-elements/PrintPrescriptionModal'
import { getSamVersion } from './services/cardinal-sam'
import { loadAndDecryptCertificate, loadCertificateInformation, openCertificatesDatabase, sendRecipe } from './services/fhc'

import './App.css'

const patient = {
  firstName: 'Antoine',
  lastName: 'Duchâteau',
  gender: 'male',
  ssin: '74010414733',
  dateOfBirth: 19740104,
}

const hcp = {
  firstName: 'Fabien',
  lastName: 'Zimer',
  gender: 'male',
  ssin: '84100212104',
  nihii: '10104133000',
  addresses: [
    {
      street: 'Rue de la Loi',
      number: '16',
      postalCode: '1000',
      city: 'Bruxelles',
      country: 'Belgique',
    },
  ],
}

const App: () => React.JSX.Element = () => {
  const [sdk, setSdk] = useState<any>()
  const [samVersion, setSamVersion] = useState<string>()
  const [certificateUploaded, setCertificateUploaded] = useState(false)
  const [certificateValid, setCertificateValid] = useState<boolean | undefined>(undefined)
  const [uiReady, setUiReady] = useState(false)
  const [passphrase, setPassphrase] = useState('')
  const [showMedicationPrescriptionModal, setShowMedicationPrescriptionModal] = useState(false)
  const [medicationToPrescribe, setMedicationToPrescribe] = useState<any>()
  const [showPrintModal, setShowPrintModal] = useState(false)
  const [prescribedMedicationToModify, setPrescribedMedicationToModify] = useState<any>()
  const [prescribedMedications, setPrescribedMedications] = useState<any[]>([])
  const [cache, setCache] = useState<Record<string, string>>({})

  useEffect(() => {
    const initialiseSdk = async () => {
      try {
        const sdk = await CardinalBeSamSdk.initialize(
          undefined,
          'https://nightly.icure.cloud',
          new Credentials.UsernamePassword('larisa.shashuk+medicationsTest@gmail.com', '5aa9d0f0-2fab-4f9f-9f6a-5d8244280873'),
        )
        setSdk(sdk.sam)
      } catch (error) {
        console.error('Error initializing SDK:', error)
      }
    }
    initialiseSdk()
  }, [])

  useEffect(() => {
    const loadCert = async () => {
      if (!sdk) return
      const db = await openCertificatesDatabase()
      try {
        await loadCertificateInformation(db, hcp.ssin)
        setCertificateUploaded(true)
      } catch (e) {
        setCertificateUploaded(false)
      }
      setUiReady(true)
    }
    loadCert()
  }, [sdk])

  useEffect(() => {
    const loadVersion = () => {
      if (sdk) {
        getSamVersion(sdk).then((res: any) => {
          if (res?.version) setSamVersion(res.version)
        })
      } else {
        setTimeout(loadVersion, 100)
      }
    }
    setTimeout(loadVersion, 100)
  }, [sdk])

  useEffect(() => {
    if (certificateUploaded && passphrase) {
      loadAndDecryptCertificate(passphrase, hcp.ssin)
        .then(() => setCertificateValid(true))
        .catch(() => setCertificateValid(false))
    }
  }, [certificateUploaded, passphrase])

  const handleAddPrescription = (medication: any) => {
    setShowMedicationPrescriptionModal(true)
    setMedicationToPrescribe(medication)
  }

  const handleModifyPrescription = (prescribedMedication: any) => {
    setShowMedicationPrescriptionModal(true)
    setPrescribedMedicationToModify(prescribedMedication)
  }

  const handleDeletePrescription = (prescribedMedication: any) => {
    setPrescribedMedications((prev) => prev.filter((item) => item.uuid !== prescribedMedication.uuid))
  }

  const handleSendPrescriptions = async () => {
    await Promise.all(
      prescribedMedications
        .filter((m) => !m.rid)
        .map(async (med) => {
          try {
            const res = await sendRecipe(
              samVersion!,
              hcp,
              patient,
              med,
              {
                get: (key: string) => Promise.resolve(cache[key]),
                put: (key: string, value: string) => Promise.resolve((cache[key] = value)),
              },
              passphrase,
            )
            setPrescribedMedications((prev) =>
              prev.map((item) =>
                item.uuid === med.uuid
                  ? {
                      ...item,
                      rid: res[0]?.rid,
                    }
                  : item,
              ),
            )
          } catch (e) {}
        }),
    )
  }

  const handlePrintPrescriptions = async () => {
    await handleSendPrescriptions()
    setShowPrintModal(true)
  }

  const closePrintModal = () => {
    setShowPrintModal(false)
  }

  return (
    <main className="home">
      {!uiReady ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="certificate">
            {certificateUploaded ? (
              <div>
                <div className="line">
                  <TextInput id="passphrase" type="password" label="Password" value={passphrase} onChange={(e) => setPassphrase(e.target.value)} />
                  <Button type={'button'} title="Reset&nbsp;Certificate" view="outlined" handleClick={() => setCertificateUploaded(false)} />
                </div>
                <div>
                  {certificateValid === false ? <p className="error">Passphrase is invalid</p> : certificateValid === true ? <p className="success">Passphrase is valid</p> : null}
                </div>
              </div>
            ) : (
              <CertificateUpload
                handleSave={(id: string, password: string) => {
                  setCertificateUploaded(true)
                  setPassphrase(password)
                }}
              />
            )}
          </div>
          <div className="home__divider"></div>
          <p>Sam version: {samVersion}</p>
          <div className="home__divider"></div>
          <PrescribeMedicationsSearch
            sdk={sdk}
            deliveryEnvironment="P"
            short={true}
            handleAddPrescription={handleAddPrescription}
            disableInputEventsTracking={showMedicationPrescriptionModal}
          />
          {medicationToPrescribe && showMedicationPrescriptionModal && (
            <>
              <div className="home__divider"></div>
              <MedicationPrescriptionModal
                modalTitle="Créer la prescription"
                medicationToPrescribe={medicationToPrescribe}
                handleSave={(newMedications: any[]) => {
                  setPrescribedMedications((prev) => [...prev, ...newMedications])
                  setMedicationToPrescribe(undefined)
                }}
                handleClose={() => {
                  setShowMedicationPrescriptionModal(false)
                  setMedicationToPrescribe(undefined)
                }}
              />
            </>
          )}
          {prescribedMedicationToModify && showMedicationPrescriptionModal && (
            <>
              <div className="home__divider"></div>
              <MedicationPrescriptionModal
                modalTitle="Modifier la prescription"
                prescribedMedication={prescribedMedicationToModify}
                handleSave={([prescribedMedication]: any[]) => {
                  setPrescribedMedications((prev) => prev.map((item) => (item.uuid === prescribedMedication.uuid ? prescribedMedication : item)))
                  setPrescribedMedicationToModify(undefined)
                }}
                handleClose={() => {
                  setShowMedicationPrescriptionModal(false)
                  setPrescribedMedicationToModify(undefined)
                }}
              />
            </>
          )}
          {prescribedMedications.length !== 0 && (
            <>
              <div className="home__divider"></div>
              <Prescriptions
                handleDeletePrescription={handleDeletePrescription}
                handleModifyPrescription={handleModifyPrescription}
                prescribedMedications={prescribedMedications}
                handleSendPrescriptions={handleSendPrescriptions}
                handlePrintPrescriptions={handlePrintPrescriptions}
              />
            </>
          )}
          {showPrintModal && <PrintPrescriptionModal prescribedMedications={prescribedMedications} prescriber={hcp} patient={patient} closeModal={closePrintModal} />}
        </>
      )}
    </main>
  )
}

export default App
