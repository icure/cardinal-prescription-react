import { IndexedDbService } from '../indexed-db'
import { CertificateRecordType, GenericStoreType } from '../../types'
import { CERTIFICATE_IDB_CONFIG } from '../constants'

export class CertificateService {
  private indexedDbService: IndexedDbService
  private certificateStore: GenericStoreType<CertificateRecordType> | null = null

  constructor() {
    this.indexedDbService = new IndexedDbService(CERTIFICATE_IDB_CONFIG)
  }

  /** You MUST call this before using any instance methods. */
  async initialize(): Promise<void> {
    await this.indexedDbService.initializeIndexedDb()
    this.certificateStore = this.indexedDbService.getIndexedDbStore<CertificateRecordType>()
  }

  public async loadCertificateInformation(hcp_ssin: string): Promise<
    | {
        salt: ArrayBuffer
        iv: ArrayBuffer
        encryptedCertificate: ArrayBuffer
      }
    | undefined
  > {
    try {
      const record = await this.getCertificateFromStore(hcp_ssin)
      return {
        salt: new Uint8Array(record.salt).buffer,
        iv: new Uint8Array(record.iv).buffer,
        encryptedCertificate: new Uint8Array(record.encryptedCertificate).buffer,
      }
    } catch (error) {
      console.error(`No certificate record found for HCP SSIN ${hcp_ssin}:`, error)
      return undefined
    }
  }

  public async loadAndDecryptCertificate(hcp_ssin: string, passphrase: string): Promise<ArrayBuffer | undefined> {
    console.log('hcp_ssin: ' + hcp_ssin)
    console.log('passphrase: ' + passphrase)
    try {
      const info = await this.loadCertificateInformation(hcp_ssin)
      console.log('info: ')
      console.log(info)

      if (!info) return undefined

      const { salt, iv, encryptedCertificate } = info
      const encoder = new TextEncoder()
      const passwordKey = await crypto.subtle.importKey('raw', encoder.encode(passphrase), { name: 'PBKDF2' }, false, ['deriveKey'])

      const decryptionKey = await crypto.subtle.deriveKey(
        { name: 'PBKDF2', salt: new Uint8Array(salt), iterations: 100_000, hash: 'SHA-256' },
        passwordKey,
        { name: 'AES-GCM', length: 256 },
        false,
        ['decrypt'],
      )

      return await crypto.subtle.decrypt(
        {
          name: 'AES-GCM',
          iv: new Uint8Array(iv),
        },
        decryptionKey,
        new Uint8Array(encryptedCertificate),
      )
    } catch (error) {
      console.error(`Decryption failed for HCP SSIN "${hcp_ssin}":`, error)
      return undefined
    }
  }

  public async uploadAndEncryptCertificate(hcp_ssin: string, passphrase: string, certificate: ArrayBuffer): Promise<CertificateRecordType | undefined> {
    try {
      const salt = crypto.getRandomValues(new Uint8Array(16))
      const iv = crypto.getRandomValues(new Uint8Array(12))

      const passwordKey = await crypto.subtle.importKey('raw', new TextEncoder().encode(passphrase), { name: 'PBKDF2' }, false, ['deriveKey'])
      const encryptionKey = await crypto.subtle.deriveKey(
        {
          name: 'PBKDF2',
          salt,
          iterations: 100_000,
          hash: 'SHA-256',
        },
        passwordKey,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt'],
      )

      const encryptedCertificate = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, encryptionKey, certificate)

      const record: CertificateRecordType = {
        id: hcp_ssin,
        salt: Array.from(salt),
        iv: Array.from(iv),
        encryptedCertificate: Array.from(new Uint8Array(encryptedCertificate)),
      }

      const res = await this.saveCertificateInStore(hcp_ssin, record)
      console.log('uploadAndEncryptCertificate res')
      console.log(res)
      return res
    } catch (error) {
      console.error(`Encryption failed for certificate of the HCP SSIN ${hcp_ssin}:`, error)
      return undefined
    }
  }

  public async deleteCertificate(hcp_ssin: string): Promise<boolean> {
    try {
      await this.deleteCertificateFromStore(hcp_ssin).then((res) => {
        console.log('deleteCertificateFromStore res')
        console.log(res)
      })
      console.log(`Certificate with ID ${hcp_ssin} successfully deleted.`)
      return true
    } catch (error) {
      console.error(`Failed to delete certificate with ID ${hcp_ssin}:`, error)
      return false
    }
  }

  private async saveCertificateInStore(id: string, certificate: CertificateRecordType): Promise<CertificateRecordType> {
    if (!this.certificateStore) throw new Error('CertificateService not initialized')
    return await this.certificateStore.put(id, certificate)
  }

  private async getCertificateFromStore(id: string): Promise<CertificateRecordType> {
    if (!this.certificateStore) throw new Error('CertificateService not initialized')
    return this.certificateStore.get(id)
  }

  private async deleteCertificateFromStore(id: string): Promise<void> {
    if (!this.certificateStore) throw new Error('CertificateService not initialized')
    await this.certificateStore.delete(id)
  }
}
