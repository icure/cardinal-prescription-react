# Cardinal Prescription Demo App 🇧🇪🇨🇭

This is a Vite + React app that consumes `@icure/cardinal-prescription-be-react` from `dist/` (not from source) —
it's the primary way to exercise the library end-to-end, since there is no other test suite for it beyond
[the Playwright e2e suite](#e2e-tests) and the library's own unit tests.

> For the library's features, components and API reference — including the Swiss (medINDEX) medication provider,
> regulatory badge registry, and display atoms — see
> [`packages/cardinal-prescription-be-react/README.md`](../cardinal-prescription-be-react/README.md).

It has two tabs, matching the library's country scope:

- **Belgium** — certificate upload, SAM medication search, prescription creation/editing/sending via Recip-e,
  and printing.
- **Switzerland** — medINDEX-powered medication search only (no certificate/auth). Prescription drafting, the
  drafts list, and the Swiss ordonnance print view are all implemented in this demo app itself, not the library
  (see [Switzerland (medINDEX) Support](../cardinal-prescription-be-react/README.md#switzerland-medindex-support)
  for why).

## Setup

From the repo root:

```bash
yarn install
```

Copy `.env.example` to `.env.local` (gitignored) in this package and fill in your values:

```bash
cp packages/demo-app/.env.example packages/demo-app/.env.local
```

| Variable                   | Used by     | Notes                                                                                     |
| -------------------------- | ----------- | ------------------------------------------------------------------------------------------ |
| `VITE_ICURE_USERNAME`      | Belgium tab | HCP email — see `.env.example` for how to create one in [Cockpit](https://cockpit.icure.dev/) |
| `VITE_ICURE_PASSWORD`      | Belgium tab | The HCP's active authentication token                                                     |
| `VITE_ICURE_URL`           | Belgium tab | iCure URL (SAM v2 endpoints); defaults to the nightly environment                          |
| `VITE_FHC_URL`             | Belgium tab | Free Health Connector URL (Recip-e transmission)                                           |
| `VITE_CARDINAL_LANGUAGE`   | Both tabs   | UI language: `fr` \| `nl` \| `de` \| `en`                                                  |
| `VITE_MEDINDEX_URL`        | Switzerland tab | medINDEX server base URL; defaults to `http://localhost:8080/rest/v2/medindex` for local dev |

The Switzerland tab needs a medINDEX server reachable at `VITE_MEDINDEX_URL` — medINDEX is public reference data
with no authentication, but you're responsible for having a server to point at.

## Running

From the repo root:

```bash
yarn start
```

If you've changed the library's source, rebuild it first — the demo app consumes `packages/cardinal-prescription-be-react/dist`, not `src`:

```bash
yarn build
```

or, while iterating, run the library's watch build (`yarn workspace @icure/cardinal-prescription-be-react dev`)
alongside `yarn start`.

## Building

```bash
yarn workspace demo-app build
```

## E2E tests

A Playwright suite lives under `e2e/` at the repo root (`yarn test:e2e`):

- The Belgium specs are kept byte-identical with the [Angular reference app](https://github.com/icure/cardinal-prescription-angular)'s own suite, to verify UI parity; sending/printing tests hit the Recip-e acceptance environment for real, so they need the Belgium `.env.local` credentials above plus a test practitioner certificate.
- `e2e/ch/` is a react-only suite for the Switzerland tab (medication search, the prescription form, drafts list, print view, and regulatory badges) — it needs a running medINDEX server at `VITE_MEDINDEX_URL`, no certificate.

The library must be rebuilt (`yarn build`) after source changes before running e2e — same as running the demo app.
