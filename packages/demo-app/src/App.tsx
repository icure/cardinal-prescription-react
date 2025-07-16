import React, { useEffect, useRef, useState } from 'react'
import { CertificateService, FhcService, I18nService, PractitionerCertificate, SamSdkService } from '@icure/cardinal-prescription-be-react'
import './index.css'
import { Address, HealthcareParty, Patient } from '@icure/be-fhc-lite-api'
import { CardinalBeSamApi, CardinalBeSamSdk, Credentials, SamVersion } from '@icure/cardinal-be-sam-sdk'
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
  const i18nService = useRef(I18nService.getInstance())
  const certificateServiceRef = useRef<CertificateService | null>(null)
  const fhcServiceRef = useRef<FhcService | null>(null)
  const [samService, setSamService] = useState<SamSdkService | null>(null)
  const [certificateUploaded, setCertificateUploaded] = useState(false)
  const [certificateValid, setCertificateValid] = useState(false)
  const [errorWhileVerifyingCertificate, setErrorWhileVerifyingCertificate] = useState<string | undefined>()
  const [samVersion, setSamVersion] = useState<SamVersion | undefined>()
  const [passphrase, setPassphrase] = useState<string | undefined>()
  const [uiReady, setUiReady] = useState(false)

  // Initialize language on mount
  useEffect(() => {
    i18nService.current.setLanguage(CARDINAL_PRESCRIPTION_LANGUAGE).catch((err) => console.error('Could not set language', err))
  }, [])

  // Initialize all backend services on mount
  useEffect(() => {
    const initializeAll = async () => {
      try {
        // Initialize Cardinal SDK (SAM)
        const cardinalSdkInstance: CardinalBeSamApi = await CardinalBeSamSdk.initialize(
          undefined,
          ICURE_URL,
          new Credentials.UsernamePassword(practitionerCredentials.username, practitionerCredentials.password),
        )
        const samSdkService = new SamSdkService(cardinalSdkInstance.sam)
        setSamService(samSdkService)
        setSamVersion(await samSdkService.fetchSamVersion())

        // Initialize CertificateService
        certificateServiceRef.current = new CertificateService()
        await certificateServiceRef.current.initialize()

        // Initialize FhcService and inject CertificateService
        fhcServiceRef.current = await FhcService.initialize(
          {
            vendor,
            samPackage,
          },
          certificateServiceRef.current,
        )

        try {
          if (hcp.ssin) {
            const res = await certificateServiceRef.current.loadCertificateInformation(hcp.ssin)
            setCertificateUploaded(!!res)
          }
        } catch {
          setCertificateUploaded(false)
        }

        try {
          if (certificateUploaded && passphrase) {
            const certificateValidationResult = await fhcServiceRef.current.validateDecryptedCertificate(hcp, passphrase)

            setCertificateValid(certificateValidationResult.status)
            setErrorWhileVerifyingCertificate(certificateValidationResult.error?.[CARDINAL_PRESCRIPTION_LANGUAGE])
          }
        } catch {
          setCertificateValid(false)
          setErrorWhileVerifyingCertificate('Unexpected error')
        }
      } catch (error) {
        console.error('Initialization error:', error)
        setErrorWhileVerifyingCertificate('Initialization failed')
      }
    }
    initializeAll().then(() => setUiReady(true))
  }, [])

  const validateCertificate = async () => {
    if (fhcServiceRef.current && passphrase) {
      try {
        setUiReady(false)
        await fhcServiceRef.current.validateDecryptedCertificate(hcp, passphrase).then((res) => {
          console.log('validateDecryptedCertificate res')
          console.log(res)
          setCertificateValid(res.status)
          setErrorWhileVerifyingCertificate(res.error?.[CARDINAL_PRESCRIPTION_LANGUAGE])
        })
      } catch (error) {
        setCertificateValid(false)
        setErrorWhileVerifyingCertificate('Unexpected error')
        console.error('Error while validating certificate from the Demo App:', error)
      } finally {
        setUiReady(true)
      }
    }
  }

  const onUploadCertificate = async (certificateData: ArrayBuffer, passphrase: string) => {
    if (!certificateServiceRef.current || !hcp.ssin) return

    try {
      setUiReady(false)
      await certificateServiceRef.current.uploadAndEncryptCertificate(hcp.ssin, passphrase, certificateData).then((res) => {
        console.log('uploadAndEncryptCertificate res')
        console.log(res)
      })

      setPassphrase(passphrase)
      setCertificateUploaded(true)
    } catch (error) {
      setCertificateUploaded(false)
      console.error('Error while uploading certificate from the Demo App:', error)
    } finally {
      setUiReady(true)
    }
  }

  const onResetCertificate = async (): Promise<void> => {
    if (!certificateServiceRef.current || !hcp.ssin) return

    const certificateService = certificateServiceRef.current
    if (!certificateService) return
    await certificateService.deleteCertificate(hcp.ssin)
  }

  return (
    <div className="App">
      <h1>Hello from the Demo App</h1>
      <div className="divider"></div>
      uiReady: {uiReady ? <strong>True</strong> : <strong>False</strong>}
      <div className="divider"></div>
      <div>
        <PractitionerCertificate
          certificateValid={certificateValid}
          certificateUploaded={certificateUploaded}
          errorWhileVerifyingCertificate={errorWhileVerifyingCertificate}
          onResetCertificate={onResetCertificate}
          onUploadCertificate={onUploadCertificate}
        />
      </div>
      <div className="divider"></div>
      <p>
        SamVersion:
        <strong>{samVersion?.version}</strong>
      </p>
      <div className="divider"></div>
    </div>
  )
}
