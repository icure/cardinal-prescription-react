import { expect, test } from '@playwright/test'
import * as fs from 'fs'
import * as path from 'path'
import { AppDriver, CERTIFICATE_PASSPHRASE, CERTIFICATE_PATH } from './app-driver'

// Parity spec — this file is intentionally identical in cardinal-prescription-angular and
// cardinal-prescription-react (only ./app-driver differs). Keep both copies in sync.
//
// The reference fixture (e2e/fixtures/medication-search.json) is harvested from the ANGULAR app
// by running this spec there with UPDATE_SEARCH_FIXTURE=1, then copied verbatim into the react
// repo. Both suites then assert the rendered results against the same fixture, which makes the
// two apps' search output directly comparable.

const FIXTURE_PATH = path.resolve(__dirname, 'fixtures/medication-search.json')
const UPDATE_FIXTURE = !!process.env.UPDATE_SEARCH_FIXTURE

// From the README's "Medications of interest for tests", plus a high-volume everyday query
// (Dafalgan) that exercises product grouping and infinite scroll.
const QUERIES = ['Polydexa 10 mg/ml', 'Crestor', 'Cisplatine Teva', 'Kaftrio', 'Increlex', 'Ultiva', 'Rapifen', 'Dafalgan']

type SearchFixture = {
  queries: Record<string, { groups: { product?: string; cards: string[] }[] }>
  afterScrollCardCount: Record<string, number>
}

// The SAM backend returns some arrays (an AMP's packages, a package's DMPPs) in unstable order,
// and the reference angular app inherits that instability: sub-cards inside a product group can
// swap places between runs, and when a package has several active reimbursement records the
// displayed category letter is whichever comes first. Canonicalize both before comparing:
// the reimbursement category token is masked and cards are compared as a sorted set per group.
// Everything else (titles, prices, delivery/prescription conditions, warnings, grouping) is
// compared strictly.
const REIMBURSEMENT_CATEGORIES = 'A|B|C|Cs|Cx|Fa|Fb'
const canonicalize = (groups: { product?: string; cards: string[] }[]) =>
  groups.map((g) => ({
    product: g.product,
    cards: g.cards
      .map((c) =>
        c
          .replace(new RegExp(`Remboursement : (?:${REIMBURSEMENT_CATEGORIES})(?= |$)`, 'g'), 'Remboursement : «cat»')
          .replace(new RegExp(`\\b(?:${REIMBURSEMENT_CATEGORIES})\\b(?= (?:M\\d+|TD|TF|H)\\b)`, 'g'), '«cat»'),
      )
      .sort(),
  }))

const readFixture = (): SearchFixture => (fs.existsSync(FIXTURE_PATH) ? JSON.parse(fs.readFileSync(FIXTURE_PATH, 'utf8')) : { queries: {}, afterScrollCardCount: {} })

const writeFixture = (fixture: SearchFixture) => {
  fs.mkdirSync(path.dirname(FIXTURE_PATH), { recursive: true })
  fs.writeFileSync(FIXTURE_PATH, JSON.stringify(fixture, null, 2) + '\n')
}

test.describe('medication search', () => {
  let app: AppDriver

  test.beforeEach(async ({ page }) => {
    app = new AppDriver(page)
    await app.goto()
    await app.uploadCertificate(CERTIFICATE_PATH, CERTIFICATE_PASSPHRASE)
    await expect(app.medicationSearchInput()).toBeVisible({ timeout: 90_000 })
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

      const groups = canonicalize(await app.extractResults())

      if (UPDATE_FIXTURE) {
        const fixture = readFixture()
        fixture.queries[query] = { groups }
        writeFixture(fixture)
      } else {
        expect(groups).toEqual(readFixture().queries[query]?.groups)
      }
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
    if (UPDATE_FIXTURE) {
      const fixture = readFixture()
      fixture.afterScrollCardCount['Dafalgan'] = afterScrollCount
      writeFixture(fixture)
    } else {
      expect(afterScrollCount).toEqual(readFixture().afterScrollCardCount['Dafalgan'])
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
