import { expect, test } from '@playwright/test'
import { ChAppDriver } from './ch-app-driver'
import { compareOrHarvest, maskDates } from './ch-fixtures'

// ch counterpart of ../06-send-print.spec.ts. There is no recip-e equivalent for ch — nothing is
// sent anywhere — but the drafted prescriptions must be printable with the Swiss ordonnance
// layout: prescriber block (with GLN and RCC numbers), patient block, place and date, the
// prescribed items, and a signature area.

const FIXTURE = 'ch-print.json'

const MEDICATION_QUERY = 'Dafalgan'
const MEDICATION_CARD = 'DAFALGAN cpr pell 1 g'

test.describe('ch print prescriptions', () => {
  let app: ChAppDriver

  const createPrescription = async (posology: string) => {
    await app.openPrescriptionPanel(MEDICATION_QUERY, MEDICATION_CARD)
    await app.panelField('ch-posology').fill(posology)
    // Give the suggestion debounce a beat, then dismiss any suggestion dropdown so it
    // cannot interfere with the submit click (same dance as the Belgium specs).
    await app.page.waitForTimeout(300)
    await app.page.keyboard.press('Escape')
    await app.submitPrescriptionPanel()
    await expect(app.prescriptionPanel()).toHaveCount(0)
  }

  test.beforeEach(async ({ page }) => {
    app = new ChAppDriver(page)
    await app.goto()
    await createPrescription('1 comprimé par jour')
  })

  test('the print view shows the reference Swiss ordonnance layout', async () => {
    await app.openPrintView()

    // Structural Swiss-ordonnance requirements, independent of the fixture.
    await expect(app.printView().getByRole('heading', { name: 'Ordonnance médicale' })).toBeVisible()
    await expect(app.printView()).toContainText('GLN')
    await expect(app.printView()).toContainText('RCC')
    await expect(app.printView()).toContainText('Patient')
    await expect(app.printView()).toContainText('Signature')

    const documentText = ((await app.printView().innerText()) ?? '').replace(/\s+/g, ' ').trim()
    compareOrHarvest(FIXTURE, 'print-document', maskDates(documentText))
  })

  test('the print button triggers the browser print dialog', async ({ page }) => {
    await page.addInitScript(() => {
      ;(window as unknown as { __printCalls: number }).__printCalls = 0
      window.print = () => {
        ;(window as unknown as { __printCalls: number }).__printCalls++
      }
    })
    await app.goto()
    await createPrescription('1 comprimé par jour')
    await app.openPrintView()

    await app.printView().getByRole('button', { name: 'Print', exact: true }).click()
    await expect.poll(async () => page.evaluate(() => (window as unknown as { __printCalls: number }).__printCalls)).toBe(1)
  })

  test('closing the print view returns to the prescription list', async () => {
    await app.openPrintView()
    await app.closePrintView()
    await expect(app.printView()).toHaveCount(0)
    await expect(app.prescriptionRows()).toHaveCount(1)
  })
})
