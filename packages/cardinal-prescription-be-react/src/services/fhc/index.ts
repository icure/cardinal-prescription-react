import { CertificateValidationResultType, GenericStoreType, PrescribedMedicationType } from '../../types'
import { Code as FhcCode, fhcRecipeApi, fhcStsApi, HealthcareParty, Patient, Prescription, PrescriptionRequest } from '@icure/be-fhc-lite-api'
import { IndexedDbService } from '../indexed-db'
import { FHC_URL, TOKEN_IDB_CONFIG } from '../constants'
import { dateEncode } from '../../utils/date-helpers'
import { CertificateService } from '../certificate'

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

export class FhcService {
  private tokenStore!: GenericStoreType<string>
  private certificateService!: CertificateService
  private indexedDbService: IndexedDbService

  private vendor!: VendorType
  private samPackage!: SamPackageType

  private constructor(config: FhcServiceConfig) {
    this.vendor = config.vendor
    this.samPackage = config.samPackage
    this.indexedDbService = new IndexedDbService(TOKEN_IDB_CONFIG)
    // certificateService should be initialized after DB is ready
  }

  // Use this static method to create and initialize the service!
  static async initialize(config: FhcServiceConfig, certificateService: CertificateService): Promise<FhcService> {
    const service = new FhcService(config)
    await service.indexedDbService.initializeIndexedDb()
    service.tokenStore = service.indexedDbService.getIndexedDbStore<string>()
    service.certificateService = certificateService
    return service
  }

  public async sendRecipe(
    samVersion: string,
    prescriber: HealthcareParty,
    patient: Patient,
    prescribedMedication: PrescribedMedicationType,
    passphrase: string,
  ): Promise<Prescription[]> {
    const prescription = this.makePrescriptionRequest(samVersion, prescriber, patient, prescribedMedication)
    if (!prescriber?.ssin || !prescriber?.nihii) throw new Error('Missing prescriber information')

    const keystore = await this.loadAndDecryptCertificate(prescriber.ssin, passphrase)
    if (!keystore) throw new Error('Cannot obtain keystore')

    const sts = new fhcStsApi(FHC_URL, [])
    const recipe = new fhcRecipeApi(FHC_URL, [])

    const { STORE_KEY, TOKEN_KEY } = this.buildTokenStorageKeys(prescriber)

    // Get or upload keystore UUID
    let keystoreUuid = await this.getTokenFromStore(STORE_KEY).catch(() => undefined)
    if (!keystoreUuid) {
      const { uuid } = await sts.uploadKeystoreUsingPOST(keystore)
      if (!uuid) throw new Error('Cannot obtain keystore uuid')
      await this.saveTokenInStore(STORE_KEY, uuid)
      keystoreUuid = uuid
    }

    // Get token from STS
    const tokenValue = await this.getTokenFromStore(TOKEN_KEY).catch(() => undefined)
    const stsToken = await sts.requestTokenUsingGET(passphrase, prescriber.ssin, keystoreUuid, 'doctor', tokenValue)
    if (!stsToken.tokenId) throw new Error('Cannot obtain token')

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

  public async verifyCertificateWithSts(prescriber: HealthcareParty, passphrase: string): Promise<CertificateValidationResultType> {
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
      const keystore = await this.loadAndDecryptCertificate(prescriber.ssin, passphrase)
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

      const { STORE_KEY } = this.buildTokenStorageKeys(prescriber)
      const sts = new fhcStsApi(FHC_URL, [])
      const { uuid } = await sts.uploadKeystoreUsingPOST(keystore)
      if (!uuid) throw new Error('Cannot obtain keystore uuid')
      await this.saveTokenInStore(STORE_KEY, uuid)

      const token = await this.getTokenFromStore(STORE_KEY)
      const stsToken = await sts.requestTokenUsingGET(passphrase, prescriber.ssin, token, 'doctor', token)
      return { status: !!stsToken.tokenId }
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

  public async validateDecryptedCertificate(hcp: HealthcareParty, passphrase: string): Promise<CertificateValidationResultType> {
    try {
      await this.loadAndDecryptCertificate(hcp.ssin, passphrase)
      return await this.verifyCertificateWithSts(hcp, passphrase)
    } catch {
      return { status: false }
    }
  }

  public createFhcCode(type: string, code: string, version = '1.0') {
    return new FhcCode({ id: `${type}:${code}:${version}`, type, code, version })
  }

  private async getTokenFromStore(id: string): Promise<string> {
    if (!this.tokenStore) throw new Error('PrescriptionService not initialized')
    return this.tokenStore.get(id)
  }

  private async saveTokenInStore(id: string, token: string): Promise<string> {
    if (!this.tokenStore) throw new Error('PrescriptionService not initialized')
    return await this.tokenStore.put(id, token)
  }

  private async loadAndDecryptCertificate(hcp_ssin: string, passphrase: string): Promise<ArrayBuffer | undefined> {
    return this.certificateService.loadAndDecryptCertificate(hcp_ssin, passphrase)
  }

  private buildTokenStorageKeys(hcp: HealthcareParty) {
    return {
      STORE_KEY: `keystore.${hcp.ssin}`,
      TOKEN_KEY: `token.${hcp.ssin}`,
    }
  }

  private makePrescriptionRequest(samVersion: string, prescriber: HealthcareParty, patient: Patient, prescribedMedication: PrescribedMedicationType): PrescriptionRequest {
    return new PrescriptionRequest({
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
      vendorName: this.vendor.vendorName,
      vendorEmail: this.vendor.vendorEmail,
      vendorPhone: this.vendor.vendorPhone,
      packageName: this.samPackage.packageName,
      packageVersion: this.samPackage.packageVersion,
      vision: prescribedMedication.pharmacistVisibility,
      visionOthers: prescribedMedication.prescriberVisibility,
      samVersion,
      deliveryDate: prescribedMedication.medication.beginMoment ?? dateEncode(new Date()),
      expirationDate: prescribedMedication.medication.beginMoment ?? dateEncode(new Date(+new Date() + 1000 * 3600 * 24 * 90)),
      lang: 'fr',
    })
  }
}
