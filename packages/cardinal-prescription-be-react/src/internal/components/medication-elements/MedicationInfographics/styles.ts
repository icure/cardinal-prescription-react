import styled from 'styled-components'
import { colors } from '../../../../styles'

// Detail badges used to be laid out in 3 hardcoded sub-groups (core infographics / availability
// / delivery-prescription), each with its own wrapper div, 2px gap within a group and 12px
// between groups. That grouping was keyed on knowing exactly which `be` fields belonged to
// which cluster — knowledge a country-blind renderer can no longer hardcode. Every registered
// badge is now a sibling in one flat, uniformly-spaced (2px) row; each badge still carries its
// own item styling below (bordered "outline" box vs. a colored box) so its individual look is
// unchanged, only the inter-badge grouping gap is gone.
export const StyledMedicationInfographics = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;

  .regulatoryBadgeIcon {
    display: flex;
    width: 22px;
    height: 22px;
    justify-content: center;
    align-items: center;
    border-radius: 5px;

    &--outline {
      border: 1px solid ${colors.blue[400]};
    }

    &--red {
      background-color: ${colors.red[400]};
    }

    &--orange {
      background-color: ${colors.orange[800]};
    }

    &--green {
      background-color: ${colors.green[400]};
    }
  }
`
