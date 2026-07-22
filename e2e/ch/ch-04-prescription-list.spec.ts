import { expect, test } from '@playwright/test'
import { ChAppDriver } from './ch-app-driver'
import { compareOrHarvest, maskDates } from './ch-fixtures'

// ch counterpart of ../05-prescription-list.spec.ts: drafted prescriptions are listed, can be
// modified through the prefilled right-side panel, and can be deleted individually.

const FIXTURE = 'ch-prescription-list.json'

const MEDICATION_QUERY = 'Dafalgan'
const MEDICATION_CARD = 'DAFALGAN cpr pell 1 g'

test.describe('ch prescription list', () => {
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
    await createPrescription('2 comprimés matin et soir')
    await expect(app.prescriptionRows()).toHaveCount(2)
  })

  test('drafted prescriptions are listed under the Prescriptions section', async () => {
    await expect(app.root.getByRole('heading', { name: 'Prescriptions' })).toBeVisible()
    compareOrHarvest(FIXTURE, 'initial-rows', maskDates(await app.extractPrescriptionRows()))
    // No transmission equivalent for ch: printing is the only bulk action.
    await expect(app.root.getByRole('button', { name: 'Print', exact: true })).toBeVisible()
    await expect(app.root.getByRole('button', { name: /Envoyer/ })).toHaveCount(0)
  })

  test('modifying a prescription opens the prefilled panel and applies the change', async () => {
    await app.modifyPrescriptionButton(app.prescriptionRows().first()).click()
    await expect(app.prescriptionPanel()).toBeVisible()

    compareOrHarvest(FIXTURE, 'modify-form', maskDates(await app.extractPrescriptionPanelState()))

    await app.panelField('ch-posology').fill('3 comprimés par jour pendant le repas')
    await app.page.waitForTimeout(300)
    await app.page.keyboard.press('Escape')
    await app.submitPrescriptionPanel()
    await expect(app.prescriptionPanel()).toHaveCount(0)

    await expect(app.prescriptionRows()).toHaveCount(2)
    compareOrHarvest(FIXTURE, 'rows-after-modify', maskDates(await app.extractPrescriptionRows()))
  })

  test('deleting a prescription removes only that prescription', async () => {
    await app.deletePrescriptionButton(app.prescriptionRows().first()).click()
    await expect(app.prescriptionRows()).toHaveCount(1)
    compareOrHarvest(FIXTURE, 'rows-after-delete', maskDates(await app.extractPrescriptionRows()))
  })
})
