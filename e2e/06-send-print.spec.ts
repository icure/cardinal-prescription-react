import { expect, test } from '@playwright/test'
import * as fs from 'fs'
import * as path from 'path'
import { AppDriver, CERTIFICATE_PASSPHRASE, CERTIFICATE_PATH } from './app-driver'

// Parity spec — this file is intentionally identical in cardinal-prescription-angular and
// cardinal-prescription-react (only ./app-driver differs). Keep both copies in sync.
//
// These tests send real prescriptions to the Recip-e ACCEPTANCE environment (via the FHC acc
// cloud) using the test certificate — that is exactly what the parity plan prescribes.
// The reference fixture (e2e/fixtures/send-print.json) is harvested from the ANGULAR app with
// UPDATE_SEND_FIXTURE=1, then copied verbatim into the react repo.

const FIXTURE_PATH = path.resolve(__dirname, 'fixtures/send-print.json')
const UPDATE_FIXTURE = !!process.env.UPDATE_SEND_FIXTURE

const MEDICATION_QUERY = 'Dafalgan Forte'
const MEDICATION_CARD = 'Dafalgan Forte 1 g compr. pellic. 32'
const SEND_TIMEOUT = { timeout: 180_000 }

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

// Masks run-specific values: the Recip-e RIDs passed in, then dates in various formats.
const mask = (text: string, rids: string[]): string => {
  let out = text
  for (const rid of rids.filter(Boolean)) {
    out = out.split(rid).join('«rid»')
  }
  return out
    .replace(/\d{4}-\d{2}-\d{2}/g, '«date»')
    .replace(/\d{2}[/.]\d{2}[/.]\d{4}/g, '«date»')
    .replace(/\s+/g, ' ')
    .trim()
}

test.describe('send and print prescriptions', () => {
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
  })

  test('sending a prescription moves it to the sent section with a RID', async () => {
    test.setTimeout(300_000)
    await app.root.getByRole('button', { name: 'Envoyer', exact: true }).click()

    await expect(app.root.getByText('Ordonnances envoyées:')).toBeVisible(SEND_TIMEOUT)
    await expect(app.prescriptionRows()).toHaveCount(1)

    const row = app.prescriptionRows().first()
    const rid = ((await row.locator('.rid').innerText()) ?? '').trim()
    expect(rid).toMatch(/^BE[A-Z0-9]+$/i)

    // Sent prescriptions can no longer be modified or deleted, only printed.
    await expect(app.modifyPrescriptionButton(row)).toHaveCount(0)
    await expect(app.deletePrescriptionButton(row)).toHaveCount(0)
    await expect(app.root.getByRole('button', { name: 'Imprimer', exact: true })).toBeVisible()
    await expect(app.root.getByRole('button', { name: 'Envoyer', exact: true })).toHaveCount(0)
    await expect(app.root.getByText('Ordonnances en attente:')).toHaveCount(0)

    const rowText = (await row.innerText()) ?? ''
    compareOrHarvest('sent-row', mask(rowText, [rid]))
  })

  test('send-and-print sends the prescription and opens the reference print document', async () => {
    test.setTimeout(300_000)
    await app.root.getByRole('button', { name: /Envoyer et imprimer/ }).click()

    await expect(app.page.getByRole('heading', { name: 'Imprimer la prescription' })).toBeVisible(SEND_TIMEOUT)

    // By the time the print modal shows, the prescription has been sent and has its RID.
    const rid = ((await app.prescriptionRows().first().locator('.rid').innerText()) ?? '').trim()
    expect(rid).toMatch(/^BE[A-Z0-9]+$/i)

    const documentText = (await app.page.locator('#print-container').innerText()) ?? ''
    compareOrHarvest('print-document', mask(documentText, [rid]))

    await app.page.getByRole('button', { name: 'Fermer', exact: true }).click()
    await expect(app.page.getByRole('heading', { name: 'Imprimer la prescription' })).toHaveCount(0)
  })
})
