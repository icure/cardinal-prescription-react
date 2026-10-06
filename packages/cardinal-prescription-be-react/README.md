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
- [Theming](#theming)
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

#### Custom posology editor (`posologyEditor`)

By default the modal offers a free-text posology field with parser suggestions and SAM standard dosages; the text is
parsed into an FHC regimen at submit time. A host can replace that field with its own editor (a visual posology
module, for instance) through the optional `posologyEditor` prop, a React component receiving `PosologyEditorProps`:

```tsx
import type { PosologyEditorProps } from '@icure/cardinal-prescription-be-react'

const MyPosologyEditor = ({ id, label, value, context, onChange, errorMessage, errorMessageId }: PosologyEditorProps) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <input id={id} value={value.text} aria-invalid={!!errorMessage} aria-describedby={errorMessageId}
      onChange={(e) => onChange({ regimen: value.regimen, text: e.target.value })} />
    {/* ... build value.regimen (FHC RegimenItem[]) from context.medication, context.standardDosages ... */}
  </div>
)

<PrescriptionModal sdk={sam} medicationToPrescribe={medication} modalMood="create" onClose={close} onSubmit={submit}
  posologyEditor={MyPosologyEditor} />
```

| Prop | Type | Meaning |
|---|---|---|
| `id` | `string` | Id for the editor's main control (`dosage`), so the label and validation target it. |
| `label` | `string` | Translated field label; the editor renders it. |
| `value` | `{ regimen: RegimenItem[]; text: string }` | Current posology: the regimen (`@icure/be-fhc-lite-api` `RegimenItem[]`) and text of the prescription being modified, or `{ regimen: [], text: '' }`. |
| `context.medication` | `MedicationType \| undefined` | The product being prescribed (undefined when modifying a free-text prescription). |
| `context.prescriptionToModify` | `PrescribedMedicationType \| undefined` | The prescription being modified. |
| `context.language` | `'fr' \| 'nl' \| 'de' \| 'en'` | Current library language. |
| `context.standardDosages` | `RegimenItem[]` (`@icure/medication-sdk`) | SAM standard dosages of the product's VMP group, filtered by `standardDosageContext`. |
| `context.standardDosageContext` | `StandardDosageContext \| undefined` | The patient context passed to the modal. |
| `onChange` | `(value: PosologyEditorValue) => void` | Call on every change. |
| `errorMessage` / `errorMessageId` | `string \| undefined` / `string` | The modal's validation message (a posology is required), shown below the editor in the element with `errorMessageId`. |

On submit the modal sends the editor's `text` as `Medication.instructionForPatient` and its `regimen` as
`Medication.regimen`, **as returned** (the text is not re-parsed; an empty regimen means a text-only posology and is
sent as no regimen). With a slot, the library's own free-text field, suggestions and standard-dosage panel are not
rendered: the standard dosages reach the editor through `context`. The editor is rendered inside a wrapper carrying
`data-cp-slot`, which the library's scoped reset skips, so the host's own styles apply unchanged inside it. Without the
prop, nothing changes.

### `<PrescriptionPrintModal />`

Printable PDF view of prescriptions.

```html
import { PrescriptionPrintModal } from '@icure/cardinal-prescription-be-react' import { HealthcareParty, Patient } from '@icure/be-fhc-lite-api' // types for prescriber and patient

<PrescriptionPrintModal prescribedMedications="{prescriptions}" prescriber="{hcp}" patient="{patient}" closeModal="{onClosePrescriptionPrintModal}" />
```

## Theming

Every visual value of the public components (typography, control heights, radii, critical / caution / ok states,
surfaces, borders, buttons and icons) reads a CSS custom property with the library's own value as its fallback, for
example `var(--cp-color-surface, #ffffff)`. A host skins the library by setting `--cp-*` properties on any ancestor;
the library's class names are not a contract. All properties share the `--cp-` prefix, and `themeTokens` (exported)
lists them at runtime.

```css
/* e.g. in the host's stylesheet */
:root {
  --cp-font-family: 'Atkinson Hyperlegible Next', sans-serif;
  --cp-color-surface: var(--surface);
  --cp-color-text: var(--text);
  --cp-color-primary: var(--accent);
  --cp-input-height: 28px;
}
```

Some properties default to another one (`follows` in the table): `--cp-button-primary-background` follows
`--cp-color-primary`, so setting the colour restyles the button unless the host sets the button property too.

**No global styles.** No component injects page-wide CSS: the reset the library needs is scoped to its own roots
(each public component's root element carries the `cp-root` class), with the specificity a global reset would have, so
the host's focus ring, `body` font and background and list bullets are untouched. Elements a host renders inside a
library component (the `posologyEditor` slot) sit under `data-cp-slot` and are left out of that reset. Each root sets
its own text colour and font, so it never inherits the host's.

**Dark mode** is opt-in, so existing hosts see no change: put `data-cp-theme="dark"` on a library root or any ancestor
for the built-in dark defaults, or `data-cp-theme="auto"` to follow `prefers-color-scheme`. Properties the host sets
always win over the built-in dark defaults (they live in a private `--cp-dark-*` layer that hosts should not set), so a
host with its own light and dark tokens simply maps them and needs no attribute. The printed prescription stays on
white paper (`--cp-color-paper`) and barcodes stay black on white.

**Target sizes** (WCAG 2.5.8 / 2.5.5): every control is at least 44 x 44 px on a touch screen. Only a fine pointer that
can hover (`@media (hover: hover) and (pointer: fine)`, a mouse or a trackpad) gets compact controls: buttons
`--cp-control-height` (32 px), text inputs and selects `--cp-input-height` (32 px, set it to 28 px for a denser host),
and small controls (close buttons, radios, icon buttons) `--cp-target-size-min` (24 px). When no media query matches,
the safe 44 px (`--cp-target-size-coarse`) applies.

<!-- theme-tokens:start -->
| Property | Default (light) | Built-in dark default | Used for |
|---|---|---|---|
| `--cp-font-family` | `'Lato', sans-serif` | — | Font of every library text. |
| `--cp-font-family-control` | `'Inter Variable', sans-serif` | — | Font of text inputs, selects and the posology suggestions. |
| `--cp-font-size-root` | `16px` | — | Base font size of each library root. |
| `--cp-font-size-2xs` | `11px` | — | Badges. |
| `--cp-font-size-xs` | `12px` | — | Field captions, RID badge, "more" links. |
| `--cp-font-size-sm` | `13px` | — | Error messages, cheap alternatives, standard dosages, composition. |
| `--cp-font-size-md` | `14px` | — | Body text, labels, inputs, buttons. |
| `--cp-font-size-lg` | `16px` | — | Card and modal titles. |
| `--cp-font-size-xl` | `18px` | — | Printed prescription title. |
| `--cp-control-height` | `32px` | — | Height of buttons under a fine pointer (mouse). |
| `--cp-input-height` | `32px` (follows `--cp-control-height`) | — | Height of text inputs and selects under a fine pointer. |
| `--cp-target-size-min` | `24px` | — | Minimum size of small controls (close buttons, radios, icon buttons) under a fine pointer (WCAG 2.5.8). |
| `--cp-target-size-coarse` | `44px` | — | Size of every control on a touch screen or whenever the pointer is not a fine, hovering one. |
| `--cp-radius-xs` | `4px` | — | Suggestion items, close buttons, RID badge. |
| `--cp-radius-sm` | `5px` | — | Regulatory badges. |
| `--cp-radius-md` | `6px` | — | Inputs, buttons, medication and prescription cards. |
| `--cp-radius-lg` | `8px` | — | Prescription list and printed document. |
| `--cp-radius-xl` | `12px` | — | Modal sections, alerts, certificate form. |
| `--cp-radius-pill` | `999px` | — | Toggle switch and cheap badges. |
| `--cp-color-surface` | `#ffffff` | `#1b1f27` | Cards, modal header and footer, inputs, popups. |
| `--cp-color-surface-sunken` | `#f9fbfe` | `#12151b` | Modal body, expanded card, prescription rows. |
| `--cp-color-surface-accent` | `#eef6fe` | `#1d2a3a` | Search results panel, focused suggestion. |
| `--cp-color-surface-accent-subtle` | `#f2f8fd` | `#18212d` | Collapsible panel headers (cheap alternatives, standard dosages) and their hovered items. |
| `--cp-color-surface-disabled` | `#f5f5f5` | `#2a2f38` | Disabled inputs and buttons. |
| `--cp-color-overlay` | `rgba(8, 75, 131, 0.3)` | `rgba(0, 0, 0, 0.6)` | Backdrop behind the modals. |
| `--cp-color-paper` | `#ffffff` | — | Printed prescription background (stays white in dark mode). |
| `--cp-color-paper-text` | `#000000` | — | Printed prescription text. |
| `--cp-color-text` | `#1d2235` | `#e6e9ef` | Default text, titles, labels. |
| `--cp-color-text-strong` | `#000000` | `#ffffff` | Field values in the medication card. |
| `--cp-color-text-muted` | `#4b6682` | `#a9b8c9` | Field captions in the medication card. |
| `--cp-color-text-subtle` | `#6b6b69` | `#a0a4ab` | Secondary text: empty results, excipients, extra-fields preview, disabled buttons. |
| `--cp-color-placeholder` | `#687583` | `#8b95a1` | Input placeholders. |
| `--cp-color-link` | `#2a6fa8` | `#8cc3f2` | Links and accent text (panel headers). |
| `--cp-color-price` | `#b5470f` | `#ffa36b` | Price in the medication card. |
| `--cp-color-border` | `#e4e4e7` | `#343a45` | Section and list borders, dividers. |
| `--cp-color-border-strong` | `#cad0d5` | `#4b5360` | Input and secondary button borders. |
| `--cp-color-border-accent` | `#dce7f2` | `#2c3a4b` | Medication and prescription card borders, collapsible panels. |
| `--cp-color-border-control` | `#848482` | `#8b95a1` | Radio button ring. |
| `--cp-color-primary` | `#084b83` | `#7ab6ea` | Primary actions, checked controls, focused borders. |
| `--cp-color-on-primary` | `#ffffff` | `#0b1a2b` | Text on the primary colour. |
| `--cp-color-accent` | `#3d87c5` | `#6fa8dc` | Hovered and focused cards, tooltip border, dividers in the expanded card. |
| `--cp-color-accent-soft` | `#add5ff` | `#2c4a6b` | Outlined regulatory badges, composition title. |
| `--cp-color-focus-halo` | `rgba(61, 135, 197, 0.2)` | `rgba(111, 168, 220, 0.35)` | Halo around focused or hovered inputs and controls. |
| `--cp-color-hover-halo` | `rgba(61, 135, 197, 0.3)` | `rgba(111, 168, 220, 0.35)` | Halo around hovered or focused cards. |
| `--cp-color-focus-ring` | `#3d87c5` | `#8cc3f2` | Keyboard focus outline (`:focus-visible`). |
| `--cp-color-critical` | `#c40000` | `#ff7b72` | Errors: messages, invalid borders, required asterisk, delete hover. |
| `--cp-color-critical-surface` | `#fff1f0` | `#3a1d1f` | Error alert background. |
| `--cp-color-critical-soft` | `#ffccc7` | `#5a2a2d` | Error alert border, critical regulatory badges and titles. |
| `--cp-color-caution` | `#a35f00` | — | Caution badges (interactions, delivery conditions) and the interactions title, under white text. |
| `--cp-color-caution-soft` | `#ffda83` | `#4d3d14` | Caution regulatory badges and titles. |
| `--cp-color-ok` | `#1e7e46` | — | Reimbursement badge, cheapest badge, under white text. |
| `--cp-color-ok-strong` | `#237804` | — | Cheap badge, prescription RID badge, under white text. |
| `--cp-color-ok-surface` | `#f6ffed` | `#1b2e1b` | Success alert background. |
| `--cp-color-ok-surface-alt` | `#e5fae5` | `#183222` | Sent prescription row. |
| `--cp-color-ok-soft` | `#b7eb8f` | `#2f5a2f` | Success alert border, ok regulatory badges and titles. |
| `--cp-color-ok-border` | `#008000` | `#3fb873` | Sent prescription row border. |
| `--cp-color-neutral` | `#5f6360` | — | Neutral badges (cold chain, not reimbursed), under white text. |
| `--cp-color-critical-strong` | `#c40000` | — | Critical badges (prescription conditions), under white text. |
| `--cp-color-on-badge` | `#ffffff` | — | Text on the critical, caution, ok and neutral badges. |
| `--cp-shadow-popup` | `0 9px 28px 0 rgba(0, 0, 0, 0.05), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px 0 rgba(0, 0, 0, 0.12)` | `0 9px 28px 0 rgba(0, 0, 0, 0.4), 0 6px 16px 0 rgba(0, 0, 0, 0.5), 0 3px 6px 0 rgba(0, 0, 0, 0.6)` | Shadow of the posology suggestions and the search results panel. |
| `--cp-shadow-section` | `0 1px 1px 0 rgba(218, 218, 222, 0.25)` | `none` | Shadow of the extra-fields preview. |
| `--cp-button-primary-background` | `#084b83` (follows `--cp-color-primary`) | — | Primary button background and border. |
| `--cp-button-primary-text` | `#ffffff` (follows `--cp-color-on-primary`) | — | Primary button text. |
| `--cp-button-secondary-background` | `#fcfcfd` | `#1b1f27` | Outlined button background. |
| `--cp-button-secondary-text` | `#084b83` (follows `--cp-color-primary`) | — | Outlined button text. |
| `--cp-button-secondary-border` | `#cad0d5` (follows `--cp-color-border-strong`) | — | Outlined button border. |
| `--cp-button-radius` | `6px` (follows `--cp-radius-md`) | — | Button corner radius. |
| `--cp-icon-info` | `#3d87c5` | `#6fa8dc` | Information icons, chevrons, spinner of the search. |
| `--cp-icon-critical` | `#ee1313` | `#ff6b63` | End of commercialisation, narcotic. |
| `--cp-icon-caution` | `#ff5e00` | `#ff8a3d` | Supply problems, orange triangle. |
| `--cp-icon-caution-alt` | `#efac2f` | — | Composition (molecule). |
| `--cp-icon-ok` | `#09853d` | `#3fb873` | Start of commercialisation. |
| `--cp-icon-ok-alt` | `#197437` | `#3fb873` | Generic group (leaf). |
| `--cp-icon-success` | `#52c41a` | — | Success alert. |
| `--cp-icon-error` | `#ff4d4f` | — | Error alert. |
| `--cp-icon-neutral` | `#000000` | `#e6e9ef` | Black triangle, pill bottle, prescription icon, default spinner. |
| `--cp-icon-muted` | `#9ca8b2` | `#8b95a1` | Search magnifier. |
| `--cp-icon-close` | `#4b6682` | `#a9b8c9` | Close cross of the modals. |
| `--cp-icon-action` | `#383a3c` | `#c9ced6` | Edit and delete icons of the prescription rows. |
<!-- theme-tokens:end -->

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

## 🆕 0.2.0 — theming, accessibility, posology editor slot

- **No global reset** — the components no longer inject a page-wide `createGlobalStyle`; the reset is scoped to the
  library's own roots. Hosts that relied on the library's global reset (Lato 16 px on `body`, no list bullets, no focus
  outline on the whole page) now keep their own page styles.
- **Theming** — every value reads a `--cp-*` custom property (see [Theming](#theming)); opt-in dark mode with
  `data-cp-theme="dark" | "auto"`; 44 px controls on touch screens.
- **Accessibility (WCAG 2.2 AA, axe)** — named close, edit, delete and expand buttons; the modal is a labelled
  `dialog`; the posology field is an ARIA combobox with a `listbox` of `option`s (no more `role="listbox"` on the form
  body); the extra-fields switch is labelled; radios are keyboard-focusable; required asterisks are hidden from
  screen readers; field errors are linked with `aria-describedby`; text and badge colours meet 4.5:1 (some default
  colours changed slightly, e.g. links `#2a6fa8`, badges, price, error red `#c40000`).
- **`posologyEditor` slot** on `PrescriptionModal` — see [Custom posology editor](#custom-posology-editor-posologyeditor).
- **Dependencies** — `@icure/be-fhc-lite-api` is now a range (`^0.6.16`), `@icure/medication-sdk` `^0.0.25`,
  `styled-components` `^6.5.3`, `uuid` `^11.1.1`. Importing the library no longer opens the `certificate-store`
  IndexedDB database (it is opened on first use).

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
