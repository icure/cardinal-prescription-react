import { CertificateValidationResultType, PrescribedMedicationType } from '../../types'
import { Code as FhcCode, fhcRecipeApi, fhcStsApi, HealthcareParty, Patient, Prescription, PrescriptionRequest } from '@icure/be-fhc-lite-api'
import { IndexedDbServiceStore } from '../indexed-db'
import { TOKEN_IDB_CONFIG } from '../constants'
import { dateEncode } from '../../utils/date-helpers'
import { loadAndDecryptCertificate } from '../certificate'
import { cardinalLanguage } from '../i18n'

const tokenStore = new IndexedDbServiceStore<string>(TOKEN_IDB_CONFIG)

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

const getTokenStorageKeys = (hcp: HealthcareParty) => ({
  STORE_KEY: `keystore.${hcp.ssin}`,
  TOKEN_KEY: `token.${hcp.ssin}`,
})

const language = cardinalLanguage.getLanguage()

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
    lang: language,
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
): Promise<Prescription[]> => {
  const prescription = makePrescriptionRequest(config, samVersion, prescriber, patient, prescribedMedication)
  if (!prescriber?.ssin || !prescriber?.nihii) throw new Error('Missing prescriber information')

  const keystore = await loadAndDecryptCertificate(prescriber.ssin, passphrase)
  if (!keystore) throw new Error('Cannot obtain keystore')

  const recipe = new fhcRecipeApi(fhc_url, [])

  const { keystoreUuid, stsTokenId } = await verifyCertificateWithSts(keystore, prescriber, passphrase, fhc_url)

  // Create all prescriptions (for each medication)
  return Promise.all(
    prescription.medications?.map((m) =>
      recipe.createPrescriptionV4UsingPOST(
        keystoreUuid,
        stsTokenId,
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

export const verifyCertificateWithSts = async (
  keystore: ArrayBuffer,
  prescriber: HealthcareParty,
  passphrase: string,
  fhc_url: string,
): Promise<CertificateValidationResultType> => {
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
    const { STORE_KEY, TOKEN_KEY } = getTokenStorageKeys(prescriber)
    const sts = new fhcStsApi(fhc_url, [])
    const { uuid } = await sts.uploadKeystoreUsingPOST(keystore)
    if (!uuid) throw new Error('Cannot obtain keystore uuid')
    await tokenStore.put(STORE_KEY, uuid)

    const stsToken = await sts.requestTokenUsingGET(passphrase, prescriber.ssin, uuid, 'doctor')
    await tokenStore.put(TOKEN_KEY, stsToken.tokenId)

    return { stsTokenId: stsToken.tokenId, keystoreUuid: uuid, status: !!stsToken.tokenId }
  } catch (error: any) {
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

export const validateDecryptedCertificate = async (hcp: HealthcareParty, passphrase: string, fhc_url: string): Promise<CertificateValidationResultType> => {
  try {
    const keystore = await loadAndDecryptCertificate(hcp.ssin, passphrase)
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
    return await verifyCertificateWithSts(keystore, hcp, passphrase, fhc_url)
  } catch {
    return { status: false }
  }
}
