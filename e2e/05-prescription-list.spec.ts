import { expect, test } from '@playwright/test'
import * as fs from 'fs'
import * as path from 'path'
import { AppDriver, CERTIFICATE_PASSPHRASE, CERTIFICATE_PATH } from './app-driver'

// Parity spec — this file is intentionally identical in cardinal-prescription-angular and
// cardinal-prescription-react (only ./app-driver differs). Keep both copies in sync.
//
// The reference fixture (e2e/fixtures/prescription-list.json) is harvested from the ANGULAR app
// with UPDATE_LIST_FIXTURE=1, then copied verbatim into the react repo.

const FIXTURE_PATH = path.resolve(__dirname, 'fixtures/prescription-list.json')
const UPDATE_FIXTURE = !!process.env.UPDATE_LIST_FIXTURE

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
]

const MEDICATION_QUERY = 'Dafalgan Forte'
const MEDICATION_CARD = 'Dafalgan Forte 1 g compr. pellic. 32'

const maskDates = (value: unknown): unknown =>
  JSON.parse(
    JSON.stringify(value)
      .replace(/\d{4}-\d{2}-\d{2}/g, '«date»')
      .replace(/\d{2}\/\d{2}\/\d{4}/g, '«date»'),
  )

const readFixture = (): Record<string, unknown> => (fs.existsSync(FIXTURE_PATH) ? JSON.parse(fs.readFileSync(FIXTURE_PATH, 'utf8')) : {})

const compareOrHarvest = (key: string, actual: unknown) => {
  if (UPDATE_FIXTURE) {
    const fixture = readFixture()
    fixture[key] = actual
    fs.mkdirSync(path.dirname(FIXTURE_PATH), { recursive: true })
    fs.writeFileSync(FIXTURE_PATH, JSON.stringify(fixture, null, 2) + '\n')
  } else {
    expect(actual).toEqual(readFixture()[key])
  }
}

test.describe('prescription list', () => {
  let app: AppDriver

  const createPrescription = async (posology: string) => {
    await app.openPrescriptionModal(MEDICATION_QUERY, MEDICATION_CARD)
    await app.modalField('dosage').fill(posology)
    await app.page.waitForTimeout(300)
    await app.page.keyboard.press('Escape')
    await app.submitPrescriptionModal()
    await expect(app.prescriptionModal()).toHaveCount(0)
  }

  test.beforeEach(async ({ page }) => {
    app = new AppDriver(page)
    await app.goto()
    await app.uploadCertificate(CERTIFICATE_PATH, CERTIFICATE_PASSPHRASE)
    await expect(app.medicationSearchInput()).toBeVisible({ timeout: 90_000 })
    await createPrescription('1 comp par jour')
    await createPrescription('2 comp matin et soir')
    await expect(app.prescriptionRows()).toHaveCount(2)
  })

  test('pending prescriptions are listed under the reference section title', async ({ page }) => {
    await expect(app.root.getByText('Ordonnances en attente:')).toBeVisible()
    await expect(app.root.getByText('Ordonnances envoyées:')).toHaveCount(0)
    compareOrHarvest('initial-rows', await app.extractPrescriptionRows())
    // Both send actions are offered for pending prescriptions.
    await expect(app.root.getByRole('button', { name: 'Envoyer', exact: true })).toBeVisible()
    await expect(app.root.getByRole('button', { name: /Envoyer et imprimer/ })).toBeVisible()
  })

  test('modifying a prescription opens the prefilled reference modal and applies the change', async () => {
    await app.modifyPrescriptionButton(app.prescriptionRows().first()).click()
    await expect(app.prescriptionModal()).toBeVisible()

    compareOrHarvest('modify-form', maskDates(await app.extractPrescriptionModalState(FIELD_IDS)))

    await app.modalField('dosage').fill('3 comp par jour pendant le repas')
    await app.page.waitForTimeout(300)
    await app.page.keyboard.press('Escape')
    await app.submitPrescriptionModal()
    await expect(app.prescriptionModal()).toHaveCount(0)

    await expect(app.prescriptionRows()).toHaveCount(2)
    compareOrHarvest('rows-after-modify', await app.extractPrescriptionRows())
  })

  test('deleting a prescription removes only that prescription', async () => {
    await app.deletePrescriptionButton(app.prescriptionRows().first()).click()
    await expect(app.prescriptionRows()).toHaveCount(1)
    compareOrHarvest('rows-after-delete', await app.extractPrescriptionRows())
  })
})
