import * as path from 'path'
import { expect, Locator, Page } from '@playwright/test'

// Test certificate shipped in this repo (see docs/angular-react-parity.md, Prerequisite).
export const CERTIFICATE_PATH = path.resolve(__dirname, '../resources/SSIN=74010414733 20251117-122425.acc-p12')
export const CERTIFICATE_PASSPHRASE = '1Cur33H3@lth'

// Thin per-app driver: the parity spec files are byte-identical between the angular and react
// repos; everything app-specific (URLs, tab bar, structural selectors) lives here.
export class AppDriver {
  // The parity scope is the Belgium tab only: the demo app keeps the (out-of-scope) Switzerland
  // tab mounted but hidden, so all queries are rooted in the Belgium tab container. Modals render
  // inside it too. In the angular driver `root` is simply the page body.
  readonly root: Locator

  constructor(readonly page: Page) {
    this.root = page.locator('.tab-content--be')
  }

  // Loads the app, selects the Belgium tab and waits for the SDK init to complete
  // (the SAM version renders only after a successful authenticated call).
  async goto(): Promise<void> {
    await this.page.goto('/')
    await this.page.getByRole('button', { name: 'Belgium' }).click()
    await expect(this.samVersion()).toHaveText(/.+/, { timeout: 60_000 })
  }

  samVersion(): Locator {
    return this.root.locator('p', { hasText: 'Version Sam :' }).locator('strong')
  }

  certificateFileInput(): Locator {
    return this.root.locator('input[type="file"]')
  }

  passphraseInput(): Locator {
    return this.root.locator('input[type="password"]')
  }

  async uploadCertificate(certificatePath: string, passphrase: string): Promise<void> {
    await this.certificateFileInput().setInputFiles(certificatePath)
    await this.passphraseInput().fill(passphrase)
    await this.root.getByRole('button', { name: 'Crypter et télécharger' }).click()
  }

  // Password-only form shown when a certificate is already stored in IndexedDB.
  async decryptCertificate(passphrase: string): Promise<void> {
    await this.passphraseInput().fill(passphrase)
    await this.root.getByRole('button', { name: 'Soumettre' }).click()
  }

  async resetCertificate(): Promise<void> {
    await this.root.getByRole('button', { name: 'Télécharger un autre certificat' }).click()
  }

  medicationSearchInput(): Locator {
    return this.root.getByPlaceholder('Trouver un médicament')
  }

  alert(title: string): Locator {
    return this.root.getByRole('heading', { name: title })
  }

  // --- medication search ---

  // App-specific selectors for the search dropdown's result structure.
  private readonly resultSelectors = {
    group: '.tab-content--be .medOrProdWrap',
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

  // --- prescription modal ---

  // Selector for the read-only medication card rendered inside the prescription modal.
  private readonly modalCardSelector = '#prescriptionForm .StyledMedicationCard'
  // Selector for one prescription row in the prescription list.
  private readonly prescriptionRowSelector = '.cardinal-prescriptions__rows > *'

  prescriptionModal(): Locator {
    return this.page.locator('#prescriptionForm')
  }

  async openPrescriptionModal(query: string, cardText: string): Promise<void> {
    await this.searchMedication(query)
    await this.waitForSearchSettled()
    await this.resultCards().filter({ hasText: cardText }).first().locator('h3').first().click()
    await expect(this.prescriptionModal()).toBeVisible()
  }

  modalField(id: string): Locator {
    return this.prescriptionModal().locator(`#${id}`)
  }

  posologySuggestions(): Locator {
    return this.prescriptionModal().locator('.suggestionsDropdown li, .dosageInput__dropdown li')
  }

  async submitPrescriptionModal(): Promise<void> {
    await this.prescriptionModal().getByRole('button', { name: 'Soumettre', exact: true }).click()
  }

  // The real checkbox behind the styled toggle switch sits outside the viewport, so click it
  // programmatically (fires the change event in both frameworks).
  async toggleExtraFields(): Promise<void> {
    await this.modalField('showExtraFields').evaluate((el) => (el as HTMLElement).click())
  }

  async cancelPrescriptionModal(): Promise<void> {
    await this.prescriptionModal().getByRole('button', { name: 'Annuler', exact: true }).click()
  }

  prescriptionRows(): Locator {
    return this.root.locator(this.prescriptionRowSelector)
  }

  modifyPrescriptionButton(row: Locator): Locator {
    return row.locator('button.edit')
  }

  deletePrescriptionButton(row: Locator): Locator {
    return row.locator('button.delete')
  }

  async extractPrescriptionRows(): Promise<string[]> {
    const rows = await this.prescriptionRows().all()
    const texts: string[] = []
    for (const row of rows) {
      texts.push(((await row.innerText()) ?? '').replace(/\s+/g, ' ').trim())
    }
    return texts
  }

  // Extracts the modal's full visible state (field values, selects with their option labels,
  // radio states, the read-only medication card, the extra-fields preview) as comparable data.
  async extractPrescriptionModalState(fieldIds: string[]): Promise<Record<string, unknown>> {
    return this.page.evaluate(
      ({ fieldIds, cardSel }) => {
        const norm = (s: string) => s.replace(/\s+/g, ' ').trim()
        const form = document.querySelector('#prescriptionForm') as HTMLElement | null
        if (!form) return { error: 'no form' }
        const fields: Record<string, unknown> = {}
        for (const id of fieldIds) {
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
            const input = el as HTMLInputElement
            fields[id] = {
              tag: el.tagName.toLowerCase(),
              type: input.type ?? null,
              value: input.type === 'checkbox' ? String(input.checked) : input.value,
              disabled: input.disabled,
            }
          }
        }
        const card = document.querySelector(cardSel) as HTMLElement | null
        const radios = Array.from(form.querySelectorAll('input[type=radio]')).map((r) => {
          const input = r as HTMLInputElement
          const byFor = input.id ? (form.querySelector(`label[for="${CSS.escape(input.id)}"]`) as HTMLElement | null) : null
          const wrapping = input.closest('label') as HTMLElement | null
          return { label: norm((byFor ?? wrapping)?.innerText ?? ''), checked: input.checked }
        })
        const preview = Array.from(form.querySelectorAll('.addMedicationForm__body__extraFieldsPreview p'))
          .map((p) => norm((p as HTMLElement).innerText))
          .filter(Boolean)
        const title = norm((form.querySelector('.addMedicationForm__header h3') as HTMLElement | null)?.innerText ?? '')
        return { title, fields, medicationCard: card ? norm(card.innerText) : null, radios, preview }
      },
      { fieldIds, cardSel: this.modalCardSelector },
    )
  }
}
