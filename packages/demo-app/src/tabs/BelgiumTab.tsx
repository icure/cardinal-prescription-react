import React, { useEffect, useMemo, useState } from 'react'
import {
  createIndexedDbTokenStore,
  deleteCertificate,
  fetchSamVersion,
  loadCertificateInformation,
  MedicationSearch,
  MedicationType,
  PractitionerCertificate,
  PrescribedMedicationType,
  PrescriptionList,
  PrescriptionModal,
  PrescriptionPrintModal,
  SamMedicationProvider,
  sendRecipe,
  uploadAndEncryptCertificate,
  validateDecryptedCertificate,
} from '@icure/cardinal-prescription-be-react'
import { Address, HealthcareParty, Patient } from '@icure/be-fhc-lite-api'
import { CardinalBeSamSdk, Credentials, SamV2Api, SamVersion } from '@icure/cardinal-be-sam-sdk'
import { practitionerCredentials, ICURE_URL, FHC_URL, CARDINAL_PRESCRIPTION_LANGUAGE } from '../config'

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

// Credentials and environment URLs come from environment variables — see config.ts
// and .env.example. Copy .env.example to .env.local and fill in your own values.

// Belgium (SAM) — the full certificate -> search -> prescribe -> send -> print flow, via
// `@icure/cardinal-prescription-be-react`'s `PractitionerCertificate`/`MedicationSearch`/
// `PrescriptionModal`/`PrescriptionList`/`PrescriptionPrintModal`/`sendRecipe`. This is a
// mechanical relocation of what used to live directly in `App.tsx` — same behavior, same props,
// same logic, just moved into its own component with its own local state.
export const BelgiumTab = () => {
  // Service instance refs
  const [certificateUploaded, setCertificateUploaded] = useState(false)
  const [isCertificateValid, setIsCertificateValid] = useState(false)
  const [errorWhileVerifyingCertificate, setErrorWhileVerifyingCertificate] = useState<string | undefined>()
  const [samVersion, setSamVersion] = useState<SamVersion | undefined>()
  const [passphrase, setPassphrase] = useState<string | undefined>()
  const [cardinalBeSamInstance, setCardinalBeSamInstance] = useState<SamV2Api | undefined>(undefined)
  const [isPrescriptionModalOpen, setPrescriptionModalOpen] = useState(false)
  const [medicationToPrescribe, setMedicationToPrescribe] = useState<MedicationType>()
  const [alternativeCheapMedications, setAlternativeCheapMedications] = useState<MedicationType[]>([])
  const [prescriptionToModify, setPrescriptionToModify] = useState<PrescribedMedicationType>()
  const [prescriptionModalMode, setPrescriptionModalMode] = useState<'create' | 'modify' | null>(null)
  const [prescriptions, setPrescriptions] = useState<PrescribedMedicationType[]>([])
  const [isPrescriptionPrintModalOpen, setPrescriptionPrintModalOpen] = useState(false)

  // Token store used to cache the FHC keystore uuid / STS token between
  // certificate validation and prescription sending.
  const tokenStore = useMemo(() => createIndexedDbTokenStore(), [])

  // The `be` MedicationProvider, replacing the raw SAM sdk instance MedicationSearch used to
  // take directly — memoized so it's only reconstructed when the underlying sdk instance changes.
  const medicationProvider = useMemo(() => cardinalBeSamInstance && new SamMedicationProvider(cardinalBeSamInstance, 'P'), [cardinalBeSamInstance])

  // Initialize all backend services on mount
  useEffect(() => {
    const initializeAll = async () => {
      try {
        // Initialize Cardinal Be Sam (SAM)
        const cardinalBeSamApi = await CardinalBeSamSdk.initialize(
          undefined,
          ICURE_URL,
          new Credentials.UsernamePassword(practitionerCredentials.username, practitionerCredentials.password),
        )
        setCardinalBeSamInstance(cardinalBeSamApi.sam)
        setSamVersion(await fetchSamVersion(cardinalBeSamApi.sam))

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
      const res = await validateDecryptedCertificate(hcp, passphrase, tokenStore, FHC_URL)

      setIsCertificateValid(res.status)
      setErrorWhileVerifyingCertificate(res.error?.[CARDINAL_PRESCRIPTION_LANGUAGE])
      setCertificateUploaded(!res.error)
    } catch (error) {
      setIsCertificateValid(false)
      setErrorWhileVerifyingCertificate('Unexpected error')
      setCertificateUploaded(false)

      console.error('Error while validating certificate from the Demo App:', error)
    }
  }

  useEffect(() => {
    if (certificateUploaded && passphrase) {
      validateCertificate(passphrase).catch(console.error)
    } else {
      setIsCertificateValid(false)
      setErrorWhileVerifyingCertificate(undefined)
    }
  }, [passphrase, certificateUploaded])

  // We do this if the certificate is uploaded, but the passphrase is not set
  const onDecryptCertificate = (passphrase: string) => {
    setPassphrase(passphrase)
  }
  // We do this if no certificate is uploaded
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
    setIsCertificateValid(false)
    setErrorWhileVerifyingCertificate(undefined)
  }

  const onCreatePrescription = (medication: MedicationType, cheapAlternatives: MedicationType[]) => {
    setPrescriptionModalOpen(true)
    setPrescriptionModalMode('create')
    setMedicationToPrescribe(medication)
    // Held in state for a later phase where the PrescriptionModal will surface cheaper alternatives.
    setAlternativeCheapMedications(cheapAlternatives)
  }
  const onClosePrescriptionModal = () => {
    setPrescriptionModalMode(null)
    setMedicationToPrescribe(undefined)
    setPrescriptionToModify(undefined)
    setPrescriptionModalOpen(false)
  }
  const onSubmitCreatePrescription = (newPrescriptions: PrescribedMedicationType[]) => {
    console.log(newPrescriptions)
    setPrescriptions((prev) => [...prev, ...newPrescriptions])
    onClosePrescriptionModal()
  }
  const onSubmitModifyPrescription = (prescriptionsToModify: PrescribedMedicationType[]) => {
    setPrescriptions((prev) => prev?.map((item) => (item.uuid === prescriptionsToModify[0].uuid ? prescriptionsToModify[0] : item)))
    onClosePrescriptionModal()
  }
  const onModifyPrescription = (prescription: PrescribedMedicationType) => {
    setPrescriptionModalOpen(true)
    setPrescriptionModalMode('modify')
    setPrescriptionToModify(prescription)
  }
  const onDeletePrescription = (prescription: PrescribedMedicationType) => {
    setPrescriptions((prev) => prev?.filter((item) => item.uuid !== prescription.uuid))
  }
  const onClosePrescriptionPrintModal = () => setPrescriptionPrintModalOpen(false)
  const handleSendPrescriptions = async () => {
    await Promise.all(
      prescriptions
        .filter((m) => !m.rid)
        .map(async (med) => {
          try {
            if (!!samVersion?.version && !!passphrase) {
              const res = await sendRecipe(
                {
                  vendor,
                  samPackage,
                },
                samVersion.version,
                hcp,
                patient,
                med,
                passphrase,
                FHC_URL,
                tokenStore,
              )
              setPrescriptions((prev) =>
                prev.map((item) =>
                  item.uuid === med.uuid
                    ? {
                        ...item,
                        rid: res[0]?.rid,
                      }
                    : item,
                ),
              )
            }
          } catch (e) {
            console.error('Error while sending prescription from the Demo App:', e)
          }
        }),
    )
  }
  const handlePrintPrescriptions = async () => {
    await handleSendPrescriptions()
    setPrescriptionPrintModalOpen(true)
  }

  return (
    <div>
      <h2>Belgium (SAM)</h2>
      <div className="element">
        <PractitionerCertificate
          certificateValid={isCertificateValid}
          certificateUploaded={certificateUploaded}
          errorWhileVerifyingCertificate={errorWhileVerifyingCertificate}
          onResetCertificate={onResetCertificate}
          onUploadCertificate={onUploadCertificate}
          onDecryptCertificate={onDecryptCertificate}
        />
      </div>
      <div className="dividerApp"></div>
      <p>
        SamVersion:
        <strong>{samVersion?.version}</strong>
      </p>
      <div className="dividerApp"></div>
      <div className="element">
        {medicationProvider && isCertificateValid && (
          <MedicationSearch medicationProvider={medicationProvider} onAddPrescription={onCreatePrescription} disableInputEventsTracking={isPrescriptionModalOpen} />
        )}
      </div>
      {prescriptions.length !== 0 && (
        <>
          <div className="home__dividerApp"></div>
          <div className="element">
            <PrescriptionList
              handleDeletePrescription={onDeletePrescription}
              handleModifyPrescription={onModifyPrescription}
              prescribedMedications={prescriptions}
              handleSendPrescriptions={handleSendPrescriptions}
              handlePrintPrescriptions={handlePrintPrescriptions}
              hideSectionsTitles={true}
            />
          </div>
        </>
      )}

      {prescriptionModalMode === 'create' && cardinalBeSamInstance && (
        <PrescriptionModal
          sdk={cardinalBeSamInstance}
          onClose={onClosePrescriptionModal}
          onSubmit={onSubmitCreatePrescription}
          modalMood={prescriptionModalMode}
          medicationToPrescribe={medicationToPrescribe}
          alternativeCheapMedications={alternativeCheapMedications}
          standardDosageContext={{ ageInYears: 30, weightInKg: 70 }}
        />
      )}
      {prescriptionModalMode === 'modify' && cardinalBeSamInstance && (
        <PrescriptionModal
          sdk={cardinalBeSamInstance}
          onClose={onClosePrescriptionModal}
          onSubmit={onSubmitModifyPrescription}
          modalMood={prescriptionModalMode}
          prescriptionToModify={prescriptionToModify}
          standardDosageContext={{ ageInYears: 30, weightInKg: 70 }}
        />
      )}
      {isPrescriptionPrintModalOpen && (
        <PrescriptionPrintModal prescribedMedications={prescriptions} prescriber={hcp} patient={patient} closeModal={onClosePrescriptionPrintModal} />
      )}
    </div>
  )
}
