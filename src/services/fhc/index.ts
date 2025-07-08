import type { Patient, PrescribedMedicationType, Prescriber } from '../../types'
import { fhcRecipeApi, fhcStsApi, Prescription, PrescriptionRequest, UUIDType } from '@icure/be-fhc-lite-api'
import { Code as FhcCode } from '@icure/be-fhc-lite-api/model/Code'

const vendor = {
  vendorEmail: 'support@test.be',
  vendorName: 'vendorName',
  vendorPhone: '+3200000000',
}

const usedPackage = {
  packageName: 'test[test/1.0]-freehealth-connector',
  packageVersion: '1.0]-freehealth-connector',
}

export const createFhcFromCode = {
  from: (type: string, code: string, version?: string) =>
    new FhcCode({
      id: `${type}:${code}:${version ?? '1.0'}`,
      type,
      code,
      version: version ?? '1.0',
    }),
}

export interface TokenStore {
  put: (id: string, data: string) => Promise<string>
  get: (id: string) => Promise<string>
}

export function dateDecode(date: number) {
  return date > 99990000 ? new Date(date / 10000000000, ((date / 100000000) % 100) - 1, (date / 1000000) % 100) : new Date(date / 10000, ((date / 100) % 100) - 1, date % 100)
}

export function dateEncode(date: Date) {
  return date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate()
}

export function offsetDate(date: number, offsetInDays: number): number {
  const result = new Date(dateDecode(date))
  result.setDate(result.getDate() + offsetInDays)
  return dateEncode(result)
}

export async function openCertificatesDatabase() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open('CertificateStore', 1)

    request.onupgradeneeded = (event) => {
      const database = (event.target as IDBOpenDBRequest).result
      database.createObjectStore('certificates', { keyPath: 'id' })
    }

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

export async function loadCertificateInformation(
  db: IDBDatabase,
  id: string,
): Promise<{
  salt: ArrayBuffer
  iv: ArrayBuffer
  encryptedCertificate: ArrayBuffer
}> {
  const transaction = db.transaction('certificates', 'readonly')
  const store = transaction.objectStore('certificates')

  const request = store.get(id)
  const record = await new Promise<any>((resolve, reject) => {
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })

  if (!record) {
    throw new Error('Record not found')
  }
  return record
}

export async function loadAndDecryptCertificate(password: string, id: string): Promise<ArrayBuffer | undefined> {
  const db = await openCertificatesDatabase()
  if (!db) {
    console.error('Database not initialized')
    return undefined
  }

  const { salt, iv, encryptedCertificate } = await loadCertificateInformation(db, id)

  // Derive a key from the password using PBKDF2
  const passwordKey = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), { name: 'PBKDF2' }, false, ['deriveKey'])

  const decryptionKey = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: new Uint8Array(salt),
      iterations: 100000,
      hash: 'SHA-256',
    },
    passwordKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt'],
  )

  // Decrypt the certificate
  return await crypto.subtle.decrypt({ name: 'AES-GCM', iv: new Uint8Array(iv) }, decryptionKey, new Uint8Array(encryptedCertificate))
}

