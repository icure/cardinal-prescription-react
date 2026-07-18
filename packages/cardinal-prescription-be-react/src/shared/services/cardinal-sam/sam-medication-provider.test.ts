import { describe, vi } from 'vitest'
import type { Amp, PaginatedListIterator, SamV2Api } from '@icure/cardinal-be-sam-sdk'
import { SamMedicationProvider } from './sam-medication-provider'
import { runMedicationProviderContractTests } from '../medication-provider.contract-test'
import { MedicationProviderUnavailableError } from '../../types'
import { AmpMockFactory, AmppMockFactory, PaginatedListIteratorMockFactory } from '../../../testing'
import { cardinalLanguage } from '../i18n'

const DELIVERY_ENVIRONMENT = 'A'

/** Builds `count` deliverable AMPs (env `DELIVERY_ENVIRONMENT`, authorized, commercialized —
 * same defaults `medication-loader.test.ts` relies on), pre-sorted ascending by title: required
 * because `SamMedicationProvider.findByLabel` merges lanes via `mergeLazySortedNamedItems`, which
 * asserts each lane's fetched page is already sorted (real SAM data is; a fabricated fixture has
 * to be built that way too). */
function makeSortedDeliverableAmps(count: number, label: string): Amp[] {
  return Array.from({ length: count }, (_, i) =>
    AmpMockFactory.create({
      id: `amp-${label}-${i}`,
      prescriptionName: { fr: `${label} ${String(i).padStart(3, '0')}` } as any,
      ampps: [AmppMockFactory.create({ ctiExtended: `ampp-${label}-${i}` })],
    }),
  )
}

/** Wraps a `PaginatedListIterator`'s `.next` in a spy so tests can observe how many times the
 * mock backend was actually asked for another page, without changing its behavior. */
function spyOnNext<T>(iterator: PaginatedListIterator<T>): { iterator: PaginatedListIterator<T>; nextCallCount: () => number } {
  const nextSpy = vi.fn(iterator.next)
  return {
    iterator: { ...iterator, next: nextSpy } as PaginatedListIterator<T>,
    nextCallCount: () => nextSpy.mock.calls.length,
  }
}

/** Minimal fake `SamV2Api` covering only the methods `SamMedicationProvider.findByLabel` calls
 * (see `cardinal-sam/index.ts`'s `findMedicationsByLabel`) — a plain object with `vi.fn()`-mocked
 * methods, matching how `medication-loader.test.ts` already mocks SAM's paginated iterators. */
function makeFakeSdk(overrides: Partial<Pick<SamV2Api, 'findPaginatedAmpsByLabel' | 'findPaginatedVmpGroupsByLabel' | 'findPaginatedNmpsByLabel'>> = {}): SamV2Api {
  return {
    findPaginatedAmpsByLabel: vi.fn().mockResolvedValue(PaginatedListIteratorMockFactory.createEmpty<Amp>()),
    findPaginatedVmpGroupsByLabel: vi.fn().mockResolvedValue(PaginatedListIteratorMockFactory.createEmpty()),
    findPaginatedNmpsByLabel: vi.fn().mockResolvedValue(PaginatedListIteratorMockFactory.createEmpty()),
    ...overrides,
  } as unknown as SamV2Api
}

describe('SamMedicationProvider', () => {
  cardinalLanguage.setLanguage('fr')

  runMedicationProviderContractTests('SamMedicationProvider (be)', {
    regulatoryCountryKey: 'be',

    withSuccessfulSearch(label, itemCount) {
      const { iterator, nextCallCount } = spyOnNext(PaginatedListIteratorMockFactory.create(makeSortedDeliverableAmps(itemCount, label)))
      const sdk = makeFakeSdk({ findPaginatedAmpsByLabel: vi.fn().mockResolvedValue(iterator) })
      return {
        provider: new SamMedicationProvider(sdk, DELIVERY_ENVIRONMENT),
        backendCallCount: nextCallCount,
      }
    },

    // SAM's own search path doesn't distinguish "not found" from any other failure — every
    // rejection from any of the three lane calls is caught generically and rethrown as
    // `MedicationProviderUnavailableError` (see `SamMedicationProvider.searchByLabel`'s source).
    // Simulating a 404-shaped native error here on purpose to document that this provider does
    // *not* special-case it, rather than assuming a not-found distinction the code doesn't make.
    withNotFoundLikeFailure(label) {
      const sdk = makeFakeSdk({
        findPaginatedAmpsByLabel: vi.fn().mockRejectedValue(Object.assign(new Error(`not found: ${label}`), { status: 404 })),
      })
      return { provider: new SamMedicationProvider(sdk, DELIVERY_ENVIRONMENT), expectedErrorType: MedicationProviderUnavailableError }
    },

    withUnavailableLikeFailure(label) {
      const sdk = makeFakeSdk({
        findPaginatedAmpsByLabel: vi.fn().mockRejectedValue(Object.assign(new Error(`server error: ${label}`), { status: 500 })),
      })
      return { provider: new SamMedicationProvider(sdk, DELIVERY_ENVIRONMENT), expectedErrorType: MedicationProviderUnavailableError }
    },

    // Neither `SamMedicationProvider` nor `findMedicationsByLabel` do any client-side length
    // check of their own — that guard lives in `MedicationSearch`'s UI (`q.length < 3`), not in
    // this provider. Documented asymmetry vs. `MedIndexMedicationProvider`, not invented here.
    shortLabel: { kind: 'no-client-side-check' },
  })
})
