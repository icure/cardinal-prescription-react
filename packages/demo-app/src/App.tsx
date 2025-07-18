import React, { useEffect, useState } from 'react'
import {
  cardinalLanguage,
  deleteCertificate,
  fetchSamVersion,
  loadCertificateInformation,
  MedicationSearch,
  MedicationType,
  PractitionerCertificate,
  uploadAndEncryptCertificate,
  validateDecryptedCertificate,
} from '@icure/cardinal-prescription-be-react'
import './index.css'
import { Address, HealthcareParty, Patient } from '@icure/be-fhc-lite-api'
import { CardinalBeSamApi, CardinalBeSamSdk, Credentials, SamV2Api, SamVersion } from '@icure/cardinal-be-sam-sdk'
import { CARDINAL_PRESCRIPTION_LANGUAGE } from './services/constants'

const patient: Patient = {
  firstName: 'Antoine',
  lastName: 'Duchâteau',
  ssin: '74010414733',
  dateOfBirth: 19740104,
}
const hcp: HealthcareParty = {
  firstName: 'Fabien',
  lastName: 'Zimer',
  ssin: '84100212104',
  nihii: '10104133000',
  addresses: [
    new Address({
      addressType: Address.AddressTypeEnum.Clinic,
      street: 'Rue de la Loi',
      houseNumber: '16',
      postalCode: '1000',
      city: 'Bruxelles',
      country: 'Belgique',
    }),
  ],
}
const vendor = {
  vendorName: 'vendorName',
  vendorEmail: 'support@test.be',
  vendorPhone: '+3200000000',
}
const samPackage = {
  packageName: 'test[test/1.0]-freehealth-connector',
  packageVersion: '1.0]-freehealth-connector',
}

// To create new Credentials.UsernamePassword(), follow these steps:
// 1. Go to https://cockpit.icure.dev/ — the management platform for Cardinal.
// 2. Register and log in.
// 3. Create a solution, then a database, and then a healthcare professional (HCP).
// 4. For this HCP, generate an Active Authentication Token.
// 5. Use the HCP's email address as the username, and the token as the password.
const practitionerCredentials = {
  username: 'larisa.shashuk+medicationsTest@gmail.com',
  password: '5aa9d0f0-2fab-4f9f-9f6a-5d8244280873',
}
const ICURE_URL = 'https://nightly.icure.cloud'

export const App = () => {
  // Service instance refs
  const [certificateUploaded, setCertificateUploaded] = useState(false)
  const [certificateValid, setCertificateValid] = useState(false)
  const [errorWhileVerifyingCertificate, setErrorWhileVerifyingCertificate] = useState<string | undefined>()
  const [samVersion, setSamVersion] = useState<SamVersion | undefined>()
  const [passphrase, setPassphrase] = useState<string | undefined>()
  const [cardinalSdkInstance, setCardinalSdkInstance] = useState<SamV2Api | undefined>(undefined)
  const [showMedicationPrescriptionModal, setShowMedicationPrescriptionModal] = useState(false)
  const [medicationToPrescribe, setMedicationToPrescribe] = useState<MedicationType>()

  cardinalLanguage.setLanguage(CARDINAL_PRESCRIPTION_LANGUAGE)

  // Initialize all backend services on mount
  useEffect(() => {
    const initializeAll = async () => {
      try {
        // Initialize Cardinal SDK (SAM)
        const cardinalBeSamAInstance: CardinalBeSamApi = await CardinalBeSamSdk.initialize(
          undefined,
          ICURE_URL,
          new Credentials.UsernamePassword(practitionerCredentials.username, practitionerCredentials.password),
        )
        setCardinalSdkInstance(cardinalBeSamAInstance.sam)
        setSamVersion(await fetchSamVersion(cardinalBeSamAInstance.sam))

        try {
          if (hcp.ssin) {
            const res = await loadCertificateInformation(hcp.ssin)
            setCertificateUploaded(!!res)
          }
        } catch {
          setCertificateUploaded(false)
        }
      } catch (error) {
        console.error('Initialization error:', error)
        setErrorWhileVerifyingCertificate('Initialization failed')
      }
    }
    initializeAll()
  }, [])

  const validateCertificate = async (passphrase: string) => {
    try {
      const res = await validateDecryptedCertificate(hcp, passphrase)

      setCertificateValid(res.status)
      setErrorWhileVerifyingCertificate(res.error?.[CARDINAL_PRESCRIPTION_LANGUAGE])
      setCertificateUploaded(!res.error)
    } catch (error) {
      setCertificateValid(false)
      setErrorWhileVerifyingCertificate('Unexpected error')
      setCertificateUploaded(false)

      console.error('Error while validating certificate from the Demo App:', error)
    } finally {
    }
  }

  useEffect(() => {
    if (certificateUploaded && passphrase) {
      validateCertificate(passphrase).catch(console.error)
    } else {
      setCertificateValid(false)
      setErrorWhileVerifyingCertificate(undefined)
    }
  }, [passphrase, certificateUploaded])

  // We do this certificate is uploaded, but the passphrase is not set
  const onDecryptCertificate = (passphrase: string) => {
    setPassphrase(passphrase)
  }

  // We do this when no certificate is uploaded
  const onUploadCertificate = async (certificateData: ArrayBuffer, passphrase: string) => {
    if (!hcp.ssin) return

    try {
      await uploadAndEncryptCertificate(hcp.ssin, passphrase, certificateData)

      onDecryptCertificate(passphrase)
      setCertificateUploaded(true)
    } catch (error) {
      setCertificateUploaded(false)
      console.error('Error while uploading certificate from the Demo App:', error)
    }
  }

  const onResetCertificate = async (): Promise<void> => {
    if (!hcp.ssin) return
    await deleteCertificate(hcp.ssin)
    setPassphrase(undefined)
    setCertificateUploaded(false)
    setCertificateValid(false)
    setErrorWhileVerifyingCertificate(undefined)
  }

  const handleAddPrescription = (medication: any) => {
    setShowMedicationPrescriptionModal(true)
    setMedicationToPrescribe(medication)
  }
  return (
    <div className="App">
      <h1>Hello from the Demo App</h1>
      <div className="divider"></div>
      <div className="element">
        <PractitionerCertificate
          certificateValid={certificateValid}
          certificateUploaded={certificateUploaded}
          errorWhileVerifyingCertificate={errorWhileVerifyingCertificate}
          onResetCertificate={onResetCertificate}
          onUploadCertificate={onUploadCertificate}
          onDecryptCertificate={onDecryptCertificate}
        />
      </div>
      <div className="divider"></div>
      <p>
        SamVersion:
        <strong>{samVersion?.version}</strong>
      </p>
      <div className="divider"></div>
      <div className="element">
        {cardinalSdkInstance && certificateValid && (
          <MedicationSearch
            sdk={cardinalSdkInstance}
            deliveryEnvironment="P"
            short={true}
            handleAddPrescription={handleAddPrescription}
            disableInputEventsTracking={showMedicationPrescriptionModal}
          />
        )}
      </div>
    </div>
  )
}
