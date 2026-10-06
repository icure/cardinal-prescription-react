# Cardinal Prescription React Component 🇧🇪🇨🇭

This started as a **Belgian-specific** React library for healthcare professionals to **manage electronic
prescriptions**, and now also ships **Swiss medication search** powered by medINDEX. It integrates iCure's APIs —
`@icure/be-fhc-lite-api`, `@icure/cardinal-be-sam-sdk` (SAM, Belgium), `@icure/medindex-sdk` (medINDEX, Switzerland)
and `@icure/medication-sdk` — to streamline:

- 🔐 Practitioner certificate management (Belgium)
- 🔍 Medication search — SAM (Belgium) or medINDEX (Switzerland), behind one country-configurable provider
- 📝 Electronic prescription creation & editing (Belgium)
- 🧾 Prescription overview & sending (Belgium)
- 🖨 Printing of prescriptions (Belgium)

> 💡**Note:**
> Belgium integration targets [Belgium’s SAM platform](https://www.samportal.be/nl/sam/documentation) and Recip-e.
> Switzerland support is medication search only this phase — see
> [`packages/cardinal-prescription-be-react/README.md`](packages/cardinal-prescription-be-react/README.md#switzerland-medindex-support)
> for the full API and its scope. Both can be embedded into other medical software projects as a drop-in feature.

## 📚Table of Contents

- [About iCure and Cardinal](#about-icure-and-cardinal)
- [Features](#features)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Available Components and How to Use Them](#available-components-and-how-to-use-them)
- [Theming, dark mode and a custom posology editor](#theming-dark-mode-and-a-custom-posology-editor)
- [Available APIs](#available-apis)
- [SAM and Recip-e Requirements](#sam-and-recip-e-requirements)
- [Medications of Interest for Tests](#medications-of-interest-for-tests)
- [Example Demo Application](#example-demo-application)

## 🏢About iCure and Cardinal

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

## ✨Features

- 🇧🇪 Designed for Belgian healthcare professionals, with 🇨🇭 Swiss medication search alongside it
- 🔐 Practitioner certificate upload & verification (Belgium)
- 🔍 Medication search powered by iCure's SAM SDK (Belgium) or medINDEX (Switzerland), selected via one
  `createMedicationProvider({ country: 'be' | 'ch', ... })` call
- 🔎 Unified Swiss search over product/brand name, active substance, and ATC code/class in a single query
- 🏷 Country-blind regulatory badge registry — SAM badges (Belgium) and medINDEX badges (Switzerland) render
  automatically, no app-level setup
- 📝 Create, edit, list, send, and print prescriptions (Belgium)
- 🧠 Structured and unstructured posology support (Belgium)
- 📜 Interacts with Recip-e to send prescriptions (Belgium)
- 🧩 Ready to integrate into medical apps
- 💾 Secure certificate storage in browser (Belgium)
- 🌍 Fully internationalized (French, Dutch, German, English)

## 🧰Technologies

- **React 18+**
- **iCure SDKs** (`@icure/be-fhc-lite-api`, `@icure/cardinal-be-sam-sdk` for SAM/Belgium, `@icure/medindex-sdk` for
  medINDEX/Switzerland, `@icure/medication-sdk`)
- **TypeScript**
- **React Hook Form** for forms
- **Styled-components** for UI styling
- **UUID** for unique identifiers
- **jsBarcode** for barcode generation

## 🛠Prerequisites

Before starting, make sure you have:

- **Node.js v16+** and **Yarn** or **npm** installed
- A **valid Belgian practitioner certificate file** to load into the app
- **Practitioner credentials** for iCure authentication (generated in your app using `@icure/cardinal-sdk` or via iCure
  Cockpit for test purposes):
  - [Create a HCP in Cockpit](https://docs.icure.com/cockpit/how-to/how-to-manage-hcp#creating-an-hcp)
  - [Generate the authentication token for the HCP](https://docs.icure.com/cockpit/how-to/how-to-manage-hcp#generating-an-authentication-token)
- **Patient** and **healthcare professional** information to populate prescriptions

## 🚀Getting Started

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

## 🧩Available Components and How to Use Them

Below are usage examples as seen in the latest demo app:

### 🧾`<PractitionerCertificate />`

Handles practitioner certificate upload, decryption, and validation.

```jsx
import { PractitionerCertificate } from '@icure/cardinal-prescription-be-react'
;<PractitionerCertificate
  certificateValid={isCertificateValid}
  certificateUploaded={isCertificateUploaded}
  errorWhileVerifyingCertificate={errorWhileVerifyingCertificate}
  onResetCertificate={onResetCertificate}
  onUploadCertificate={onUploadCertificate}
  onDecryptCertificate={onDecryptCertificate}
/>
```

### 💊`<MedicationSearch />`

Medication search interface, backed by whichever `MedicationProvider` you pass in — SAM for Belgium or medINDEX
for Switzerland. Triggers an event when a medication is selected for prescription.

```jsx
import { MedicationSearch, createMedicationProvider } from '@icure/cardinal-prescription-be-react'

const medicationProvider = createMedicationProvider({ country: 'be', sdk: cardinalSdkInstance, deliveryEnvironment: 'P' })
;<MedicationSearch medicationProvider={medicationProvider} onAddPrescription={onCreatePrescription} disableInputEventsTracking={isPrescriptionModalOpen} />
```

> See [the library's README](packages/cardinal-prescription-be-react/README.md#switzerland-medindex-support) for
> the `country: 'ch'` (medINDEX) variant and its scope.

### 📋`<PrescriptionList />`

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

### 📝`<PrescriptionModal />`

Modal for creating or modifying prescriptions.

#### For creating:

```html
<PrescriptionModal onClose="{onClosePrescriptionModal}" onSubmit="{onSubmitCreatePrescription}" modalMood="create" medicationToPrescribe="{medicationToPrescribe}" />
```

#### For modifying:

```html
<PrescriptionModal onClose="{onClosePrescriptionModal}" onSubmit="{onSubmitModifyPrescription}" modalMood="modify" prescriptionToModify="{prescriptionToModify}" />
```

### 🖨`<PrescriptionPrintModal />`

Printable PDF view of prescriptions.

```html
import { PrescriptionPrintModal } from '@icure/cardinal-prescription-be-react' import { HealthcareParty, Patient } from '@icure/be-fhc-lite-api' // types for prescriber and patient

<PrescriptionPrintModal prescribedMedications="{prescriptions}" prescriber="{hcp}" patient="{patient}" closeModal="{onClosePrescriptionPrintModal}" />
```

## 🎨Theming, dark mode and a custom posology editor

Since 0.2.0 the components inject no global CSS, read every visual value from a `--cp-*` CSS custom property (with the
library's value as the fallback), offer opt-in dark defaults (`data-cp-theme="dark" | "auto"`), size every control to
44 px on touch screens, and `PrescriptionModal` accepts a `posologyEditor` component in place of its free-text posology
field. The package README ([`packages/cardinal-prescription-be-react/README.md`](packages/cardinal-prescription-be-react/README.md),
sections "Theming" and "Custom posology editor") lists every property and documents the editor interface.

## 🧠Available APIs

Alongside React components, the library exports key APIs for working directly with CardinalSDK and Free Health
Connector (FHC) for authentication,
and utility logic.

### 🌐Set the active language

Set the library’s language (for UI and errors):

```html
import { cardinalLanguage } from '@icure/cardinal-prescription-be-react' // Available: 'en', 'fr', 'nl', 'de' cardinalLanguage.setLanguage('fr') const currentLang =
cardinalLanguage.getLanguage()
```

### 🗝️Certificate management

#### 🔍Load and decrypt practitioner certificate information from browser storage:

```html
import { loadCertificateInformation } from '@icure/cardinal-prescription-be-react' const result = await loadCertificateInformation(hcpSsin) if (result) {
setCertificateUploaded(!!res) }
```

#### ⬆️Upload and encrypt a new certificate:

```html
import { uploadAndEncryptCertificate } from '@icure/cardinal-prescription-be-react' await uploadAndEncryptCertificate(hcpSsin, passphrase, certificateArrayBuffer)
```

#### 🗑️Delete a stored certificate:

```html
import { deleteCertificate } from '@icure/cardinal-prescription-be-react' await deleteCertificate(hcpSsin)
```

#### ✅ Validate a decrypted certificate:

```html
import { validateDecryptedCertificate } from '@icure/cardinal-prescription-be-react' const validation = await validateDecryptedCertificate(hcp, passphrase) if (validation.status) {
// Certificate is valid } else { // validation.error contains error details (per language) }
```

### 📝Prescription APIs

#### 📤Send a prescription (“Recip-e”):

```html
import { sendRecipe } from '@icure/cardinal-prescription-be-react' const result = await sendRecipe( { vendor, // { vendorName, vendorEmail, vendorPhone } samPackage, // {
packageName, packageVersion } }, samVersion, // Fetched from SAM SDK hcp, // Healthcare professional object patient, // Patient object prescribedMedication, // Medication details
passphrase // Certificate passphrase ) // result[0]?.rid contains the prescription RID if successful
```

### 🔄Work with SAM SDK

#### ℹ️Fetch the current SAM version:

```html
import { fetchSamVersion } from '@icure/cardinal-prescription-be-react' const samVersion = await fetchSamVersion(samSdkInstance) // samSdkInstance is an instance of
CardinalBeSamApi.sam (see demo)
```

## 📜SAM and Recip-e requirements

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

## 🧪Medications of interest for tests

#### 🚨Commercialization & supply problems

- `Polydexa 10 mg/ml`
- `Crestor`
- `Cisplatine Teva 1 mg/ml inf. sol. (conc.) i.v. vial 50 ml`

#### 📅Future commercialization

- `Kaftrio` (black triangle)
- `Increlex` (black/orange triangle)

#### 🧬Doping status

- `Ultiva`
- `Rapifen`

#### ⚠️Black triangle (additional monitoring), RMA

- `Increlex`

> 💡**Note:**
> This module is built for integration with [Belgium’s SAM platform](https://www.samportal.be/nl/sam/documentation), is
> modular, and can be easily adapted for use in other medical solutions.

## 📦Example: Demo Application

To see the full working version, you can clone the GitHub repository and run the included demo app.

```bash
git clone https://github.com/icure/cardinal-prescription-react
cd cardinal-prescription-react
yarn install
yarn start
```

> Make sure to set up your .env variables or hardcode your credentials and HCP/Patient data for testing.

The demo app has a **Belgium** tab (certificate + SAM + Recip-e, as documented above) and a **Switzerland** tab
(medINDEX medication search only, no certificate/auth needed). The Switzerland tab needs a medINDEX server
reachable at `VITE_MEDINDEX_URL` (defaults to `http://localhost:8080/rest/v2/medindex`) — see
[`packages/demo-app/README.md`](packages/demo-app/README.md) for the full `.env.local` setup.

## 🆕 Update & Republish the Library

1. After making changes:

Bump version in package.json (e.g., "version": "1.0.1").

2. Rebuild:

```bash
yarn build
```

3. Go to dist/... folder and publish again:

```bash
cd packages/cardinal-prescription-be-react

npm publish
```
