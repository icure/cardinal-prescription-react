import { expect, test } from '@playwright/test'
import * as fs from 'fs'
import * as path from 'path'
import { AppDriver, CERTIFICATE_PASSPHRASE, CERTIFICATE_PATH } from './app-driver'

// Parity spec — this file is intentionally identical in cardinal-prescription-angular and
// cardinal-prescription-react (only ./app-driver differs). Keep both copies in sync.
//
// The reference fixture (e2e/fixtures/prescription-modal.json) is harvested from the ANGULAR app
// with UPDATE_MODAL_FIXTURE=1, then copied verbatim into the react repo.

const FIXTURE_PATH = path.resolve(__dirname, 'fixtures/prescription-modal.json')
const UPDATE_FIXTURE = !!process.env.UPDATE_MODAL_FIXTURE

const FIELD_IDS = [
  'medicationTitle',
  'dosage',
  'duration',
  'durationTimeUnit',
  'treatmentStartDate',
  'executableUntil',
  'prescriptionsNumber',
  'periodicityTimeUnit',
  'periodicityDaysNumber',
  'showExtraFields',
  'recipeInstructionForPatient',
  'instructionsForReimbursement',
  'prescriberVisibility',
  'pharmacistVisibility',
]

// A specific, stable package to prescribe throughout this spec.
const MEDICATION_QUERY = 'Dafalgan Forte'
const MEDICATION_CARD = 'Dafalgan Forte 1 g compr. pellic. 32'

// Free-text posologies taken from @icure/medication-sdk's French parser test suite.
const POSOLOGIES = [
  '1 par jour',
  '3 fois par jour',
  '2 inhalations 1 x par jour le matin',
  '1 comp par jour',
  '1 comp 2 x par jour',
  '3 gouttes 2 x par jour matin et soir',
  '2 inhalations 1 x par jour à 16:00',
  '2 inhalations 1 x par jour à 16:00, 1 inh. 1 x par jour avant le repas du soir',
  '2 inhalations 1 x par jour à 16:00 le lundi, le mardi et le mercredi, 1 inh. 1 x par jour avant le repas du soir le vendredi',
]

// Dates (treatment start = today, executable until = +N months) are time-dependent; masked
// so the fixture stays valid across days.
const maskDates = (value: unknown): unknown =>
  JSON.parse(
    JSON.stringify(value)
      .replace(/\d{4}-\d{2}-\d{2}/g, '«date»')
      .replace(/\d{2}\/\d{2}\/\d{4}/g, '«date»'),
  )

const readFixture = (): Record<string, unknown> => (fs.existsSync(FIXTURE_PATH) ? JSON.parse(fs.readFileSync(FIXTURE_PATH, 'utf8')) : {})

const saveFixtureEntry = (key: string, value: unknown) => {
  const fixture = readFixture()
  fixture[key] = value
  fs.mkdirSync(path.dirname(FIXTURE_PATH), { recursive: true })
  fs.writeFileSync(FIXTURE_PATH, JSON.stringify(fixture, null, 2) + '\n')
}

const compareOrHarvest = (key: string, actual: unknown) => {
  if (UPDATE_FIXTURE) {
    saveFixtureEntry(key, actual)
  } else {
    expect(actual).toEqual(readFixture()[key])
  }
}

test.describe('prescription modal', () => {
  let app: AppDriver

  test.beforeEach(async ({ page }) => {
    app = new AppDriver(page)
    await app.goto()
    await app.uploadCertificate(CERTIFICATE_PATH, CERTIFICATE_PASSPHRASE)
    await expect(app.medicationSearchInput()).toBeVisible({ timeout: 90_000 })
  })

  test('opening the modal for a medication shows the reference creation form', async () => {
    await app.openPrescriptionModal(MEDICATION_QUERY, MEDICATION_CARD)
    const state = maskDates(await app.extractPrescriptionModalState(FIELD_IDS))
    compareOrHarvest('create-form', state)
  })

  test('enabling the extra fields shows the reference extra inputs', async () => {
    await app.openPrescriptionModal(MEDICATION_QUERY, MEDICATION_CARD)
    await app.toggleExtraFields()
    await expect(app.modalField('recipeInstructionForPatient')).toBeVisible()
    const state = maskDates(await app.extractPrescriptionModalState(FIELD_IDS))
    compareOrHarvest('extra-fields-form', state)
  })

  test('free-text posologies produce the reference prescriptions', async () => {
    test.setTimeout(420_000)
    for (const posology of POSOLOGIES) {
      await app.openPrescriptionModal(MEDICATION_QUERY, MEDICATION_CARD)
      await app.modalField('dosage').fill(posology)
      // Give the suggestion debounce a beat, then dismiss any suggestion dropdown so it
      // cannot interfere with the submit click.
      await app.page.waitForTimeout(300)
      await app.page.keyboard.press('Escape')
      await app.submitPrescriptionModal()
      await expect(app.prescriptionModal()).toHaveCount(0)
    }
    await expect(app.prescriptionRows()).toHaveCount(POSOLOGIES.length)
    compareOrHarvest('posology-prescriptions', maskDates(await app.extractPrescriptionRows()))
  })

  test('typing a partial posology offers the reference suggestions and completes it', async () => {
    await app.openPrescriptionModal(MEDICATION_QUERY, MEDICATION_CARD)
    await app.modalField('dosage').pressSequentially('3 x par', { delay: 50 })
    await expect(app.posologySuggestions().first()).toBeVisible({ timeout: 15_000 })

    const suggestions = (await app.posologySuggestions().allInnerTexts()).map((s) => s.replace(/\s+/g, ' ').trim())
    compareOrHarvest('posology-suggestions', suggestions)

    await app.posologySuggestions().first().click()
    const value = await app.modalField('dosage').inputValue()
    compareOrHarvest('posology-completed-value', value)
  })

  test('a medication with standard dosages offers the reference dosage shortcuts', async () => {
    await app.openPrescriptionModal('Crestor', 'Crestor 10 mg compr. pellic. 98')
    const panelTexts = (await app.prescriptionModal().locator('.standard-dosages, .StyledStandardDosages').allInnerTexts()).map((s) => s.replace(/\s+/g, ' ').trim())
    compareOrHarvest('standard-dosages-panel', panelTexts)
  })

  test('cancelling the modal adds nothing to the prescription list', async () => {
    await app.openPrescriptionModal(MEDICATION_QUERY, MEDICATION_CARD)
    await app.cancelPrescriptionModal()
    await expect(app.prescriptionModal()).toHaveCount(0)
    await expect(app.prescriptionRows()).toHaveCount(0)
  })
})
