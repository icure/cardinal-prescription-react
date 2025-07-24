# Cardinal Prescription React Component 🇧🇪

This is a **Belgian-specific** React library for healthcare professionals to **manage electronic prescriptions**.  
It integrates iCure's APIs —  `@icure/be-fhc-lite-api`, `@icure/api`, and `@icure/medication-sdk` — to
streamline:

- 🔐 Practitioner certificate management
- 🔍 Medication search
- 📝 Electronic prescription creation & editing
- 🧾 Prescription overview & sending
- 🖨 Printing of prescriptions

> 💡**Note:**
> This library is designed for integration with [Belgium’s SAM platform](https://www.samportal.be/nl/sam/documentation)
> and can easily be embedded into other medical software projects as a drop-in feature for prescription management.

## 📚Table of Contents

- [About iCure and Cardinal](#about-icure-and-cardinal)
- [Features](#features)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Available Components and How to Use Them](#available-components-and-how-to-use-them)
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
interoperability features. *In this project, we do not use the Cardinal backend directly — we integrate with iCure's
public API to access its SAM and Free Health Connector (FHC) features.*

[Free Health Connector (FHC)](https://icure.com/en/products/cardinal-free-health-connector/)
The Cardinal Free Health Connector (FHC) is iCure’s open-source implementation of Belgium’s eHealth infrastructure. It
enables secure, standards-based connections to government and regional healthcare systems

## ✨Features

- 🇧🇪 Designed specifically for Belgian healthcare professionals
- 🔐 Practitioner certificate upload & verification
- 🔍 Medication search powered by iCure's SAM SDK
- 📝 Create, edit, list, send, and print prescriptions
- 🧠 Structured and unstructured posology support
- 📜 Interacts with Recip-e to send prescriptions
- 🧩 Ready to integrate into medical apps
- 💾 Secure certificate storage in browser
- 🌍 Fully internationalized (French, Dutch, German, English)

## 🧰Technologies

- **React 18+**
- **iCure SDKs** (`@icure/be-fhc-lite-api`, `@icure/api`, `@icure/medication-sdk`)
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

<
PractitionerCertificate
certificateValid = { isCertificateValid }
certificateUploaded = { isCertificateUploaded }
errorWhileVerifyingCertificate = { errorWhileVerifyingCertificate }
onResetCertificate = { onResetCertificate }
onUploadCertificate = { onUploadCertificate }
onDecryptCertificate = { onDecryptCertificate }
/>
```

### 💊`<MedicationSearch />`

Medication search interface using SAM. Triggers an event when a medication is selected for prescription.

```jsx
import { MedicationSearch } from '@icure/cardinal-prescription-be-react'

<
MedicationSearch
sdk = { cardinalSdkInstance }
deliveryEnvironment = "P"
onAddPrescription = { onCreatePrescription }
disableInputEventsTracking = { isPrescriptionModalOpen }
/>
```

### 📋`<PrescriptionList />`

Lists created prescriptions and exposes actions to send, modify, print, or delete them.

```html
import { PrescriptionList } from '@icure/cardinal-prescription-be-react'

<PrescriptionList
  prescribedMedications={ prescriptions }
  handleDeletePrescription={ onDeletePrescription }
  handleModifyPrescription={ onModifyPrescription }
  handleSendPrescriptions={ handleSendPrescriptions }
  handlePrintPrescriptions={ handlePrintPrescriptions }
/>
```

### 📝`<PrescriptionModal />`

Modal for creating or modifying prescriptions.

#### For creating:

```html

<PrescriptionModal
  onClose={onClosePrescriptionModal}
  onSubmit={onSubmitCreatePrescription}
  modalMood="create"
  medicationToPrescribe={medicationToPrescribe}
/>
```

#### For modifying:

```html

<PrescriptionModal
  onClose={onClosePrescriptionModal}
  onSubmit={onSubmitModifyPrescription}
  modalMood="modify"
  prescriptionToModify={prescriptionToModify}
/>
```

### 🖨`<PrescriptionPrintModal />`

Printable PDF view of prescriptions.

```html
import { PrescriptionPrintModal } from '@icure/cardinal-prescription-be-react'
import { HealthcareParty, Patient } from '@icure/be-fhc-lite-api' // types for prescriber and patient

<PrescriptionPrintModal
  prescribedMedications={prescriptions}
  prescriber={hcp}
  patient={patient}
  closeModal={onClosePrescriptionPrintModal}
/>
```

## 🧠Available APIs

Alongside React components, the library exports key APIs for working directly with CardinalSDK and Free Health
Connector (FHC) for authentication,
and utility logic.

### 🌐Set the active language

Set the library’s language (for UI and errors):

```html
import { cardinalLanguage } from '@icure/cardinal-prescription-be-react'

// Available: 'en', 'fr', 'nl', 'de'
cardinalLanguage.setLanguage('fr')
const currentLang = cardinalLanguage.getCurrentLanguage()
```

### 🗝️Certificate management

#### 🔍Load and decrypt practitioner certificate information from browser storage:

```html
import { loadCertificateInformation } from '@icure/cardinal-prescription-be-react'

const result = await loadCertificateInformation(hcpSsin)
if (result) {
setCertificateUploaded(!!res)
}
```

#### ⬆️Upload and encrypt a new certificate:

```html
import { uploadAndEncryptCertificate } from '@icure/cardinal-prescription-be-react'

await uploadAndEncryptCertificate(hcpSsin, passphrase, certificateArrayBuffer)
```

#### 🗑️Delete a stored certificate:

```html
import { deleteCertificate } from '@icure/cardinal-prescription-be-react'

await deleteCertificate(hcpSsin)
```

#### ✅ Validate a decrypted certificate:

```html
import { validateDecryptedCertificate } from '@icure/cardinal-prescription-be-react'

const validation = await validateDecryptedCertificate(hcp, passphrase)
if (validation.status) {
// Certificate is valid
} else {
// validation.error contains error details (per language)
}
```

### 📝Prescription APIs

#### 📤Send a prescription (“Recip-e”):

```html
import { sendRecipe } from '@icure/cardinal-prescription-be-react'

const result = await sendRecipe(
{
vendor,                   // { vendorName, vendorEmail, vendorPhone }
samPackage,               // { packageName, packageVersion }
},
samVersion,               // Fetched from SAM SDK
hcp,                      // Healthcare professional object
patient,                  // Patient object
prescribedMedication,     // Medication details
passphrase                // Certificate passphrase
)
// result[0]?.rid contains the prescription RID if successful
```

### 🔄Work with SAM SDK

#### ℹ️Fetch the current SAM version:

```html
import { fetchSamVersion } from '@icure/cardinal-prescription-be-react'

const samVersion = await fetchSamVersion(samSdkInstance)
// samSdkInstance is an instance of CardinalBeSamApi.sam (see demo)
```

## 📜SAM and Recip-e requirements

When the prescriber selects a medication, this application integrates with the SAMv2 database to provide all up-to-date
metadata. This includes:

* Links to the leaflet & SPC.
* Special status indicators:

    * Black triangle (additional monitoring).
    * RMA material links.
    * DHPC communications.
    * Temporary supply problems.
    * End of commercialization or future commercialization.
    * VMP group information and switch statuses.
    * Conditions of delivery/prescription and risk minimization messages.
    * Reimbursement details (chapters, categories, extra reimbursement for youth contraception).

More information is available on the [SAM portal](https://www.samportal.be/nl/sam/documentation).

## 🧪Medications of interest for tests

#### 🚨Commercialization & supply problems

* `Polydexa 10 mg/ml`
* `Crestor`
* `Cisplatine Teva 1 mg/ml inf. sol. (conc.) i.v. vial 50 ml`

#### 📅Future commercialization

* `Kaftrio` (black triangle)
* `Increlex` (black/orange triangle)

#### 🧬Doping status

* `Ultiva`
* `Rapifen`

#### ⚠️Black triangle (additional monitoring), RMA

* `Increlex`

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
