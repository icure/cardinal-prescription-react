import { defineConfig, devices } from '@playwright/test'

// Offline browser checks of the library itself (no backend, no credentials): the demo app's
// `harness.html` mounts one public component with fixtures beside host chrome. Run with
// `yarn test:e2e:harness` after `yarn build` (the demo app consumes the built library).
const PORT = 3100

export default defineConfig({
  testDir: './e2e/harness',
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  retries: 0,
  reporter: [['list']],
  use: {
    baseURL: `http://localhost:${PORT}`,
    locale: 'fr-BE',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    // Touch devices: `pointer: coarse` and no hover, where every control must reach 44 px.
    { name: 'chromium-touch', use: { ...devices['Pixel 7'] }, grep: /@touch/ },
    { name: 'webkit-touch', use: { ...devices['iPad (gen 7)'] }, grep: /@touch/ },
  ],
  webServer: {
    command: `yarn workspace demo-app exec vite --port ${PORT} --strictPort`,
    env: { BROWSER: 'none' },
    url: `http://localhost:${PORT}/harness.html`,
    reuseExistingServer: true,
    timeout: 120_000,
  },
})
