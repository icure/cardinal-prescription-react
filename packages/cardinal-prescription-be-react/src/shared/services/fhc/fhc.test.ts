import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { HealthcareParty, Medication, Patient, PrescriptionRequest } from '@icure/be-fhc-lite-api'

import type { PrescribedMedicationType, TokenStore } from '../../types'

// The connector's REST clients, observed: what is sent and with which credentials.
const calls = vi.hoisted(() => ({ created: [] as unknown[][], uploads: 0, tokenRequests: 0, tokenChecks: [] as string[], tokenId: 'token-1' as string | undefined }))
vi.mock('@icure/be-fhc-lite-api', async (importOriginal) => {
  const original = await importOriginal<typeof import('@icure/be-fhc-lite-api')>()
  return {
    ...original,
    fhcRecipeApi: class {
      createPrescriptionV4UsingPOST(...args: unknown[]) {
        calls.created.push(args)
        return Promise.resolve({ rid: `RID-${calls.created.length}` })
      }
    },
    fhcStsApi: class {
      uploadKeystoreUsingPOST() {
        calls.uploads += 1
        return Promise.resolve({ uuid: 'keystore-uuid' })
      }
      requestTokenUsingGET() {
        calls.tokenRequests += 1
        return Promise.resolve({ tokenId: calls.tokenId })
      }
      checkTokenValidUsingGET(tokenId: string) {
        calls.tokenChecks.push(tokenId)
        return Promise.resolve(true)
      }
    },
  }
})
vi.mock('../certificate', () => ({ loadAndDecryptCertificate: vi.fn(async () => new ArrayBuffer(8)) }))

import { loadAndDecryptCertificate } from '../certificate'
import { MissingStsTokenError, sendRecipe, verifyCertificateWithSts, type FhcServiceConfig } from './index'
import { createIndexedDbTokenStore } from '../indexed-db'

const CONFIG: FhcServiceConfig = { vendor: { vendorName: 'v', vendorEmail: 'v@example.org', vendorPhone: '0' }, samPackage: { packageName: 'p', packageVersion: '1' } }
const PRESCRIBER = new HealthcareParty({ firstName: 'Test', lastName: 'EXEMPLE', ssin: '00000000097', nihii: '10000000001' })
const PATIENT = new Patient({ firstName: 'Marie', lastName: 'Exemple', ssin: '86010100123', dateOfBirth: 19860101 })
const prescribed = (medication: Partial<Medication>): PrescribedMedicationType =>
  ({ medication: new Medication({ compoundPrescription: 'x', ...medication }) }) as PrescribedMedicationType
const CREDENTIALS = { keystoreId: 'host-keystore', passphrase: 'host-passphrase', tokenId: 'host-token' }

const requestOf = (call: unknown[]): PrescriptionRequest => call[9] as PrescriptionRequest
const memoryStore = (): TokenStore => {
  const values = new Map<string, string>()
  return { put: async (key, value) => (values.set(key, value), value), get: async (key) => values.get(key) }
}

beforeEach(() => {
  calls.created = []
  calls.uploads = 0
  calls.tokenRequests = 0
  calls.tokenChecks = []
  calls.tokenId = 'token-1'
  vi.mocked(loadAndDecryptCertificate).mockClear()
})
afterEach(() => vi.restoreAllMocks())

