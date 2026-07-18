import { FC, RefObject } from 'react'
import type { MedicationType } from '../../../../shared/types'
import { getRegulatoryBadges, RegulatoryBadgePlacement } from '../../../../shared/services/regulatory-badges'

interface Props {
  medication: MedicationType
  placement: RegulatoryBadgePlacement
  boundaryBox?: RefObject<HTMLElement>
}

// The only place allowed to know that `medication.regulatory` has country-keyed slots at all.
// Every badge decides for itself (from the full `medication`) whether it has anything to show —
// this component just looks up whichever countries are actually populated and renders whatever
// is registered for them, so it never needs a `country === 'xx'` branch.
export const RegulatoryBadges: FC<Props> = ({ medication, placement, boundaryBox }) => {
  const countries = Object.keys(medication.regulatory ?? {})

  return (
    <>
      {countries.flatMap((country) =>
        getRegulatoryBadges(country, placement).map(({ key, Component }) => <Component key={`${country}.${key}`} medication={medication} boundaryBox={boundaryBox} />),
      )}
    </>
  )
}