export async function uploadAndEncrypt(db: IDBDatabase, id: string, passphrase: string, certificate: ArrayBuffer) {
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const iv = crypto.getRandomValues(new Uint8Array(12))

  // Derive a key from the password using PBKDF2
  const passwordKey = await crypto.subtle.importKey('raw', new TextEncoder().encode(passphrase), { name: 'PBKDF2' }, false, ['deriveKey'])

  const encryptionKey = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    passwordKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt'],
  )

  return new Promise<string>(async (resolve, reject) => {
    try {
      // Ensure the database is available
      if (!db) {
        throw new Error('IndexedDB instance is not available.')
      }

      // Encrypt the certificate (outside the transaction to avoid delays)
      const encryptedCertificate = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, encryptionKey, certificate)

      // Start a transaction
      const transaction = db.transaction('certificates', 'readwrite')
      const store = transaction.objectStore('certificates')

      // Convert the encrypted certificate and other data to a storable format
      const record = {
        id: id,
        salt: Array.from(salt), // Convert TypedArray to a normal array
        iv: Array.from(iv),
        encryptedCertificate: Array.from(new Uint8Array(encryptedCertificate)), // Convert ArrayBuffer to an array
      }

      // Use a single transaction to perform all operations
      const request = store.get(id)

      request.onsuccess = () => {
        if (request.result) {
          // Update the existing record
          const putRequest = store.put(record)
          putRequest.onsuccess = () => {
            console.log(`Record with ID ${id} successfully updated.`)
            resolve(id)
          }
          putRequest.onerror = () => {
            console.error(`Error updating record with ID ${id}:`, putRequest.error)
            reject(putRequest.error)
          }
        } else {
          // Add a new record
          const addRequest = store.add(record)
          addRequest.onsuccess = () => {
            console.log(`Record with ID ${id} successfully added.`)
            resolve(id)
          }
          addRequest.onerror = () => {
            console.error(`Error adding record with ID ${id}:`, addRequest.error)
            reject(addRequest.error)
          }
        }
      }

      request.onerror = () => {
        console.error(`Error retrieving record with ID ${id}:`, request.error)
        reject(request.error)
      }

      // Transaction completion handlers
      transaction.oncomplete = () => {
        console.log('Transaction completed successfully.')
      }

      transaction.onerror = () => {
        console.error('Transaction failed:', transaction.error)
      }

      transaction.onabort = () => {
        console.error('Transaction aborted.')
      }
    } catch (error) {
      console.error('An error occurred:', error)
    }
  })
}

export const makePrescriptionRequest = (samVersion: string, prescriber: Prescriber, patient: Patient, prescribedMedication: PrescribedMedicationType): PrescriptionRequest =>
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
    vendorName: vendor.vendorName,
    vendorEmail: vendor.vendorEmail,
    vendorPhone: vendor.vendorPhone,
    packageName: usedPackage.packageName,
    packageVersion: usedPackage.packageVersion,
    vision: prescribedMedication.pharmacistVisibility,
    visionOthers: prescribedMedication.prescriberVisibility,
    samVersion: samVersion,
    deliveryDate: prescribedMedication.medication.beginMoment ?? dateEncode(new Date()),
    expirationDate: prescribedMedication.medication.beginMoment ?? dateEncode(new Date(+new Date() + 1000 * 3600 * 24 * 90)),
    lang: 'fr',
  })

export const sendRecipe = async (
  samVersion: string,
  prescriber: Prescriber,
  patient: Patient,
  prescribedMedication: PrescribedMedicationType,
  cache: TokenStore,
  passphrase: string,
): Promise<Prescription[]> => {
  const prescription = makePrescriptionRequest(samVersion, prescriber, patient, prescribedMedication)
  if (!prescriber || !prescriber.ssin || !prescriber.nihii) {
    throw new Error('Missing prescriber information')
  }
  const keystore = await loadAndDecryptCertificate(passphrase, prescriber.ssin)
  if (!keystore) {
    throw new Error('Cannot obtain keystore')
  }

  const url = 'https://fhcacc.icure.cloud'

  const sts = new fhcStsApi(url, [])
  const recipe = new fhcRecipeApi(url, [])

  const storeKey = `keystore.${prescriber.ssin}`
  const tokenKey = `token.${prescriber.ssin}`
  const keystoreUuid =
    (await cache.get(storeKey)) ??
    (await sts.uploadKeystoreUsingPOST(keystore).then(({ uuid }: UUIDType) => {
      if (!uuid) {
        throw new Error('Cannot obtain keystore uuid')
      }
      return cache.put(storeKey, uuid)
    }))
  const stsToken = await sts.requestTokenUsingGET(passphrase, prescriber.ssin, keystoreUuid, 'doctor', await cache.get(tokenKey))
  if (!stsToken.tokenId) {
    throw new Error('Cannot obtain token not found')
  }
  return Promise.all(
    prescription.medications?.map((m) =>
      recipe.createPrescriptionV4UsingPOST(
        keystoreUuid,
        stsToken.tokenId!,
        passphrase,
        'persphysician',
        prescriber.nihii!,
        prescriber.ssin!,
        `${prescriber.firstName!} ${prescriber.lastName!}`,
        'iCure',
        '1',
        new PrescriptionRequest({ ...prescription, medications: [m] }),
      ),
    ) ?? [],
  )
}
