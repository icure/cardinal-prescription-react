import type { RegulatoryBadgeComponent } from '../../../../../../shared/services/regulatory-badges'

// Registered `be` expanded badge — Extension's VMP/molecule block, gated on `be?.vmp` exactly
// as today. Labels are left as literal English text on purpose, matching Extension's original
// markup, which never ran them through `t()` despite `vmp.label`/`vmp.groupLabel` already
// existing in the translation tables.
export const VmpBadge: RegulatoryBadgeComponent = ({ medication }) => {
  const vmp = medication.regulatory?.be?.vmp
  if (!vmp) return null

  return (
    <div className="vmp">
      {vmp.name?.fr && (
        <div className="vmp__item">
          <span>VMP:</span>
          <p>{vmp.name.fr}</p>
        </div>
      )}
      {vmp.vmpGroup?.name?.fr && (
        <div className="vmp__item">
          <span>VMP-group:</span>
          <p>{vmp.vmpGroup.name.fr}</p>
        </div>
      )}
    </div>
  )
}
