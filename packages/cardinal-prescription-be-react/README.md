# Cardinal Prescription React Component 🇧🇪🇨🇭

This started as a **Belgian-specific** React library for healthcare professionals to **manage electronic
prescriptions**, and now also ships **Swiss medication search** powered by medINDEX. It integrates iCure's APIs —
`@icure/be-fhc-lite-api`, `@icure/cardinal-be-sam-sdk` (SAM, Belgium), `@icure/medindex-sdk` (medINDEX, Switzerland)
and `@icure/medication-sdk` — to streamline:

- Practitioner certificate management (Belgium)
- Medication search — SAM (Belgium) or medINDEX (Switzerland), behind one country-configurable provider
- Electronic prescription creation & editing (Belgium)
- Prescription overview & sending via Recip-e (Belgium)
- Printing of prescriptions (Belgium)

**Belgium** integration targets **[Belgium’s SAM platform](https://www.samportal.be/nl/sam/documentation)** and
Recip-e for prescription transmission. **Switzerland** support is medication search only this phase — see
[Switzerland (medINDEX) Support](#switzerland-medindex-support) for the scope. Both can be embedded into other
medical software projects as a drop-in feature.

## Table of Contents

- [About iCure and Cardinal](#about-icure-and-cardinal)
- [Features](#features)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Available Components and How to Use Them](#available-components-and-how-to-use-them)
- [Available APIs](#available-apis)
- [Switzerland (medINDEX) Support](#switzerland-medindex-support)
- [SAM and Recip-e Requirements](#sam-and-recip-e-requirements)
- [Medications of Interest for Tests](#medications-of-interest-for-tests)
- [Example Demo Application](#example-demo-application)

## About iCure and Cardinal

![iCure logo](https://raw.githubusercontent.com/icure/cardinal-prescription-angular/main/public/assets/icure.svg)

[iCure](https://icure.com/en/) is the company that provides a **secure, end-to-end encrypted backend-as-a-service** for
Health-Tech, allowing companies to build fully compliant medical solutions faster.

![Cardinal logo](https://raw.githubusercontent.com/icure/cardinal-prescription-angular/main/public/assets/cardinal.svg)

[Cardinal](https://cardinalsdk.com/en) is iCure’s backend platform that provides data management, security, and
interoperability features. _In this project, we do not use the Cardinal backend directly — we integrate with iCure's
public API to access its SAM and Free Health Connector (FHC) features._

[Free Health Connector (FHC)](https://icure.com/en/products/cardinal-free-health-connector/)
The Cardinal Free Health Connector (FHC) is iCure’s open-source implementation of Belgium’s eHealth infrastructure. It
enables secure, standards-based connections to government and regional healthcare systems

## Features

- Designed for Belgian healthcare professionals, with Swiss medication search alongside it
- Practitioner certificate upload & verification (Belgium)
- Medication search powered by iCure's SAM SDK (Belgium) or medINDEX (Switzerland), selected via one
  `createMedicationProvider({ country: 'be' | 'ch', ... })` call
- Unified Swiss search over product/brand name, active substance, and ATC code/class in a single query
- Country-blind regulatory badge registry — SAM badges (Belgium) and medINDEX badges (Switzerland, e.g. Swissmedic
  category, narcotic, cold chain, composition, interactions) render automatically, no app-level setup
- `MedicationCard` and `Button` exported as standalone display atoms for host apps building their own
  country-specific flow (used by this repo's own Swiss demo tab)
- Create, edit, list, send, and print prescriptions (Belgium)
- Structured and unstructured posology support (Belgium)
- Interacts with Recip-e to send prescriptions (Belgium)
- Ready to integrate into medical apps
- Secure certificate storage in browser (Belgium)
- Fully internationalized (French, Dutch, German, English)

## Technologies

- **React 18+**
- **iCure SDKs** (`@icure/be-fhc-lite-api`, `@icure/cardinal-be-sam-sdk` for SAM/Belgium, `@icure/medindex-sdk` for
  medINDEX/Switzerland, `@icure/medication-sdk`)
- **TypeScript**
- **React Hook Form** for forms
- **Styled-components** for UI styling
- **UUID** for unique identifiers
- **jsBarcode** for barcode generation

## Prerequisites

Before starting, make sure you have:

- **Node.js v16+** and **Yarn** or **npm** installed
- A **valid Belgian practitioner certificate file** to load into the app
- **Practitioner credentials** for iCure authentication (generated in your app using `@icure/cardinal-sdk` or via iCure
  Cockpit for test purposes):
  - [Create a HCP in Cockpit](https://docs.icure.com/cockpit/how-to/how-to-manage-hcp#creating-an-hcp)
  - [Generate the authentication token for the HCP](https://docs.icure.com/cockpit/how-to/how-to-manage-hcp#generating-an-authentication-token)
- **Patient** and **healthcare professional** information to populate prescriptions
- A valid **Free Health Connector URL**, which depends on the certificate you use: for the acceptance certificate, use `https://fhcacc.icure.cloud`, and for the production certificate, use `https://fhcprd.icure.cloud`.
- A valid **iCure URL** that will be used for SAM. You should use: `https://api.icure.cloud`.
- **Vendor** and **SamPackage**

```html
const practitionerCredentials = { username: 'xxx@xxx.com', password: 'xxxxxxxxxxx', } const ICURE_URL = 'https://api.icure.cloud' const FHC_URL = 'https://fhcacc.icure.cloud' const
CARDINAL_PRESCRIPTION_LANGUAGE = 'fr' const vendor = { vendorName: 'vendorName', vendorEmail: 'support@test.be', vendorPhone: '+3200000000', } const samPackage = { packageName:
'test[test/1.0]-freehealth-connector', packageVersion: '1.0]-freehealth-connector', }
```

## Getting Started

### 1. Install the library

```bash
yarn add @icure/cardinal-prescription-be-react
```

or

```bash
npm install @icure/cardinal-prescription-be-react
```

### 2. Peer dependencies

Your project should use React 18+ and styled-components 6+.

## Available Components and How to Use Them

Below are usage examples as seen in the latest demo app:

### `<PractitionerCertificate />`

Handles practitioner certificate upload, decryption, and validation.

```html
import { PractitionerCertificate } from '@icure/cardinal-prescription-be-react'

<PractitionerCertificate
  certificateValid="{"
  isCertificateValid
  }
  certificateUploaded="{"
  isCertificateUploaded
  }
  errorWhileVerifyingCertificate="{"
  errorWhileVerifyingCertificate
  }
  onResetCertificate="{"
  onResetCertificate
  }
  onUploadCertificate="{"
  onUploadCertificate
  }
  onDecryptCertificate="{"
  onDecryptCertificate
  }
/>
```

### `<MedicationSearch />`

Medication search interface, backed by whichever `MedicationProvider` you pass in — SAM for Belgium or medINDEX
for Switzerland (see [Configure a medication provider](#configure-a-medication-provider)). Triggers an event when a
medication is selected for prescription.

```html
import { MedicationSearch, createMedicationProvider } from '@icure/cardinal-prescription-be-react'

const medicationProvider = createMedicationProvider({ country: 'be', sdk: cardinalBeSamInstance, deliveryEnvironment: 'P' })

<MedicationSearch medicationProvider="{medicationProvider}" onAddPrescription="{onCreatePrescription}" disableInputEventsTracking="{isPrescriptionModalOpen}" />
```

### `<PrescriptionList />`

Lists created prescriptions and exposes actions to send, modify, print, or delete them.

```html
import { PrescriptionList } from '@icure/cardinal-prescription-be-react'

<PrescriptionList
  prescribedMedications="{"
  prescriptions
  }
  handleDeletePrescription="{"
  onDeletePrescription
  }
  handleModifyPrescription="{"
  onModifyPrescription
  }
  handleSendPrescriptions="{"
  handleSendPrescriptions
  }
  handlePrintPrescriptions="{"
  handlePrintPrescriptions
  }
/>
```

### `<PrescriptionModal />`

Modal for creating or modifying prescriptions.

#### For creating:

```html
<PrescriptionModal onClose="{onClosePrescriptionModal}" onSubmit="{onSubmitCreatePrescription}" modalMood="create" medicationToPrescribe="{medicationToPrescribe}" />
```

#### For modifying:

```html
<PrescriptionModal onClose="{onClosePrescriptionModal}" onSubmit="{onSubmitModifyPrescription}" modalMood="modify" prescriptionToModify="{prescriptionToModify}" />
```

### `<PrescriptionPrintModal />`

Printable PDF view of prescriptions.

```html
import { PrescriptionPrintModal } from '@icure/cardinal-prescription-be-react' import { HealthcareParty, Patient } from '@icure/be-fhc-lite-api' // types for prescriber and patient

<PrescriptionPrintModal prescribedMedications="{prescriptions}" prescriber="{hcp}" patient="{patient}" closeModal="{onClosePrescriptionPrintModal}" />
```

## Available APIs

Alongside React components, the library exports key APIs for working directly with CardinalSDK and Free Health
Connector (FHC) for authentication,
and utility logic.

### Configure a medication provider

`MedicationSearch` (and any custom country flow you build with `MedicationCard`/`Button`) is driven by a
`MedicationProvider`, not a raw SDK instance. Build one with `createMedicationProvider`, picking the `country`:

```html
import { createMedicationProvider } from '@icure/cardinal-prescription-be-react'

// Belgium — wraps the SAM sdk instance (see "CardinalBeSam initialization" below)
const beProvider = createMedicationProvider({ country: 'be', sdk: cardinalBeSamInstance, deliveryEnvironment: 'P' })

// Switzerland — wraps a MedIndexClient from `@icure/medindex-sdk`
import { MedIndexClient } from '@icure/medindex-sdk'
const chProvider = createMedicationProvider({ country: 'ch', client: new MedIndexClient({ baseUrl: MEDINDEX_URL }) })
```

See [Switzerland (medINDEX) Support](#switzerland-medindex-support) for what the `ch` provider does and does not
cover.

### Work with SAM SDK

### CardinalBeSam initialization

#### Initialize the CardinalBeSam SDK by creating an instance that will be passed to other services.

```html
import { CardinalBeSamSdk, Credentials } from '@icure/cardinal-be-sam-sdk' const cardinalBeSamApi = await CardinalBeSamSdk.initialize( undefined, ICURE_URL, new
Credentials.UsernamePassword(practitionerCredentials.username, practitionerCredentials.password), ) setCardinalBeSamInstance(cardinalBeSamApi.sam)
```

#### Fetch the current SAM version:

```html
import { fetchSamVersion } from '@icure/cardinal-prescription-be-react' const samVersion = await fetchSamVersion(cardinalBeSamAInstance) // cardinalBeSamAInstance is an instance of
CardinalBeSamApi.sam (see demo)
```

### Set the active language

Set the library’s language (for UI and errors):

```html
import { cardinalLanguage } from '@icure/cardinal-prescription-be-react' // Available: 'en', 'fr', 'nl', 'de' cardinalLanguage.setLanguage('fr') const currentLang =
cardinalLanguage.getLanguage()
```

### Certificate management

#### Load and decrypt practitioner certificate information from browser storage:

```html
import { loadCertificateInformation } from '@icure/cardinal-prescription-be-react' const result = await loadCertificateInformation(hcpSsin) if (result) {
setCertificateUploaded(!!res) }
```

#### Upload and encrypt a new certificate:

```html
import { uploadAndEncryptCertificate } from '@icure/cardinal-prescription-be-react' await uploadAndEncryptCertificate(hcpSsin, passphrase, certificateArrayBuffer)
```

#### Delete a stored certificate:

```html
import { deleteCertificate } from '@icure/cardinal-prescription-be-react' await deleteCertificate(hcpSsin)
```

#### Validate a decrypted certificate:

```html
import { validateDecryptedCertificate } from '@icure/cardinal-prescription-be-react' const validation = await validateDecryptedCertificate(hcp, passphrase, FHC_URL) if
(validation.status) { // Certificate is valid } else { // validation.error contains error details (per language) }
```

### Prescription APIs

#### Send a prescription (“Recip-e”):

```html
import { sendRecipe } from '@icure/cardinal-prescription-be-react' const result = await sendRecipe( { vendor, // { vendorName, vendorEmail, vendorPhone } samPackage, // {
packageName, packageVersion } }, samVersion, // Fetched from SAM SDK hcp, // Healthcare professional object patient, // Patient object prescribedMedication, // Medication details
passphrase // Certificate passphrase FHC_URL // Free health connector url ) // result[0]?.rid contains the prescription RID if successful
```

## Switzerland (medINDEX) Support

Switzerland support is **medication search only this phase** — it swaps the medication data source, nothing else.
There is no Swiss prescription transmission, no reimbursement/cheap-alternatives concept, and no certificate
flow: `PrescriptionModal`, `PrescriptionList`, `PrescriptionPrintModal`, `sendRecipe`, and the certificate services
are all Belgium-only (they're built around `PrescribedMedicationType` and a SAM `sdk`). A host app builds its own
Swiss prescription drafting/printing UI, the way this repo's demo app does under its "Switzerland" tab.

- **Provider**: `createMedicationProvider({ country: 'ch', client })` (see
  [Configure a medication provider](#configure-a-medication-provider)), where `client` is a `MedIndexClient` from
  `@icure/medindex-sdk`.
- **Unified search**: a single query searches product/brand name, active substance (composition), and — when the
  query looks like an ATC code or class (`N02`, `N02BE01`, …) — the ATC index, merged and de-duplicated by product
  id. Pass `searchPlaceholder` to `<MedicationSearch />` to label the combined capability, e.g.:

  ```html
  <MedicationSearch medicationProvider="{chProvider}" onAddPrescription="{onAddChMedication}" disableInputEventsTracking="{false}" searchPlaceholder="{t('medication.search.unifiedLabel')}" />
  ```

- **Regulatory badges**: registered automatically for `ch` as soon as the library is imported (no app-level init
  call needed) — price (summary row), Swissmedic category, narcotic, cold chain, composition and interactions
  (detail row), GTIN and generic group (expanded panel).
- **Display atoms for your own flow**: `MedicationCard` and `Button` are exported so a host app can render a
  medication (with its badges) outside of the Belgium prescription components — e.g. in a drafted-prescriptions
  list. Pass `readOnly` to render the card without prescribe/expand actions:

  ```html
  <MedicationCard medication="{medication}" handleAddPrescription="{() => {}}" id="{`ch-draft-card-${draft.id}`}" readOnly />
  ```

- **Errors**: `findByLabel` rejects with `MedicationNotFoundError`, `MedicationSearchValidationError`, or
  `MedicationProviderUnavailableError` (same shared error types the SAM provider uses) rather than leaking
  medINDEX's own SDK error classes.

See the demo app's `SwitzerlandTab` (`packages/demo-app/src/tabs/SwitzerlandTab.tsx`) for a full working example.

## SAM and Recip-e requirements

When the prescriber selects a medication, this application integrates with the SAMv2 database to provide all up-to-date
metadata. This includes:

- Links to the leaflet & SPC.
- Special status indicators:
  - Black triangle (additional monitoring).
  - RMA material links.
  - DHPC communications.
  - Temporary supply problems.
  - End of commercialization or future commercialization.
  - VMP group information and switch statuses.
  - Conditions of delivery/prescription and risk minimization messages.
  - Reimbursement details (chapters, categories, extra reimbursement for youth contraception).

More information is available on the [SAM portal](https://www.samportal.be/nl/sam/documentation).

## Medications of interest for tests

#### Commercialization & supply problems

- `Polydexa 10 mg/ml`
- `Crestor`
- `Cisplatine Teva 1 mg/ml inf. sol. (conc.) i.v. vial 50 ml`

#### Future commercialization

- `Kaftrio` (black triangle)
- `Increlex` (black/orange triangle)

#### Doping status

- `Ultiva`
- `Rapifen`

#### Black triangle (additional monitoring), RMA

- `Increlex`

> **Note:**
> This module is built for integration with [Belgium’s SAM platform](https://www.samportal.be/nl/sam/documentation), is
> modular, and can be easily adapted for use in other medical solutions.

## Example: Demo Application

To see the full working version, you can clone the GitHub repository and run the included demo app.

```bash
https://github.com/icure/cardinal-prescription-react/tree/main/packages/demo-app
```

> Make sure to set up your .env variables or hardcode your credentials and HCP/Patient data for testing.

## 📦 Module format & requirements

This library ships ESM and CJS builds and depends on `@icure/cardinal-be-sam-sdk`,
which is **ESM-only**. Any modern bundler (Vite, webpack 5, Next.js, CRA) and
Node ≥ 20.19 / 22.12 (which support `require(esm)`) work out of the box. Peer
requirements: React 18+ and styled-components 6+.

## 🆕 0.1.0 — breaking changes & new features

### New features (parity with the Angular library)

- **Grouped medication search** — results are grouped by product (AMP) with
  nested packaging cards, powered by a lazy, k-way-merged medication loader.
- **Cheap alternatives** — when a non-cheap medication is picked, cheaper
  substitutes are offered in the prescription modal and can be swapped in.
- **Standard dosages** — SAM standard dosages for the medication's VMP group,
  filtered by a patient context (`standardDosageContext`), suggested in the modal.
- **Structured posology** — free-text dosage is parsed into FHC `regimen`
  (`RegimenItem[]`) in addition to `instructionForPatient`.
- **STS token caching** — the keystore uuid is cached in a `TokenStore` and
  reused instead of being re-uploaded on every send.

### Breaking changes

- SAM integration moved from `@icure/api` to **`@icure/cardinal-be-sam-sdk`**;
  component `sdk` props are now typed `SamV2Api`.
- `MedicationSearch` `onAddPrescription` now receives
  `(medication, cheapAlternatives)`.
- `PrescriptionModal` requires new props: `sdk`, and optionally
  `alternativeCheapMedications` and `standardDosageContext`.
- `sendRecipe` / `verifyCertificateWithSts` / `validateDecryptedCertificate`
  take a `cache: TokenStore` argument (create one with
  `createIndexedDbTokenStore()`); `verifyCertificateWithSts` no longer takes a
  keystore `ArrayBuffer`.
- `CertificateValidationResultType` is trimmed to `{ status, error? }`.
- `MedicationType.standardDosage` was removed (standard dosages now travel via
  `MedicationType.vmpGroup.standardDosage`); `findMedicationsByLabel` returns the
  SDK's `PaginatedListIterator<T>`.
- Internal types and translation dictionaries are no longer exported — only the
  documented public surface is.

## 🆕 Since 0.1.0 — Swiss (medINDEX) medication search

- **Country-configurable medication provider** — `MedicationSearch` now takes a `medicationProvider` prop (a
  `MedicationProvider`, see [Configure a medication provider](#configure-a-medication-provider)) instead of a raw
  `sdk`/`deliveryEnvironment` pair. Build one with `createMedicationProvider({ country: 'be' | 'ch', ... })`.
- **`MedIndexMedicationProvider`** — a `MedicationProvider` backed by `@icure/medindex-sdk`, with a unified
  name/substance/ATC search. See [Switzerland (medINDEX) Support](#switzerland-medindex-support).
- **Country-blind regulatory badge registry** (`registerRegulatoryBadge`/`getRegulatoryBadges`) — `be` and `ch`
  badge sets both register themselves as a side effect of importing the library.
- **`MedicationCard` and `Button`** are now exported as standalone display atoms, for host apps assembling their
  own country-specific flow around a `MedicationProvider` (as the Swiss demo tab does).
- This is additive to Belgium: `PrescriptionModal`/`PrescriptionList`/`PrescriptionPrintModal`/`sendRecipe`/
  certificate management are unchanged and remain Belgium-only.

See [TESTING.md](../../TESTING.md) for the test setup.
