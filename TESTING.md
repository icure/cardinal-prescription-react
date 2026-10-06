# Testing

The library (`packages/cardinal-prescription-be-react`) is tested with
[Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/),
running on `happy-dom`.

## Commands

Run from the repo root:

```bash
yarn test            # run the library test suite once
yarn test:coverage   # run with V8 coverage (thresholds enforced)
```

Or scoped to the library workspace:

```bash
yarn workspace @icure/cardinal-prescription-be-react test
yarn workspace @icure/cardinal-prescription-be-react test:watch
```

## Layout

- `src/testing/` — shared test infrastructure:
  - `test-helpers.ts` — mock factories for SAM models (`AmpMockFactory`,
    `AmppMockFactory`, `DmppMockFactory`, `VmpGroupMockFactory`,
    `SamTextMockFactory`), a `PaginatedListIteratorMockFactory` that produces
    objects satisfying the SDK's branded `PaginatedListIterator<T>`, a
    `TestDataBuilder`, and `setTestLanguage`/`resetTestLanguage` helpers that
    drive the real `cardinalLanguage` singleton.
  - `fixtures/` — JSON fixtures used by the loader tests. `amps.json` is a
    trimmed, field-projected slice of real SAM data (only deliverable AMPs and
    the fields the loader reads) so it stays small; `vmps.json`/`nmps.json` are
    verbatim. **Do not** commit the full multi-megabyte SAM export.
  - `setup.ts` — registers `@testing-library/jest-dom` matchers.
- Test files live next to the code they cover as `*.test.ts(x)`.

## What is covered

- `internal/services/loaders/medication-loader.test.ts` — pagination,
  alphabetical merge ordering, cheap/cheapest filtering, commercialization-date
  and delivery-environment filtering, DMPP CNK selection, language fallback,
  and the k-way lazy merge.
- `internal/services/prescription/create-prescription.test.ts` — free-text
  posology → FHC `RegimenItem[]`, standard-dosage filtering/quantity, and
  single/multiple prescription construction.
- `internal/translations/translations.test.ts` — asserts all four languages
  (fr/nl/de/en) expose an identical set of translation keys.

- `shared/components/__tests__/host-isolation.test.tsx` — mounting each public component leaves the
  host page's `body` font and background, focus ring and list bullets unchanged, and every injected rule is
  scoped to a library class (no global reset).
- `shared/components/__tests__/accessibility.test.tsx` — axe-core (WCAG 2.2 A/AA + best practices, minus the
  layout rules happy-dom cannot evaluate) on every public component, plus names and roles of the modal.
- `shared/components/PrescriptionModal/posology-editor.test.tsx` — the `posologyEditor` slot, and the default
  free-text editor unchanged without it.
- `styles/theme.test.ts` — the README "Theming" table matches the tokens the components read.

Component tests resolve `styled-components` to its browser build (`vitest.config.ts`), so `createGlobalStyle`
and friends behave as in a browser.

## Offline browser checks (harness)

`yarn build && yarn test:e2e:harness` runs `e2e/harness/*.spec.ts` (config `playwright.harness.config.ts`) against
`packages/demo-app/harness.html`, which mounts one public component with fixtures beside host chrome — no backend,
no credentials. It checks, in Chromium, Firefox and WebKit: host page isolation (MD-00's "global reset" table),
axe with colour contrast in light and dark, 24 px targets under a fine pointer and 44 px on touch devices
(Pixel 7 and iPad emulation), and the theming hooks (`data-cp-theme`, host custom properties).

## End-to-end tests

`yarn test:e2e` runs the Playwright suite against the demo app (started
automatically on port 3000). It contains two independent groups:

- `e2e/*.spec.ts` — the Belgium angular/react **parity** suite: spec files are
  byte-identical with the `cardinal-prescription-angular` repo and fixtures are
  harvested from the angular app (see `docs/angular-react-parity.md`). Requires
  the demo credentials in `packages/demo-app/.env.local` and hits the real
  SAM/FHC acceptance backends.
- `e2e/ch/*.spec.ts` — the Switzerland (medINDEX) suite, **react-only**: it
  mirrors the shape of the Belgium specs (smoke, search, prescription form,
  list, print) but is not copied to the angular repo. It needs a medINDEX
  server (default `http://localhost:8080/rest/v2/medindex`, see
  `VITE_MEDINDEX_URL`) and no certificate/credentials. Its fixtures are
  self-harvested from this app by running with `UPDATE_CH_FIXTURE=1`; run
  `yarn test:e2e e2e/ch` to run only this group.

## Coverage

`vitest.config.ts` enables V8 coverage with thresholds (statements 60,
branches 50, functions 60, lines 60), initially scoped to the framework-agnostic
`services/` and `utils/` code. Widen the `coverage.include` globs as component
tests are added. Coverage output is written to the gitignored `coverage/`.
