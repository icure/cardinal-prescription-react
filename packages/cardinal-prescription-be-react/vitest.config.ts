import { createRequire } from 'node:module'
import { defineConfig } from 'vitest/config'

const require = createRequire(import.meta.url)

export default defineConfig({
  resolve: {
    alias: {
      // Node resolution picks styled-components' server build, which never injects
      // `createGlobalStyle` rules into the DOM; the browser build behaves like a host app's, so
      // the host-isolation tests see exactly what a browser would.
      'styled-components': require.resolve('styled-components/dist/styled-components.browser.esm.js'),
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./src/testing/setup.ts'],
    coverage: {
      provider: 'v8',
      reportsDirectory: '../../coverage',
      reporter: ['text-summary', 'html', 'lcov'],
      // Scope coverage to the framework-agnostic domain logic first; widen as
      // component tests are added.
      include: ['src/internal/services/**', 'src/internal/utils/**', 'src/shared/services/**'],
      thresholds: {
        statements: 60,
        branches: 50,
        functions: 60,
        lines: 60,
      },
    },
  },
})
