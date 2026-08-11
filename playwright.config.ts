import { defineConfig } from '@playwright/test'

// E2E parity harness (see docs/angular-react-parity.md): the same scenarios run against the
// angular reference app (cardinal-prescription-angular) and this repo's demo app. Tests hit the
// real nightly iCure cloud + FHC acc environment, so they run serially with generous timeouts.
export default defineConfig({
  testDir: './e2e',
  timeout: 180_000,
  expect: { timeout: 30_000 },
  workers: 1,
  retries: 0,
  reporter: [['list'], ['json', { outputFile: 'e2e-results.json' }]],
  use: {
    baseURL: 'http://localhost:3000',
    locale: 'fr-BE',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'yarn workspace demo-app start --port 3000 --strictPort',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 120_000,
  },
})
