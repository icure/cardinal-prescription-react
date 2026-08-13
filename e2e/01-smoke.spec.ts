import { expect, test } from '@playwright/test'
import { AppDriver } from './app-driver'

// Parity spec — this file is intentionally identical in cardinal-prescription-angular and
// cardinal-prescription-react (only ./app-driver differs). Keep both copies in sync.

test.describe('smoke', () => {
  test('app boots, authenticates against the SAM backend and shows the SAM version', async ({ page }) => {
    const app = new AppDriver(page)
    await app.goto()
    await expect(app.samVersion()).toHaveText(/^[A-Z]\.\d{8}_\d{6}$/)
  })

  test('fresh session shows the certificate upload form', async ({ page }) => {
    const app = new AppDriver(page)
    await app.goto()
    await expect(page.getByRole('heading', { name: 'Télécharger le certificat' })).toBeVisible()
    await expect(app.certificateFileInput()).toBeAttached()
    await expect(app.passphraseInput()).toBeAttached()
    await expect(page.getByRole('button', { name: 'Crypter et télécharger' })).toBeVisible()
  })

  test('medication search is not available before a certificate is validated', async ({ page }) => {
    const app = new AppDriver(page)
    await app.goto()
    await expect(app.root.locator('input[type="text"], input[type="search"]')).toHaveCount(0)
  })
})
