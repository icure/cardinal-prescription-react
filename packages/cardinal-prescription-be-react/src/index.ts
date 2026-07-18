// Side-effect imports: populate the regulatory badge registry as soon as the library loads,
// so both `be` and `ch` badges are always registered — no app-level init call needed.
import './internal/components/medication-elements/register-be-badges'
import './internal/components/medication-elements/register-ch-badges'

export * from './shared/services/i18n'
export * from './shared/services/cardinal-sam'
export * from './shared/services/medindex'
export * from './shared/services/medication-provider-config'
export * from './shared/services/certificate'
export * from './shared/services/fhc'
export * from './shared/services/indexed-db'
export * from './shared/services/regulatory-badges'
export * from './shared/types'

// StandardDosageContext is part of the public PrescriptionModal prop surface.
export type { StandardDosageContext } from './internal/services/prescription/create-prescription'

export * from './shared/components/PractitionerCertificate'
export * from './shared/components/MedicationSearch'
export * from './shared/components/PrescriptionModal'
export * from './shared/components/PrescriptionList'
export * from './shared/components/PrescriptionPrintModal'
