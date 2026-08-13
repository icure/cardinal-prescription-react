# Angular react parity check

The goal of this plan is to perform a feature per feature comparison of the angular and the react implementation of the prescription features

The repositories are :
Angular: /Users/aduchate/Sources/icure/cardinal-prescription-angular
React: /Users/aduchate/Sources/icure/cardinal-prescription-react

The goal is to guarantee that the behaviour and the features of the two implementations are the same.

# Methodology

The react app also present a Switzerland tab. Only compare the Belgium tab of the angular app with the all react app.

1. The two applications are compared using playwright tests.
   a. The same e2e tests are written in both repositories
   b. The same checks are performed on both sides
   c. The results of the tests on both sides must be the same
2. The angular app is the reference, only the react app can be modified
3. When testing a complex feature, use a large range of entries. For example, to test the medication, use the test medications suggested in the README, to test the posologies, use the tests in the unit tests of the medication-sdk.

# Prerequisite

1. A certificate must be available in both implementation (use: resources/SSIN=74010414733 20251117-122425.acc-p12, passphrase: 1Cur33H3@lth)
2. The requests on the cloud must be working (you can use user maxime.mennechet@medispring.be:Ztf993pf if no other user is available)

# Results (2026-07-18/19)

## Test harness

Both repos now carry an identical Playwright suite (run with `yarn test:e2e`, servers auto-started
via each config's `webServer`, or reused when already running):

- `playwright.config.ts` + `e2e/` in each repo. The six spec files (`01-smoke`, `02-certificate`,
  `03-medication-search`, `04-prescription-modal`, `05-prescription-list`, `06-send-print`) are
  **byte-identical between the two repos**; everything app-specific (base URL, the react demo's
  Belgium tab, structural CSS selectors) is confined to a per-repo `e2e/app-driver.ts` exposing
  the same API.
- Reference fixtures (`e2e/fixtures/*.json`) are harvested from the **angular** app
  (`UPDATE_SEARCH_FIXTURE=1` / `UPDATE_MODAL_FIXTURE=1` / `UPDATE_LIST_FIXTURE=1` /
  `UPDATE_SEND_FIXTURE=1`) and copied verbatim into the react repo, so both suites assert the same
  expected values: rendered search-result cards, prescription-modal field state, prescription list
  rows, sent-row and printed-document text.
- The react demo uses the same credentials as the angular demo via
  `packages/demo-app/.env.local`, and the same HCP (Antoine Duchâteau, SSIN 74010414733 — the test
  certificate's SSIN, nihii 10032669001). The angular e2e reference the certificate from this
  repo's `resources/` directory.
- Volatile data is canonicalized identically on both sides before comparison: dates and Recip-e
  RIDs are masked, and (see below) the reimbursement category token is masked with cards compared
  as a sorted set per product group.

## Coverage

31 tests per repo: SDK init/SAM version, certificate upload/decrypt/wrong-passphrase/reset flows,
medication search for all README "medications of interest" + Dafalgan (first page of rendered
cards compared verbatim against the reference fixture), infinite scroll, prescription modal state
(create/modify/extra fields), 9 free-text posologies from `@icure/medication-sdk`'s French parser
test-suite round-tripped into list rows, posology autocompletion, SAM standard dosages, list
modify/delete, real sends to the Recip-e acceptance environment and the printed document.

## Non-determinism found in the reference (angular) app

The SAM backend returns an AMP's packages and a package's DMPPs in unstable order and the angular
loader picks "the first active" (`.find(...)`) and sorts sub-cards by backend array position, so
two consecutive runs of the *angular app itself* can swap sub-cards inside a product group and
flip the displayed reimbursement category (observed on Crestor: A ↔ C between runs). The parity
suite therefore compares cards **order-insensitively within a group** and masks the category
letter; everything else (titles, prices, delivery/prescription conditions, CAVE warnings,
grouping, ordering of groups) is compared strictly.

## Divergences found and fixed in react (angular = reference)

Demo app (`packages/demo-app`):
- HCP was Fabien Zimer / SSIN 84100212104 / nihii 10104133000 → aligned to the angular demo's
  Antoine Duchâteau / 74010414733 / 10032669001 (matches the test certificate).
- `samPackage.packageVersion` had a stray `]` (`'1.0]-freehealth-connector'`).
- SAM version label was hardcoded `SamVersion:` → now `t('home.samVersionLabel')` ("Version Sam :").
- Certificate state machine now mirrors the angular home component: a failed validation no longer
  resets `certificateUploaded`, no effect clears the verification error, and resetting the
  certificate no longer deletes it from IndexedDB (angular keeps it; only the form switches back).
- `PrescriptionList` was rendered with `hideSectionsTitles` → removed ("Ordonnances en
  attente:/envoyées:" titles now shown like angular).

Library (`packages/cardinal-prescription-be-react`):
- Translations: `certificateFeedback` strings (fr/en/nl/de) differed → aligned verbatim.
- `validateDecryptedCertificate` now probes the local decryption first and returns
  `{status: false}` with **no error message** when the passphrase cannot decrypt the stored
  envelope (angular behavior); STS-level failures keep surfacing their message.
- `PractitionerCertificate`: success alert condition is `certificateValid && !error` (was
  `certificateValid && certificateUploaded`); the "Mot de passe manquant" alert moved into the
  upload form and is driven by a mount-time IndexedDB probe (new optional `hcpSsin` prop),
  mirroring angular's `certificate-upload` component which owns that state.
- `MedicationCard`: the delivery/prescription condition fallback labels were swapped relative to
  angular ("Libre de prescription" ↔ "Non applicable"); the prescription-conditions pill now also
  requires `deliveryModusSpecification` like angular; the react-only "Le moins cher"/"Bon marché"
  header badge was removed (angular shows cheapness only in the expanded panel).
- `MedicationCard` gained a `readOnly` mode (no click, no summary badges, no expand arrow) and
  `PrescriptionModal` now shows the prescribed medication as a **read-only medication card** like
  angular, instead of a disabled title input (the title input remains, disabled, only when there
  is no medication object).
- `PrescriptionModal`: substitution radio options were `[Non, Oui]` → `[Oui, Non]` with angular's
  translation keys.
- `TextInput` only *styled* `disabled` but never set the DOM attribute — disabled inputs were
  actually editable. Fixed.

## Status

**Full suite green on both repos: 31/31 (angular) and 31/31 (react), against the same fixtures.**

Note on environment stability: on the morning of 2026-07-19 the Recip-e acceptance environment
temporarily stopped accepting sends and `06-send-print` failed **identically on both apps** for
about an hour (an outage, not a parity difference). If that spec fails, cross-check the other repo
before suspecting a regression.
