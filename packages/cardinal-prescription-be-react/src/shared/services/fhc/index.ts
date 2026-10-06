import { CertificateValidationResultType, PrescribedMedicationType, TokenStore } from '../../types'
import { Code as FhcCode, fhcRecipeApi, fhcStsApi, HealthcareParty, Patient, Prescription, PrescriptionRequest, UUIDType } from '@icure/be-fhc-lite-api'
import { dateEncode, offsetDate } from '../../../internal/utils/date-helpers'
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

/**
 * The eHealth connector credentials a host already holds (its own certificate import and STS token
 * loop): the keystore id the connector returned on upload, the certificate passphrase and the SAML
 * token id. Passed to {@link sendRecipe} / {@link verifyCertificateWithSts} instead of a passphrase,
 * the library neither reads its own IndexedDB certificate store nor requests a token.
 */
export interface ConnectorCredentials {
  keystoreId: string
  passphrase: string
  tokenId: string | null
}

/** The credentials, or a function giving them when the send happens (so a token renewed meanwhile is used). */
export type ConnectorCredentialsSource = ConnectorCredentials | (() => ConnectorCredentials | Promise<ConnectorCredentials>)

const isCredentials = (value: string | ConnectorCredentialsSource): value is ConnectorCredentialsSource => typeof value !== 'string'
const resolveCredentials = async (source: ConnectorCredentialsSource): Promise<ConnectorCredentials> => (typeof source === 'function' ? await source() : source)

// A Recip-e prescription is executable for 90 days when the prescriber sets no "executable until".
const DEFAULT_VALIDITY_DAYS = 90

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
    // The "executable until" date; it used to be the start date (`beginMoment`), so a prescription
    // sent from the modal expired the day it started.
    expirationDate: prescribedMedication.medication.endMoment ?? offsetDate(prescribedMedication.medication.beginMoment ?? dateEncode(new Date()), DEFAULT_VALIDITY_DAYS),
    lang: cardinalLanguage.getLanguage(),
  })

export const createFhcCode = (type: string, code: string, version = '1.0') =>
  new FhcCode({
    id: `${type}:${code}:${version}`,
    type,
    code,
    version,
  })

export class MissingStsTokenError extends Error {
  constructor() {
    super('Cannot obtain an STS token')
    this.name = 'MissingStsTokenError'
  }
}

const createPrescriptions = (
  fhc_url: string,
  prescriber: HealthcareParty,
  prescription: PrescriptionRequest,
  keystoreId: string,
  tokenId: string,
  passphrase: string,
): Promise<Prescription[]> => {
  const recipe = new fhcRecipeApi(fhc_url, [])
  // One prescription per medication.
  return Promise.all(
    prescription.medications?.map((m) =>
      recipe.createPrescriptionV4UsingPOST(
        keystoreId,
        tokenId,
        passphrase,
        'persphysician',
        prescriber.nihii!,
        prescriber.ssin!,
        `${prescriber.firstName} ${prescriber.lastName}`,
        'iCure',
        '1',
        new PrescriptionRequest({ ...prescription, medications: [m] }),
      ),
    ) ?? [],
  )
}

/**
 * Sends the prescription to Recip-e. `auth` is either the certificate passphrase (the library then
 * decrypts the certificate it stored, uploads it once per `cache` and requests a token), or the
 * host's {@link ConnectorCredentials} (nothing is read from or written to browser storage, and
 * `cache` is unused). A missing STS token fails the send.
 */
export const sendRecipe = async (
  config: FhcServiceConfig,
  samVersion: string,
  prescriber: HealthcareParty,
  patient: Patient,
  prescribedMedication: PrescribedMedicationType,
  auth: string | ConnectorCredentialsSource,
  fhc_url: string,
  cache?: TokenStore,
): Promise<Prescription[]> => {
  const prescription = makePrescriptionRequest(config, samVersion, prescriber, patient, prescribedMedication)
  if (!prescriber?.ssin || !prescriber?.nihii) throw new Error('Missing prescriber information')

  if (isCredentials(auth)) {
    const credentials = await resolveCredentials(auth)
    if (!credentials.tokenId) throw new MissingStsTokenError()
    return createPrescriptions(fhc_url, prescriber, prescription, credentials.keystoreId, credentials.tokenId, credentials.passphrase)
  }
  if (!cache) throw new Error('A TokenStore is needed with a passphrase')
  const passphrase = auth

  const keystore = await loadAndDecryptCertificate(prescriber.ssin, passphrase)
  if (!keystore) throw new Error('Cannot obtain keystore')

  const sts = new fhcStsApi(fhc_url, [])
  const storeKey = `keystore.${prescriber.ssin}`

  // Reuse the keystore uuid cached during certificate verification; a cold cache (a miss resolves
  // to undefined) uploads the keystore again.
  const keystoreUuid =
    (await cache.get(storeKey)) ??
    (await sts.uploadKeystoreUsingPOST(keystore).then(({ uuid }: UUIDType) => {
      if (!uuid) throw new Error('Cannot obtain keystore uuid')
      return cache.put(storeKey, uuid)
    }))

  const stsToken = await sts.requestTokenUsingGET(passphrase, prescriber.ssin, keystoreUuid, 'doctor')
  if (!stsToken.tokenId) throw new MissingStsTokenError()
  return createPrescriptions(fhc_url, prescriber, prescription, keystoreUuid, stsToken.tokenId, passphrase)
}

/**
 * Checks the prescriber can obtain an STS token. With the host's {@link ConnectorCredentials}, the
 * connector checks the token the host holds (no browser storage involved, `cache` unused).
 */
export const verifyCertificateWithSts = async (
  prescriber: HealthcareParty,
  auth: string | ConnectorCredentialsSource,
  cache: TokenStore | undefined,
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
    if (isCredentials(auth)) {
      const credentials = await resolveCredentials(auth)
      return { status: !!credentials.tokenId && (await new fhcStsApi(fhc_url, []).checkTokenValidUsingGET(credentials.tokenId)) }
    }
    if (!cache) throw new Error('A TokenStore is needed with a passphrase')
    const passphrase = auth
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

    const stsToken = await sts.requestTokenUsingGET(passphrase, prescriber.ssin, keystoreUuid, 'doctor')
    return { status: !!stsToken.tokenId }
  } catch (error: any) {
    // The error only: its context would name the prescriber.
    console.error('Certificate verification error:', error?.message ?? 'unknown')
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
