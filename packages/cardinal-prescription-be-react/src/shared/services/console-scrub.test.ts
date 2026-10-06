import { describe, expect, it, vi } from 'vitest'

// The posology parser fails on this text; the certificate store holds nothing.
vi.mock('@icure/medication-sdk', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@icure/medication-sdk')>()),
  makeParser: () => ({
    parsePosology: () => {
      throw new Error('synthetic parse failure')
    },
  }),
}))

import { createRegimenItemsFromDosage } from '../../internal/services/prescription/create-prescription'
import { deleteCertificate, loadAndDecryptCertificate } from './certificate'

const SSIN = '86010100123'
const POSOLOGY = '1 comprimé secret au coucher'

// happy-dom has no IndexedDB: one whose every request fails.
function failingIndexedDb() {
  const failing = () => {
    const r: { error: Error; onsuccess?: () => void; onerror?: () => void } = { error: new Error(`store failure for ${SSIN}`) }
    queueMicrotask(() => r.onerror?.())
    return r
  }
  return { open: () => failing() }
}

const printed = (spy: ReturnType<typeof vi.spyOn>) => JSON.stringify(spy.mock.calls.map((args) => args.map((a) => (a instanceof Error ? `${a.name}:${a.message}` : a))))

describe('no SSIN nor posology text in the console (MD-04, T-112)', () => {
  it('on the certificate paths', async () => {
    vi.stubGlobal('indexedDB', failingIndexedDb())
    const error = vi.spyOn(console, 'error').mockImplementation(() => undefined)
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined)
    expect(await loadAndDecryptCertificate(SSIN, 'passphrase')).toBeUndefined()
    expect(await deleteCertificate(SSIN)).toBe(false)
    expect(error).toHaveBeenCalled()
    expect(printed(error) + printed(log)).not.toContain(SSIN)
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('on a posology parse failure', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => undefined)
    expect(createRegimenItemsFromDosage(POSOLOGY)).toBeUndefined()
    expect(error).toHaveBeenCalled()
    expect(printed(error)).not.toContain('secret')
    vi.restoreAllMocks()
  })
})
