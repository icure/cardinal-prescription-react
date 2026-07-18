import type { RegulatoryBadgeComponent } from '../../../../../../shared/services/regulatory-badges'

// Registered `be` expanded badge — Extension's links block, kept as one combined badge that
// preserves today's exact grouping/markup (literal link labels, never run through `t()`).
// Unlike Extension's original unconditional `<div className="links">`, this returns `null`
// when none of the five links are present instead of leaving an empty, invisible div in the
// DOM — a disclosed, minor cleanup, not a rendering change for any medication that actually
// has at least one link.
export const LinksBadge: RegulatoryBadgeComponent = ({ medication }) => {
  const be = medication.regulatory?.be
  if (!be?.crmLink && !be?.patientInformationLeafletLink && !be?.rmaProfessionalLink && !be?.spcLink && !be?.dhpcLink) return null

  return (
    <div className="links">
      {be?.crmLink && (
        <a href={be.crmLink} target="_blank" rel="noopener noreferrer">
          Commented Medicines Directory (CBIP)
        </a>
      )}
      {be?.patientInformationLeafletLink && (
        <a href={be.patientInformationLeafletLink} target="_blank" rel="noopener noreferrer">
          Patient information leaflet
        </a>
      )}
      {be?.rmaProfessionalLink && (
        <a href={be.rmaProfessionalLink} target="_blank" rel="noopener noreferrer">
          Risk Minimisation Activities (RMA)
        </a>
      )}
      {be?.spcLink && (
        <a href={be.spcLink} target="_blank" rel="noopener noreferrer">
          Summary of Product Characteristics (SPC)
        </a>
      )}
      {be?.dhpcLink && (
        <a href={be.dhpcLink} target="_blank" rel="noopener noreferrer">
          Direct Healthcare Professional Communication (DHPC)
        </a>
      )}
    </div>
  )
}
