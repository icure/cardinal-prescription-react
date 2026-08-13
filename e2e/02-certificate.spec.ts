import { expect, test } from '@playwright/test'
import { AppDriver, CERTIFICATE_PASSPHRASE, CERTIFICATE_PATH } from './app-driver'

// Parity spec — this file is intentionally identical in cardinal-prescription-angular and
// cardinal-prescription-react (only ./app-driver differs). Keep both copies in sync.
//
// The upload + STS verification round-trips to the real FHC acc environment, hence the
// generous expect timeouts on the post-upload assertions.

const STS_TIMEOUT = { timeout: 90_000 }

test.describe('practitioner certificate', () => {
  test('uploading the certificate with the correct passphrase validates it and unlocks the medication search', async ({ page }) => {
    const app = new AppDriver(page)
    await app.goto()

    await app.uploadCertificate(CERTIFICATE_PATH, CERTIFICATE_PASSPHRASE)

    await expect(app.alert('Téléchargement du certificat réussi')).toBeVisible(STS_TIMEOUT)
    await expect(app.medicationSearchInput()).toBeVisible()
    await expect(app.page.getByRole('heading', { name: 'Télécharger le certificat' })).toHaveCount(0)
  })

  test('uploading the certificate with a wrong passphrase shows a verification error and keeps the search locked', async ({ page }) => {
    const app = new AppDriver(page)
    await app.goto()

    await app.uploadCertificate(CERTIFICATE_PATH, 'not-the-passphrase')

    // Reference (angular) behavior: the encrypted envelope decrypts (it was just encrypted with
    // the same wrong passphrase) but the STS rejects the keystore password: a verification-error
    // alert shows the backend message, and the full upload form stays available.
    await expect(app.alert('Erreur de vérification du certificat')).toBeVisible(STS_TIMEOUT)
    await expect(app.root.getByText('keystore password was incorrect')).toBeVisible()
    await expect(app.alert('Échec du téléchargement du certificat')).toHaveCount(0)
    await expect(app.alert('Mot de passe manquant')).toHaveCount(0)
    await expect(app.root.getByRole('heading', { name: 'Télécharger le certificat' })).toBeVisible()
    await expect(app.certificateFileInput()).toBeAttached()
    await expect(app.medicationSearchInput()).toHaveCount(0)
  })

  test('after a reload the stored certificate only asks for the passphrase, and the correct one validates it', async ({ page }) => {
    const app = new AppDriver(page)
    await app.goto()
    await app.uploadCertificate(CERTIFICATE_PATH, CERTIFICATE_PASSPHRASE)
    await expect(app.alert('Téléchargement du certificat réussi')).toBeVisible(STS_TIMEOUT)

    await app.goto()

    await expect(app.root.getByRole('heading', { name: 'Entrez le mot de passe du certificat' })).toBeVisible()
    await expect(app.alert('Mot de passe manquant')).toBeVisible()
    await expect(app.certificateFileInput()).toHaveCount(0)

    await app.decryptCertificate(CERTIFICATE_PASSPHRASE)

    await expect(app.alert('Téléchargement du certificat réussi')).toBeVisible(STS_TIMEOUT)
    await expect(app.medicationSearchInput()).toBeVisible()
  })

  test('entering a wrong passphrase for the stored certificate does not validate it', async ({ page }) => {
    const app = new AppDriver(page)
    await app.goto()
    await app.uploadCertificate(CERTIFICATE_PATH, CERTIFICATE_PASSPHRASE)
    await expect(app.alert('Téléchargement du certificat réussi')).toBeVisible(STS_TIMEOUT)

    await app.goto()
    await app.decryptCertificate('not-the-passphrase')

    // Reference (angular) behavior: the wrong passphrase fails the local decryption and the app
    // stays on the passphrase form — no dedicated error alert, nothing validates.
    await page.waitForTimeout(5_000)
    await expect(app.root.getByRole('heading', { name: 'Entrez le mot de passe du certificat' })).toBeVisible()
    await expect(app.alert('Mot de passe manquant')).toBeVisible()
    await expect(app.alert('Téléchargement du certificat réussi')).toHaveCount(0)
    await expect(app.alert('Erreur de vérification du certificat')).toHaveCount(0)
    await expect(app.medicationSearchInput()).toHaveCount(0)
  })

  test('resetting the stored certificate returns to the full upload form', async ({ page }) => {
    const app = new AppDriver(page)
    await app.goto()
    await app.uploadCertificate(CERTIFICATE_PATH, CERTIFICATE_PASSPHRASE)
    await expect(app.alert('Téléchargement du certificat réussi')).toBeVisible(STS_TIMEOUT)

    await app.goto()
    await app.resetCertificate()

    await expect(app.root.getByRole('heading', { name: 'Télécharger le certificat' })).toBeVisible()
    await expect(app.certificateFileInput()).toBeAttached()

    // Reference (angular) behavior: resetting only switches the form back to upload mode — the
    // stored certificate is NOT deleted, so a reload asks for the passphrase again.
    await app.goto()
    await expect(app.root.getByRole('heading', { name: 'Entrez le mot de passe du certificat' })).toBeVisible()
  })
})
