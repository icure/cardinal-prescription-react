import { expect, test } from '@playwright/test'
import { ChAppDriver } from './ch-app-driver'
import { compareOrHarvest, maskDates } from './ch-fixtures'

// ch counterpart of ../04-prescription-modal.spec.ts. ch has no structured posology parser,
// suggestions or extra recip-e fields, so the mirrored scope is: the form opens as a right-side
// panel (same presentation as the Belgium PrescriptionModal), shows the reference creation state,
// and submit/cancel behave like the Belgium modal's.

const FIXTURE = 'ch-prescription-form.json'

const MEDICATION_QUERY = 'Dafalgan'
const MEDICATION_CARD = 'DAFALGAN cpr pell 1 g'

test.describe('ch prescription form', () => {
  let app: ChAppDriver

  test.beforeEach(async ({ page }) => {
    app = new ChAppDriver(page)
    await app.goto()
  })

  test('the prescription form opens as a full-height panel docked to the right edge', async ({ page }) => {
    await app.openPrescriptionPanel(MEDICATION_QUERY, MEDICATION_CARD)

    const viewport = page.viewportSize()
    expect(viewport).not.toBeNull()
    const box = await app.prescriptionPanel().boundingBox()
    expect(box).not.toBeNull()

    // Docked to the right edge, full height, and a side panel rather than a full-screen or
    // centered dialog: it leaves the left part of the page uncovered.
    expect(Math.abs(box!.x + box!.width - viewport!.width)).toBeLessThanOrEqual(1)
    expect(box!.height).toBeGreaterThanOrEqual(viewport!.height - 1)
    expect(Math.abs(box!.y)).toBeLessThanOrEqual(1)
    expect(box!.x).toBeGreaterThan(50)
  })

  test('opening the form for a medication shows the reference creation state', async () => {
    await app.openPrescriptionPanel(MEDICATION_QUERY, MEDICATION_CARD)
    compareOrHarvest(FIXTURE, 'create-form', maskDates(await app.extractPrescriptionPanelState()))
  })

  test('submitting the form adds the prescription to the list', async () => {
    await app.openPrescriptionPanel(MEDICATION_QUERY, MEDICATION_CARD)
    await app.panelField('ch-posology').fill('1 comprimé matin et soir')
    // Give the suggestion debounce a beat, then dismiss any suggestion dropdown so it
    // cannot interfere with the submit click (same dance as the Belgium specs).
    await app.page.waitForTimeout(300)
    await app.page.keyboard.press('Escape')
    await app.submitPrescriptionPanel()

    await expect(app.prescriptionPanel()).toHaveCount(0)
    await expect(app.prescriptionRows()).toHaveCount(1)
    await expect(app.prescriptionRows().first()).toContainText('1 comprimé matin et soir')
  })

  test('typing a partial posology offers the reference suggestions and completes it', async () => {
    await app.openPrescriptionPanel(MEDICATION_QUERY, MEDICATION_CARD)
    await app.panelField('ch-posology').pressSequentially('3 x par', { delay: 50 })
    await expect(app.posologySuggestions().first()).toBeVisible({ timeout: 15_000 })

    const suggestions = (await app.posologySuggestions().allInnerTexts()).map((s) => s.replace(/\s+/g, ' ').trim())
    compareOrHarvest(FIXTURE, 'posology-suggestions', suggestions)

    await app.posologySuggestions().first().click()
    compareOrHarvest(FIXTURE, 'posology-completed-value', await app.panelField('ch-posology').inputValue())
    // Accepting a suggestion closes the dropdown and does not immediately re-open it.
    await expect(app.posologySuggestions()).toHaveCount(0)
  })

  test('arrow keys navigate the posology suggestions and enter accepts the focused one', async () => {
    await app.openPrescriptionPanel(MEDICATION_QUERY, MEDICATION_CARD)
    await app.panelField('ch-posology').pressSequentially('3 x par', { delay: 50 })
    await expect(app.posologySuggestions().first()).toBeVisible({ timeout: 15_000 })

    // ArrowDown focuses the first suggestion, a second ArrowDown moves to the next one.
    await app.page.keyboard.press('ArrowDown')
    await expect(app.posologySuggestions().nth(0)).toHaveClass(/focused/)
    await app.page.keyboard.press('ArrowDown')
    await expect(app.posologySuggestions().nth(1)).toHaveClass(/focused/)
    await expect(app.posologySuggestions().nth(0)).not.toHaveClass(/focused/)

    // Enter accepts the focused suggestion: it completes the text, closes the dropdown, and
    // neither submits the form nor inserts a newline.
    await app.page.keyboard.press('Enter')
    compareOrHarvest(FIXTURE, 'posology-keyboard-completed-value', await app.panelField('ch-posology').inputValue())
    await expect(app.posologySuggestions()).toHaveCount(0)
    await expect(app.prescriptionPanel()).toBeVisible()
    await expect(app.prescriptionRows()).toHaveCount(0)
    expect(await app.panelField('ch-posology').inputValue()).not.toContain('\n')
  })

  test('escape dismisses the posology suggestions', async () => {
    await app.openPrescriptionPanel(MEDICATION_QUERY, MEDICATION_CARD)
    await app.panelField('ch-posology').pressSequentially('3 x par', { delay: 50 })
    await expect(app.posologySuggestions().first()).toBeVisible({ timeout: 15_000 })

    await app.page.keyboard.press('Escape')
    await expect(app.posologySuggestions()).toHaveCount(0)
    // Escape only dismissed the dropdown — the panel itself stays open.
    await expect(app.prescriptionPanel()).toBeVisible()
  })

  test('cancelling the form adds nothing to the prescription list', async () => {
    await app.openPrescriptionPanel(MEDICATION_QUERY, MEDICATION_CARD)
    await app.cancelPrescriptionPanel()
    await expect(app.prescriptionPanel()).toHaveCount(0)
    await expect(app.prescriptionRows()).toHaveCount(0)
  })

  test('the header close button dismisses the panel without adding anything', async () => {
    await app.openPrescriptionPanel(MEDICATION_QUERY, MEDICATION_CARD)
    await app.closePanelButton().click()
    await expect(app.prescriptionPanel()).toHaveCount(0)
    await expect(app.prescriptionRows()).toHaveCount(0)
  })
})
