import { defineConfig } from 'vitest/config'

export default defineConfig({
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
