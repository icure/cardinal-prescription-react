import { CertificateValidationResultType, PrescribedMedicationType, TokenStore } from '../../types'
import { Code as FhcCode, fhcRecipeApi, fhcStsApi, HealthcareParty, Patient, Prescription, PrescriptionRequest, UUIDType } from '@icure/be-fhc-lite-api'
import { dateEncode } from '../../../internal/utils/date-helpers'
import { loadAndDecryptCertificate } from '../certificate'
import { cardinalLanguage } from '../i18n'

export interface VendorType {
  vendorName: string
  vendorEmail: string
  vendorPhone: string
}

export interface SamPackageType {
  packageName: string
  packageVersion: string
}

export interface FhcServiceConfig {
  vendor: VendorType
  samPackage: SamPackageType
}

const makePrescriptionRequest = (
  config: FhcServiceConfig,
  samVersion: string,
  prescriber: HealthcareParty,
  patient: Patient,
  prescribedMedication: PrescribedMedicationType,
): PrescriptionRequest =>
  new PrescriptionRequest({
    medications: [prescribedMedication.medication],
    patient: {
      firstName: patient.firstName,
      lastName: patient.lastName,
      ssin: patient.ssin,
      dateOfBirth: patient.dateOfBirth,
    },
    hcp: {
      firstName: prescriber.firstName,
      lastName: prescriber.lastName,
      ssin: prescriber.ssin,
      nihii: prescriber.nihii,
      addresses: prescriber.addresses,
    },
    feedback: false,
    vendorName: config.vendor.vendorName,
    vendorEmail: config.vendor.vendorEmail,
    vendorPhone: config.vendor.vendorPhone,
    packageName: config.samPackage.packageName,
    packageVersion: config.samPackage.packageVersion,
    vision: prescribedMedication.pharmacistVisibility,
    visionOthers: prescribedMedication.prescriberVisibility,
    samVersion,
    deliveryDate: prescribedMedication.medication.beginMoment ?? dateEncode(new Date()),
    expirationDate: prescribedMedication.medication.beginMoment ?? dateEncode(new Date(+new Date() + 1000 * 3600 * 24 * 90)),
    lang: cardinalLanguage.getLanguage(),
  })

export const createFhcCode = (type: string, code: string, version = '1.0') =>
  new FhcCode({
    id: `${type}:${code}:${version}`,
    type,
    code,
    version,
  })

export const sendRecipe = async (
  config: FhcServiceConfig,
  samVersion: string,
  prescriber: HealthcareParty,
  patient: Patient,
  prescribedMedication: PrescribedMedicationType,
  passphrase: string,
  fhc_url: string,
  cache: TokenStore,
): Promise<Prescription[]> => {
  const prescription = makePrescriptionRequest(config, samVersion, prescriber, patient, prescribedMedication)
  if (!prescriber?.ssin || !prescriber?.nihii) throw new Error('Missing prescriber information')

  const keystore = await loadAndDecryptCertificate(prescriber.ssin, passphrase)
  if (!keystore) throw new Error('Cannot obtain keystore')

  const sts = new fhcStsApi(fhc_url, [])
  const recipe = new fhcRecipeApi(fhc_url, [])

  const storeKey = `keystore.${prescriber.ssin}`

  // Reuse the keystore uuid cached during certificate verification; only upload
  // the keystore again if it is not already cached.
  const keystoreUuid =
    (await cache.get(storeKey)) ??
    (await sts.uploadKeystoreUsingPOST(keystore).then(({ uuid }: UUIDType) => {
      if (!uuid) throw new Error('Cannot obtain keystore uuid')
      return cache.put(storeKey, uuid)
    }))

  const stsToken = await sts.requestTokenUsingGET(passphrase, prescriber.ssin, keystoreUuid, 'doctor', await cache.get(storeKey))
  if (!stsToken.tokenId) console.error('Cannot obtain token')

  // Create all prescriptions (for each medication)
  return Promise.all(
    prescription.medications?.map((m) =>
      recipe.createPrescriptionV4UsingPOST(
        keystoreUuid,
        stsToken.tokenId,
        passphrase,
        'persphysician',
        prescriber.nihii,
        prescriber.ssin,
        `${prescriber.firstName} ${prescriber.lastName}`,
        'iCure',
        '1',
        new PrescriptionRequest({ ...prescription, medications: [m] }),
      ),
    ) ?? [],
  )
}

export const verifyCertificateWithSts = async (prescriber: HealthcareParty, passphrase: string, cache: TokenStore, fhc_url: string): Promise<CertificateValidationResultType> => {
  if (!prescriber?.ssin || !prescriber?.nihii) {
    return {
      status: false,
      error: {
        en: 'Missing prescriber information',
        fr: 'Informations du prescripteur manquantes',
        nl: 'Ontbrekende voorschrijversinformatie',
        de: 'Fehlende Verschreiberinformationen',
      },
    }
  }
  try {
    const keystore = await loadAndDecryptCertificate(prescriber.ssin, passphrase)
    if (!keystore) {
      return {
        status: false,
        error: {
          en: 'Cannot obtain the certificate',
          fr: 'Impossible d’obtenir le certificat',
          nl: 'Certificaat kan niet worden verkregen',
          de: 'Zertifikat kann nicht abgerufen werden',
        },
      }
    }

    const sts = new fhcStsApi(fhc_url, [])
    const storeKey = `keystore.${prescriber.ssin}`

    const keystoreUuid = await sts.uploadKeystoreUsingPOST(keystore).then(({ uuid }: UUIDType) => {
      if (!uuid) throw new Error('Cannot obtain keystore uuid')
      return cache.put(storeKey, uuid)
    })

    const stsToken = await sts.requestTokenUsingGET(passphrase, prescriber.ssin, keystoreUuid, 'doctor', await cache.get(storeKey))
    return { status: !!stsToken.tokenId }
  } catch (error: any) {
    console.error('Certificate verification error:', error)
    return {
      status: false,
      error: {
        en: error?.message || 'Unknown error occurred',
        fr: error?.message || 'Une erreur inconnue est survenue',
        nl: error?.message || 'Er is een onbekende fout opgetreden',
        de: error?.message || 'Ein unbekannter Fehler ist aufgetreten',
      },
    }
  }
}

export const validateDecryptedCertificate = async (hcp: HealthcareParty, passphrase: string, cache: TokenStore, fhc_url: string): Promise<CertificateValidationResultType> => {
  try {
    // Probe the local decryption first: a passphrase that cannot decrypt the stored envelope
    // fails silently ({status: false}, no error message), while STS-level failures below surface
    // their message through verifyCertificateWithSts's own error handling.
    if (!(await loadAndDecryptCertificate(hcp.ssin!, passphrase))) {
      return { status: false }
    }
    return await verifyCertificateWithSts(hcp, passphrase, cache, fhc_url)
  } catch {
    return { status: false }
  }
}
