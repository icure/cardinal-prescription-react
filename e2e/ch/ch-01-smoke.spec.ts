import { expect, test } from '@playwright/test'
import { ChAppDriver } from './ch-app-driver'

// ch counterpart of ../01-smoke.spec.ts. The Switzerland tab has no certificate/STS gating
// (medINDEX is public reference data), so where the Belgium smoke test asserts the certificate
// form gates the search, this one asserts the search is available immediately and no
// certificate step exists at all.

test.describe('ch smoke', () => {
  test('the Switzerland tab boots and the medication search is available immediately', async ({ page }) => {
    const app = new ChAppDriver(page)
    await app.goto()
    await expect(app.root.getByRole('heading', { name: 'Switzerland (medINDEX)' })).toBeVisible()
    await expect(app.medicationSearchInput()).toBeVisible()
  })

  test('the search input advertises the unified name/substance/ATC search', async ({ page }) => {
    const app = new ChAppDriver(page)
    await app.goto()
    await expect(app.medicationSearchInput()).toHaveAttribute('placeholder', 'Trouver un médicament — nom, substance ou code ATC')
  })

  test('the Switzerland tab has no certificate step', async ({ page }) => {
    const app = new ChAppDriver(page)
    await app.goto()
    await expect(app.root.locator('input[type="file"]')).toHaveCount(0)
    await expect(app.root.locator('input[type="password"]')).toHaveCount(0)
    await expect(app.root.getByRole('heading', { name: 'Télécharger le certificat' })).toHaveCount(0)
  })
})
