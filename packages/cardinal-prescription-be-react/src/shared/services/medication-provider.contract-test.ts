import { describe, expect, it } from 'vitest'
import { Med, MedicationProvider, MedicationProviderError, MedicationSearchValidationError, MedicationType } from '../types'

/**
 * A fresh `MedicationProvider` instance plus a way to observe how many times its *underlying
 * backend* was actually asked for another chunk of results (a spy on the mock SDK's paginated
 * `.next()`, or on a mock `fetch`, depending on the provider) — used to assert `findByLabel` is
 * genuinely lazy rather than eagerly draining the whole search up front.
 */
export interface MedicationProviderScenario {
  provider: MedicationProvider
  backendCallCount(): number
}

/** A provider whose backend has been rigged to fail, plus the shared error subclass it's
 * expected to throw for that failure shape (never the backend's own native error class). */
export interface MedicationProviderFailureScenario {
  provider: MedicationProvider
  expectedErrorType: new (...args: any[]) => Error
}

/**
 * What actually happens (verified against each provider's source, not assumed) when
 * `findByLabel` is called with a label under the shared minimum search length. The three
 * variants exist because the two providers genuinely do not behave the same here:
 *
 * - `'translates'` — the provider validates client-side and throws `MedicationSearchValidationError`,
 *   matching the shared contract.
 * - `'no-client-side-check'` — the provider does no length validation of its own (that guard
 *   lives elsewhere, e.g. `MedicationSearch`'s UI-level `q.length < 3`); asserting
 *   `MedicationSearchValidationError` here would be inventing a behavior the source doesn't have.
 * - `'known-bug-leaks-native-error'` — the provider's backend validates client-side and the
 *   provider *has* translation logic for that error type, but a wiring gap means this particular
 *   code path bypasses it, so the backend's raw native error class escapes untranslated. This
 *   documents that reality (so the regression is visible) without silently inventing the
 *   "correct" behavior or fixing the source — see this task's report for the full writeup.
 */
export type ShortLabelBehavior =
  | { kind: 'translates'; label: string; provider: MedicationProvider }
  | { kind: 'no-client-side-check' }
  | {
      kind: 'known-bug-leaks-native-error'
      label: string
      provider: MedicationProvider
      nativeErrorType: new (...args: any[]) => Error
      note: string
    }

export interface MedicationProviderContractConfig {
  /** Which `regulatory.<country>` key a successful search result is expected to populate. */
  regulatoryCountryKey: 'be' | 'ch'
  /** Builds a provider whose backend is seeded with `itemCount` matching results for `label`. */
  withSuccessfulSearch(label: string, itemCount: number): MedicationProviderScenario
  /** Builds a provider whose backend fails the way it would if the searched-for thing doesn't exist. */
  withNotFoundLikeFailure(label: string): MedicationProviderFailureScenario
  /** Builds a provider whose backend fails the way it would if the backend were down/erroring. */
  withUnavailableLikeFailure(label: string): MedicationProviderFailureScenario
  shortLabel: ShortLabelBehavior
}

async function consumeAll<T>(iterable: AsyncIterable<T>): Promise<T[]> {
  const items: T[] = []
  for await (const item of iterable) items.push(item)
  return items
}

async function firstRejection(iterable: AsyncIterable<unknown>): Promise<unknown> {
  return consumeAll(iterable).catch((error) => error)
}

function flattenMedications(items: Med[]): MedicationType[] {
  return items.flatMap((item) => ('medications' in item ? item.medications : [item]))
}

/**
 * Runs the shared `MedicationProvider` contract suite against one concrete provider. Invoke this
 * once per provider (`SamMedicationProvider`, `MedIndexMedicationProvider`, and any future
 * country provider) with a config built from that provider's own mock backend — the point is to
 * assert every provider behaves identically at the `MedicationProvider` interface level, per
 * docs/plan.md's "MedicationProvider error contract" decision.
 */