describe('Recip-e send with the host connector credentials (MD-04)', () => {
  it('sends with the host keystore, token and passphrase, never reading the certificate store nor requesting a token', async () => {
    await sendRecipe(CONFIG, 'sam', PRESCRIBER, PATIENT, prescribed({ beginMoment: 20261006, endMoment: 20261231 }), CREDENTIALS, 'https://fhc.example.org')
    expect(calls.created).toHaveLength(1)
    expect(calls.created[0]!.slice(0, 3)).toEqual(['host-keystore', 'host-token', 'host-passphrase'])
    expect(loadAndDecryptCertificate).not.toHaveBeenCalled()
    expect(calls.uploads + calls.tokenRequests).toBe(0)
  })

  it('reads the credentials from a provider at send time', async () => {
    const provider = vi.fn(async () => ({ ...CREDENTIALS, tokenId: 'renewed-token' }))
    await sendRecipe(CONFIG, 'sam', PRESCRIBER, PATIENT, prescribed({ beginMoment: 20261006 }), provider, 'https://fhc.example.org')
    expect(provider).toHaveBeenCalledOnce()
    expect(calls.created[0]![1]).toBe('renewed-token')
  })

  it('fails the send when the host holds no STS token', async () => {
    await expect(sendRecipe(CONFIG, 'sam', PRESCRIBER, PATIENT, prescribed({}), { ...CREDENTIALS, tokenId: null }, 'https://fhc.example.org')).rejects.toBeInstanceOf(
      MissingStsTokenError,
    )
    expect(calls.created).toHaveLength(0)
  })

  it('verifies the host token with the connector, without browser storage', async () => {
    expect(await verifyCertificateWithSts(PRESCRIBER, CREDENTIALS, undefined, 'https://fhc.example.org')).toEqual({ status: true })
    expect(calls.tokenChecks).toEqual(['host-token'])
    expect(loadAndDecryptCertificate).not.toHaveBeenCalled()
  })
})

describe('Recip-e send with a passphrase (the library certificate store)', () => {
  it('a cold TokenStore uploads the keystore instead of throwing, then reuses it', async () => {
    const store = memoryStore()
    await sendRecipe(CONFIG, 'sam', PRESCRIBER, PATIENT, prescribed({}), 'passphrase', 'https://fhc.example.org', store)
    await sendRecipe(CONFIG, 'sam', PRESCRIBER, PATIENT, prescribed({}), 'passphrase', 'https://fhc.example.org', store)
    expect(calls.uploads).toBe(1)
    expect(calls.created).toHaveLength(2)
  })

  it('a missing STS token fails the send instead of being logged', async () => {
    calls.tokenId = undefined
    const error = vi.spyOn(console, 'error').mockImplementation(() => undefined)
    await expect(sendRecipe(CONFIG, 'sam', PRESCRIBER, PATIENT, prescribed({}), 'passphrase', 'https://fhc.example.org', memoryStore())).rejects.toBeInstanceOf(
      MissingStsTokenError,
    )
    expect(calls.created).toHaveLength(0)
    expect(error).not.toHaveBeenCalled()
  })
})

describe('the Recip-e expiration date (R-414)', () => {
  it('follows the "executable until" date, not the start date', async () => {
    await sendRecipe(CONFIG, 'sam', PRESCRIBER, PATIENT, prescribed({ beginMoment: 20261006, endMoment: 20270106 }), CREDENTIALS, 'https://fhc.example.org')
    expect(requestOf(calls.created[0]!)).toMatchObject({ deliveryDate: 20261006, expirationDate: 20270106 })
  })

  it('without "executable until", expires 90 days after the start', async () => {
    await sendRecipe(CONFIG, 'sam', PRESCRIBER, PATIENT, prescribed({ beginMoment: 20261006 }), CREDENTIALS, 'https://fhc.example.org')
    expect(requestOf(calls.created[0]!).expirationDate).toBe(20270104)
  })
})

// happy-dom has no IndexedDB: a minimal one, enough for an empty store.
function emptyIndexedDb() {
  const request = <T>(result: T) => {
    const r: { result: T; onsuccess?: () => void; onerror?: () => void; onupgradeneeded?: () => void } = { result }
    queueMicrotask(() => r.onsuccess?.())
    return r
  }
  const db = { objectStoreNames: { contains: () => true }, transaction: () => ({ objectStore: () => ({ get: () => request(undefined) }) }) }
  return { open: vi.fn(() => request(db)) }
}

describe('the IndexedDB TokenStore', () => {
  it('opens no database until used, and a miss resolves to undefined', async () => {
    const indexedDb = emptyIndexedDb()
    vi.stubGlobal('indexedDB', indexedDb)
    const store = createIndexedDbTokenStore()
    expect(indexedDb.open).not.toHaveBeenCalled()
    await expect(store.get('absent')).resolves.toBeUndefined()
    expect(indexedDb.open).toHaveBeenCalledOnce()
    vi.unstubAllGlobals()
  })
})
