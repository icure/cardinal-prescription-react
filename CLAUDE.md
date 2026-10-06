# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Belgian-specific React component library (`@icure/cardinal-prescription-be-react`) for healthcare professionals to manage electronic prescriptions via Belgium's SAM platform and Recip-e. It wraps iCure's `@icure/be-fhc-lite-api`, `@icure/api` (SAM v2), and `@icure/medication-sdk`, exposing ready-made React components plus standalone service functions for certificate management, medication search, and prescription sending.

This is a Yarn workspaces monorepo with two packages:

- `packages/cardinal-prescription-be-react` — the publishable library (the actual product).
- `packages/demo-app` — a Create React App demo consuming the library, used as the primary way to exercise it end-to-end (there is no test suite).

## Commands

Run from the repo root unless noted.

- Install: `yarn install`
- Run the demo app (consumes the library): `yarn start` (delegates to `yarn workspace demo-app start`, i.e. `react-scripts start`)
- Build the library: `yarn build` (delegates to `yarn workspace @icure/cardinal-prescription-be-react build`, i.e. `tsup`)
- Watch-build the library while developing: `yarn workspace @icure/cardinal-prescription-be-react dev` (`tsup --watch`)
- Build the demo app: `yarn workspace demo-app build`

Lint: `yarn lint` (ESLint + Prettier, root `eslint.config.mjs`). Unit and component tests: `yarn test` (Vitest + Testing Library + axe-core on happy-dom). Offline browser checks of the library (host isolation, axe with contrast, target sizes, theming; Chromium, Firefox, WebKit): `yarn build && yarn test:e2e:harness`. The parity e2e suite (`yarn test:e2e`) needs live SAM/FHC credentials. See `TESTING.md`.

### Publishing the library

After bumping `version` in `packages/cardinal-prescription-be-react/package.json`:

```bash
yarn build
cd packages/cardinal-prescription-be-react
npm publish
```

## Architecture

### Library build

The library is built with `tsup` (`packages/cardinal-prescription-be-react/tsup.config.ts`), producing ESM + CJS bundles with declaration files from a single entry point: `src/index.ts`. `react`, `react-dom`, and `styled-components` are peer dependencies and are externalized from the bundle. Everything importable from the package is explicitly re-exported through `src/index.ts` — when adding a new public component or service function, it must be added there too.

### Directory layout (`packages/cardinal-prescription-be-react/src`)

- `components/` — React components, grouped by domain: `certificate-elements/`, `medication-elements/`, `prescription-elements/`, `form-elements/` (generic inputs), `common/` (Alert, Tooltip, Icons, InfiniteScroll). Each component folder has an `index.tsx` and a co-located `styles.ts` (styled-components).
- `services/` — framework-agnostic logic, independent of React:
  - `certificate/` — encrypts/decrypts the practitioner's certificate using WebCrypto (PBKDF2 + AES-GCM) and persists it in IndexedDB.
  - `fhc/` — talks to the Free Health Connector (`fhcRecipeApi`, `fhcStsApi`) to validate certificates against the STS and send prescriptions (`sendRecipe`). Requires an `fhc_url` passed in by the consuming app (see `FHC_URL` in the demo).
  - `cardinal-sam/` — queries the SAM v2 SDK (`IccBesamv2Api`) for medication search (AMP/VMP-group/NMP) and SAM version.
  - `indexed-db/` — small generic `IndexedDbServiceStore<T>` wrapper around the IndexedDB API, used for certificate and token storage.
  - `i18n/` — a minimal in-house i18n system (`cardinalLanguage` singleton + `t()` lookup) supporting `en`/`fr`/`nl`/`de`; translation strings live under `services/i18n/translations/`. `getSamTextTranslation` extracts the current language out of SAM's own `SamText` multi-language fields, falling back to `DEFAULT_APP_LANGULAGE`.
  - `medication-mapper/` — maps SAM SDK medication types (Amp/Vmp/Nmp) into the library's own `MedicationType`/`PrescribedMedicationType` domain types.
- `types/` — shared TypeScript types (medication, reimbursement, certificate, forms, visibility, IndexedDB store), all re-exported via `types/index.ts`.
- `utils/` — pure helper functions (date formatting, dosage/posology text, reimbursement text, visibility rules, string/file helpers).
- `styles/` — shared styled-components primitives, CSS reset, responsive breakpoints, and design variables/tokens used across components.

### Key data flow

The consuming app (see `packages/demo-app/src/App.tsx` as the reference integration) owns all backend SDK instances and orchestrates the flow; the library itself holds no global backend clients:

1. App instantiates `IccBesamv2Api` (SAM) itself with its own auth provider and passes the instance into `<MedicationSearch sdk={...} />`.
2. Practitioner certificate upload/decrypt/validation flows through `PractitionerCertificate` (component) + `uploadAndEncryptCertificate` / `loadCertificateInformation` / `validateDecryptedCertificate` (service functions), with the encrypted certificate persisted client-side in IndexedDB — the raw certificate/passphrase never leaves the browser except to derive an STS token via `fhc/verifyCertificateWithSts`.
3. Selecting a medication in `MedicationSearch` triggers `onAddPrescription`, which the app wires to open `PrescriptionModal` for structured/unstructured posology entry.
4. Confirmed prescriptions are held in app state as `PrescribedMedicationType[]` and rendered via `PrescriptionList`, which exposes send/print/modify/delete callbacks back to the app.
5. Sending a prescription calls `sendRecipe(...)`, which decrypts the stored certificate, verifies it against the FHC STS, then POSTs to `fhcRecipeApi` — one Recip-e request per medication.
6. `PrescriptionPrintModal` renders a printable view of the sent prescriptions independent of the send flow.

All of the above SDK instances, the FHC URL, HCP/patient data, and vendor/SAM-package metadata are supplied by the host application — the library has no built-in configuration or network defaults beyond what's passed as props/args.

### Styling

Styling uses `styled-components` (v6) exclusively — no CSS modules or Tailwind. Every visual value comes from the theme tokens in `src/styles/theme.ts` (`cp.colorSurface` → `var(--cp-color-surface, …)`): never write a raw colour, font size or radius in a component, add a token instead and document it (the README "Theming" table is checked by `theme.test.ts`). Nothing is global: each public component's root applies `libraryRoot` (scoped reset, base text, opt-in dark defaults) and carries `LIBRARY_ROOT_CLASS`; never use `createGlobalStyle`. Controls use `targetSize(...)` (44 px by default, compact only under `@media (hover: hover) and (pointer: fine)`). Responsive breakpoint helpers live in `styles/responsive-media-queries.ts`. Follow the existing pattern of a component's markup in `index.tsx` and its styled-components in a sibling `styles.ts`.

### Code style

Enforced via `.eslintrc`/`.prettierrc` in `packages/cardinal-prescription-be-react` (no semicolons, single quotes, 180-char print width, trailing commas). Match existing formatting since there's no pre-commit hook or CI lint step enforcing it automatically.