export function runMedicationProviderContractTests(name: string, config: MedicationProviderContractConfig): void {
  describe(`MedicationProvider contract: ${name}`, () => {
    it('findByLabel returns a genuine AsyncIterable, consumable with for await', async () => {
      const { provider } = config.withSuccessfulSearch('aspirin', 3)
      const stream = provider.findByLabel('aspirin')
      expect(typeof (stream as AsyncIterable<Med>)[Symbol.asyncIterator]).toBe('function')

      const items = await consumeAll(stream)
      expect(items.length).toBeGreaterThan(0)
    })

    it('findByLabel is lazy: nothing is fetched before the consumer starts pulling, and more is fetched only as more is consumed', async () => {
      // More than one page's worth of results, so full consumption necessarily needs more than
      // one round-trip to the backend.
      const { provider, backendCallCount } = config.withSuccessfulSearch('aspirin', 25)

      const stream = provider.findByLabel('aspirin')
      expect(backendCallCount()).toBe(0)

      const iterator = stream[Symbol.asyncIterator]()
      const first = await iterator.next()
      expect(first.done).toBe(false)
      const afterFirstItem = backendCallCount()
      expect(afterFirstItem).toBeGreaterThan(0)

      let result = first
      while (!result.done) {
        result = await iterator.next()
      }
      expect(backendCallCount()).toBeGreaterThan(afterFirstItem)
    })

    it(`yields Med items with a populated regulatory.${config.regulatoryCountryKey} key for a successful search`, async () => {
      const { provider } = config.withSuccessfulSearch('aspirin', 3)
      const items = await consumeAll(provider.findByLabel('aspirin'))
      expect(items.length).toBeGreaterThan(0)

      const medications = flattenMedications(items)
      expect(medications.length).toBeGreaterThan(0)
      medications.forEach((medication) => {
        expect(medication.title).toBeTruthy()
        expect(medication.regulatory?.[config.regulatoryCountryKey]).toBeTruthy()
      })
    })

    it('translates a "not found"-shaped native backend failure into a shared MedicationProvider error type', async () => {
      const { provider, expectedErrorType } = config.withNotFoundLikeFailure('aspirin')
      const error = await firstRejection(provider.findByLabel('aspirin'))
      expect(error).toBeInstanceOf(MedicationProviderError)
      expect(error).toBeInstanceOf(expectedErrorType)
    })

    it('translates a "server/unavailable"-shaped native backend failure into a shared MedicationProvider error type', async () => {
      const { provider, expectedErrorType } = config.withUnavailableLikeFailure('aspirin')
      const error = await firstRejection(provider.findByLabel('aspirin'))
      expect(error).toBeInstanceOf(MedicationProviderError)
      expect(error).toBeInstanceOf(expectedErrorType)
    })

    describe('short-label ("under the minimum search length") validation', () => {
      const behavior = config.shortLabel

      if (behavior.kind === 'no-client-side-check') {
        it.skip("has no client-side short-label validation of its own — that guard lives elsewhere (documented asymmetry, see this task's report)", () => {})
        return
      }

      if (behavior.kind === 'translates') {
        it(`translates a short label ("${behavior.label}") into MedicationSearchValidationError`, async () => {
          const error = await firstRejection(behavior.provider.findByLabel(behavior.label))
          expect(error).toBeInstanceOf(MedicationSearchValidationError)
        })
        return
      }

      it(`[KNOWN BUG, reported not fixed] ${behavior.note}`, async () => {
        const error = await firstRejection(behavior.provider.findByLabel(behavior.label))
        // Documents today's actual (incorrect) behavior on purpose — see `note` above. This is
        // a regression trip-wire, not an endorsement: if this assertion ever starts failing
        // because the underlying bug got fixed, update it to `MedicationSearchValidationError`.
        expect(error).toBeInstanceOf(behavior.nativeErrorType)
      })
    })
  })
}
