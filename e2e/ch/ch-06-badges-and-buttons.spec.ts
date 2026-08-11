import { expect, test } from '@playwright/test'
import { ChAppDriver } from './ch-app-driver'

// Structural (fixture-free) coverage of the ch GUI alignment pass:
// - search-result cards carry the regulatory badges (narcotic warning, composition,
//   interactions) with hover/click tooltips that never trigger the card's add action;
// - the prescription panel header and the drafted-prescription rows render the medication as a
//   read-only MedicationCard, badges included;
// - every ch action button is the library's own Button (`.StyledButton`), i.e. the same design
//   as the Belgium tab's buttons.

// MORPHIN HCL Sintetica packages are flagged narcotic in medINDEX and morphine carries a long
// interaction list, so one query exercises every badge at once.
const NARCOTIC_QUERY = 'morphin'
const NARCOTIC_CARD = 'MORPHIN HCL Sintetica 10 mg/ml 10 amp 1 ml'

test.describe('ch regulatory badges and button design', () => {
  let app: ChAppDriver

  test.beforeEach(async ({ page }) => {
    app = new ChAppDriver(page)
    await app.goto()
  })

  const firstNarcoticCard = () => app.resultCards().filter({ hasText: NARCOTIC_CARD }).first()

  const searchNarcotic = async () => {
    await app.searchMedication(NARCOTIC_QUERY)
    await app.waitForSearchSettled()
    await expect(firstNarcoticCard()).toBeVisible()
  }

  test('a narcotic search result shows the narcotic, composition and interactions badges', async () => {
    await searchNarcotic()
    const card = firstNarcoticCard()

    await expect(card.locator('.regulatoryBadgeIcon--red')).toHaveCount(1)
    await expect(card.locator('.StyledComposition')).toHaveCount(1)
    await expect(card.locator('.StyledInteractions')).toHaveCount(1)
    // Tooltip renders its icon twice (trigger + popup header) — assert on the trigger one.
    await expect(card.locator('.icon .StyledTextToIcon')).toHaveText(/^\d+ IX$/)
  })

  test('hovering the composition badge reveals actives with quantities and the excipients', async () => {
    await searchNarcotic()
    const composition = firstNarcoticCard().locator('.StyledComposition')

    await composition.locator('..').locator('..').hover()
    await expect(composition).toBeVisible()
    await expect(composition.locator('h6')).toHaveText('Composition')
    await expect(composition).toContainText('Principes actifs')
    await expect(composition).toContainText(/Morphine chlorhydrate trihydrate\s*10 mg/)
    await expect(composition).toContainText('Autres composants')
  })

  test('the interactions tooltip lists localized interactions and caps the list with a +N line', async () => {
    await searchNarcotic()
    const card = firstNarcoticCard()

    await card.locator('.icon .StyledTextToIcon').hover()
    const interactions = card.locator('.StyledInteractions')
    await expect(interactions).toBeVisible()
    await expect(interactions.locator('h6')).toHaveText('Interactions médicamenteuses')
    await expect(interactions).toContainText(/Pertinence clinique :/)
    await expect(interactions.locator('p.more')).toHaveText(/^\+ \d+ autres interactions$/)
  })

  test('clicking a badge toggles its tooltip without opening the prescription panel', async () => {
    await searchNarcotic()
    const card = firstNarcoticCard()

    // Hover shows the tooltip, the first click toggles it off, the second back on — and none of
    // this may bubble into the card's add-prescription click handler.
    await card.locator('.icon .StyledTextToIcon').click()
    await expect(app.prescriptionPanel()).toHaveCount(0)
    await card.locator('.icon .StyledTextToIcon').click()
    await expect(card.locator('.StyledInteractions')).toBeVisible()
    await expect(app.prescriptionPanel()).toHaveCount(0)
  })

  test('the prescription panel header renders the medication as a read-only card with its badges', async () => {
    await app.openPrescriptionPanel(NARCOTIC_QUERY, NARCOTIC_CARD)
    const headerCard = app.prescriptionPanel().locator('.ch-panel__header .StyledMedicationCard')

    await expect(headerCard).toHaveCount(1)
    await expect(headerCard.locator('h3')).toHaveText(NARCOTIC_CARD)
    await expect(headerCard.locator('.regulatoryBadgeIcon--red')).toHaveCount(1)
    await expect(headerCard.locator('.StyledComposition')).toHaveCount(1)

    // Footer buttons are the library's Button component — same design as the Belgium modal.
    await expect(app.prescriptionPanel().getByRole('button', { name: 'Cancel', exact: true })).toHaveClass(/StyledButton/)
    await expect(app.prescriptionPanel().getByRole('button', { name: 'Add prescription' })).toHaveClass(/StyledButton/)
  })

  test('a drafted prescription row renders a read-only medication card and library buttons', async () => {
    await app.openPrescriptionPanel(NARCOTIC_QUERY, NARCOTIC_CARD)
    await app.panelField('ch-posology').fill('1 ampoule par jour')
    await app.page.waitForTimeout(300)
    await app.page.keyboard.press('Escape')
    await app.submitPrescriptionPanel()
    await expect(app.prescriptionRows()).toHaveCount(1)

    const row = app.prescriptionRows().first()
    await expect(row.locator('.StyledMedicationCard')).toHaveCount(1)
    await expect(row.locator('.regulatoryBadgeIcon--red')).toHaveCount(1)
    await expect(row.locator('.StyledComposition')).toHaveCount(1)
    await expect(row.locator('.StyledInteractions')).toHaveCount(1)
    await expect(app.modifyPrescriptionButton(row)).toHaveClass(/StyledButton/)
    await expect(app.deletePrescriptionButton(row)).toHaveClass(/StyledButton/)
    await expect(app.root.getByRole('button', { name: 'Print', exact: true })).toHaveClass(/StyledButton/)
  })
})
