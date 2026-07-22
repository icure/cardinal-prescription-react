import { expect, test } from '@playwright/test'
import { ChAppDriver } from './ch-app-driver'
import { compareOrHarvest, readFixture, UPDATE_CH_FIXTURE } from './ch-fixtures'

// ch counterpart of ../03-medication-search.spec.ts, against the medINDEX-backed search.
// The reference fixture (fixtures/ch-medication-search.json) is self-harvested with
// UPDATE_CH_FIXTURE=1. medINDEX has no reimbursement records and returns results in stable
// order, so unlike the Belgium spec no canonicalization/masking is needed — compare strictly.

const FIXTURE = 'ch-medication-search.json'

// Everyday Swiss medications; Dafalgan has 28 medINDEX products, comfortably beyond the search's
// 10-item page size, so it also exercises infinite scroll.
const QUERIES = ['Dafalgan', 'Algifor', 'Ponstan', 'Panadol', 'Irfen']

test.describe('ch medication search', () => {
  let app: ChAppDriver

  test.beforeEach(async ({ page }) => {
    app = new ChAppDriver(page)
    await app.goto()
  })

  test('a query shorter than 3 characters shows a validation error and no results', async () => {
    await app.searchMedication('da')
    await expect(app.searchError()).toHaveText(/Entrez au moins 3 lettres du nom du médicament/)
    await expect(app.resultCards()).toHaveCount(0)
  })

  test('a query matching nothing shows the no-match placeholder', async () => {
    await app.searchMedication('zzqqxxzzqq')
    await app.waitForSearchSettled()
    await expect(app.noMatchesPlaceholder()).toHaveText(/Aucun médicament ne correspond à vos critères de recherche\./)
    await expect(app.resultCards()).toHaveCount(0)
  })

  for (const query of QUERIES) {
    test(`first page of results for "${query}" matches the reference`, async () => {
      await app.searchMedication(query)
      await app.waitForSearchSettled()
      await expect(app.resultCards().first()).toBeVisible()

      compareOrHarvest(FIXTURE, `query:${query}`, await app.extractResults())
    })
  }

  test('scrolling the dropdown loads a further page of results (infinite scroll)', async () => {
    await app.searchMedication('Dafalgan')
    await app.waitForSearchSettled()
    await expect(app.resultCards().first()).toBeVisible()
    const initialCount = await app.resultCards().count()

    await app.scrollSearchDropdownToBottom()
    await expect.poll(async () => app.resultCards().count(), { timeout: 60_000 }).toBeGreaterThan(initialCount)
    await app.waitForSearchSettled()

    const afterScrollCount = await app.resultCards().count()
    if (UPDATE_CH_FIXTURE) {
      compareOrHarvest(FIXTURE, 'afterScrollCardCount:Dafalgan', afterScrollCount)
    } else {
      expect(afterScrollCount).toEqual(readFixture(FIXTURE)['afterScrollCardCount:Dafalgan'])
    }
  })

  test('clearing the query closes the dropdown', async () => {
    await app.searchMedication('Dafalgan')
    await app.waitForSearchSettled()
    await expect(app.resultCards().first()).toBeVisible()

    await app.searchMedication('')
    await expect(app.resultCards()).toHaveCount(0)
    await expect(app.noMatchesPlaceholder()).toHaveCount(0)
  })
})
