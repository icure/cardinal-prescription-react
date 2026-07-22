import { expect, Locator, Page } from '@playwright/test'

// Driver for the demo app's Switzerland (medINDEX) tab. Unlike ../app-driver.ts this is NOT part
// of the angular/react parity set (the angular reference app has no Switzerland tab): the ch specs
// under e2e/ch/ mirror the shape of the Belgium parity specs but are react-only, and their
// fixtures are self-harvested from this app with UPDATE_CH_FIXTURE=1.
//
// ch has no certificate/STS gating (medINDEX is public reference data) and no recip-e equivalent:
// prescriptions are drafted locally and printed with the Swiss ordonnance layout.
export class ChAppDriver {
  readonly root: Locator

  constructor(readonly page: Page) {
    this.root = this.page.locator('.tab-content--ch')
  }

  // Loads the app and selects the Switzerland tab. No auth/certificate step: the medication
  // search must be available immediately.
  async goto(): Promise<void> {
    await this.page.goto('/')
    await this.page.getByRole('button', { name: 'Switzerland' }).click()
    await expect(this.medicationSearchInput()).toBeVisible({ timeout: 60_000 })
  }

  medicationSearchInput(): Locator {
    return this.root.getByPlaceholder('Trouver un médicament')
  }

  // --- medication search (same MedicationSearch component as the Belgium tab, so the same
  // structural selectors, rooted in the Switzerland tab container) ---

  private readonly resultSelectors = {
    group: '.tab-content--ch .medOrProdWrap',
    product: '.StyledMedicationProductTitle',
    card: '.cardWrap',
  }

  searchDropdown(): Locator {
    return this.root.locator('.medicationSearchDropdown')
  }

  searchSpinner(): Locator {
    return this.root.locator('.spinner')
  }

  noMatchesPlaceholder(): Locator {
    return this.root.locator('.placeholder')
  }

  searchError(): Locator {
    return this.root.locator('p.error')
  }

  resultCards(): Locator {
    return this.root.locator(this.resultSelectors.card)
  }

  async searchMedication(query: string): Promise<void> {
    await this.medicationSearchInput().fill(query)
  }

  async waitForSearchSettled(): Promise<void> {
    await expect(this.searchDropdown().or(this.noMatchesPlaceholder()).first()).toBeVisible({ timeout: 60_000 })
    await expect(this.searchSpinner()).toHaveCount(0, { timeout: 60_000 })
  }

  // Extracts the rendered results as comparable data: one entry per result group, with the
  // product title (when the group is a product) and the normalized visible text of each card.
  async extractResults(): Promise<{ product?: string; cards: string[] }[]> {
    return this.page.evaluate(({ group, product, card }) => {
      const norm = (s: string) => s.replace(/\s+/g, ' ').trim()
      return Array.from(document.querySelectorAll(group)).map((g) => {
        const productEl = g.querySelector(product) as HTMLElement | null
        return {
          product: productEl ? norm(productEl.innerText) : undefined,
          cards: Array.from(g.querySelectorAll(card)).map((c) => norm((c as HTMLElement).innerText)),
        }
      })
    }, this.resultSelectors)
  }

  async scrollSearchDropdownToBottom(): Promise<void> {
    await this.searchDropdown().evaluate((el) => el.scrollTo(0, el.scrollHeight))
  }

  // --- prescription form (right-side panel, mirroring the Belgium PrescriptionModal's
  // presentation: full-height panel docked to the right edge over a dimmed overlay) ---

  prescriptionPanel(): Locator {
    return this.page.locator('#chPrescriptionForm')
  }

  async openPrescriptionPanel(query: string, cardText: string): Promise<void> {
    await this.searchMedication(query)
    await this.waitForSearchSettled()
    await this.resultCards().filter({ hasText: cardText }).first().locator('h3').first().click()
    await expect(this.prescriptionPanel()).toBeVisible()
  }

  panelField(id: string): Locator {
    return this.prescriptionPanel().locator(`#${id}`)
  }

  async submitPrescriptionPanel(): Promise<void> {
    await this.prescriptionPanel()
      .getByRole('button', { name: /Add prescription|Save changes/ })
      .click()
  }

  async cancelPrescriptionPanel(): Promise<void> {
    await this.prescriptionPanel().getByRole('button', { name: 'Cancel', exact: true }).click()
  }

  closePanelButton(): Locator {
    return this.prescriptionPanel().getByRole('button', { name: 'Close panel' })
  }

  posologySuggestions(): Locator {
    return this.prescriptionPanel().locator('.suggestionsDropdown li')
  }

  // Extracts the panel's full visible state (title, field values, the duration-unit select with
  // its option labels) as comparable data — the ch counterpart of the Belgium driver's
  // extractPrescriptionModalState.
  async extractPrescriptionPanelState(): Promise<Record<string, unknown>> {
    return this.page.evaluate(() => {
      const norm = (s: string) => s.replace(/\s+/g, ' ').trim()
      const form = document.querySelector('#chPrescriptionForm') as HTMLElement | null
      if (!form) return { error: 'no form' }
      const fields: Record<string, unknown> = {}
      for (const id of ['ch-posology', 'ch-quantity', 'ch-duration-unit', 'ch-start-date']) {
        const el = form.querySelector(`#${CSS.escape(id)}`) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null
        if (!el) {
          fields[id] = null
        } else if (el instanceof HTMLSelectElement) {
          fields[id] = {
            tag: 'select',
            selected: norm(el.selectedOptions[0]?.textContent ?? ''),
            options: Array.from(el.options).map((o) => norm(o.textContent ?? '')),
          }
        } else {
          fields[id] = { tag: el.tagName.toLowerCase(), type: (el as HTMLInputElement).type ?? null, value: el.value }
        }
      }
      const title = norm((form.querySelector('h3') as HTMLElement | null)?.innerText ?? '')
      return { title, fields }
    })
  }

  // --- prescription list ---

  prescriptionRows(): Locator {
    return this.root.locator('.ch-prescription-list > li')
  }

  modifyPrescriptionButton(row: Locator): Locator {
    return row.getByRole('button', { name: 'Modify', exact: true })
  }

  deletePrescriptionButton(row: Locator): Locator {
    return row.getByRole('button', { name: 'Delete', exact: true })
  }

  async extractPrescriptionRows(): Promise<string[]> {
    const rows = await this.prescriptionRows().all()
    const texts: string[] = []
    for (const row of rows) {
      texts.push(((await row.innerText()) ?? '').replace(/\s+/g, ' ').trim())
    }
    return texts
  }

  // --- print view (Swiss ordonnance layout) ---

  printView(): Locator {
    return this.page.locator('.ch-print-view')
  }

  async openPrintView(): Promise<void> {
    await this.root.getByRole('button', { name: 'Print', exact: true }).click()
    await expect(this.printView()).toBeVisible()
  }

  async closePrintView(): Promise<void> {
    await this.printView().getByRole('button', { name: 'Close', exact: true }).click()
  }
}
