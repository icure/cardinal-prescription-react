import { IndexedDbServiceStore } from '../indexed-db'
import { CertificateRecordType } from '../../types'
import { CERTIFICATE_IDB_CONFIG } from '../../../internal/services/constants'

// Opened lazily: importing the library must not create an IndexedDB database (nor fail where IndexedDB is absent).
let certificateStoreInstance: IndexedDbServiceStore<CertificateRecordType> | undefined
const certificateStore = (): IndexedDbServiceStore<CertificateRecordType> => (certificateStoreInstance ??= new IndexedDbServiceStore<CertificateRecordType>(CERTIFICATE_IDB_CONFIG))

export const loadCertificateInformation = async (
  hcp_ssin: string,
): Promise<
  | {
      salt: ArrayBuffer
      iv: ArrayBuffer
      encryptedCertificate: ArrayBuffer
    }
  | undefined
> => {
  try {
    const record = await certificateStore().get(hcp_ssin)
    return {
      salt: new Uint8Array(record.salt).buffer,
      iv: new Uint8Array(record.iv).buffer,
      encryptedCertificate: new Uint8Array(record.encryptedCertificate).buffer,
    }
  } catch {
    // Never the SSIN nor the error's context in the console (it names the prescriber).
    console.error('No certificate record found for the prescriber')
    return undefined
  }
}

export const loadAndDecryptCertificate = async (hcp_ssin: string, passphrase: string): Promise<ArrayBuffer | undefined> => {
  try {
    const info = await loadCertificateInformation(hcp_ssin)

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
  } catch {
    console.error('Certificate decryption failed for the prescriber')
    return undefined
  }
}

export const uploadAndEncryptCertificate = async (hcp_ssin: string, passphrase: string, certificate: ArrayBuffer): Promise<CertificateRecordType | undefined> => {
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

    return await certificateStore().put(hcp_ssin, record)
  } catch {
    console.error('Certificate encryption failed for the prescriber')
    return undefined
  }
}

export const deleteCertificate = async (hcp_ssin: string): Promise<boolean> => {
  try {
    await certificateStore().delete(hcp_ssin)
    return true
  } catch {
    console.error('Failed to delete the prescriber certificate')
    return false
  }
}
