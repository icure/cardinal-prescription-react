import styled from 'styled-components'
import { colors, infographicElementCommonStyles, infographicElementContentCommonStyles, infographicElementTitleCommonStyles } from '../../../../../styles'

export const StyledPrescriptionConditions = styled.div`
  ${infographicElementCommonStyles};

  h6 {
    ${infographicElementTitleCommonStyles};
    background-color: ${colors.red[400]};
  }

  .content {
    ${infographicElementContentCommonStyles}
  }
`

export const StyledPrescriptionConditionsNotApplicable = styled.div`
  ${infographicElementCommonStyles};

  h6 {
    ${infographicElementTitleCommonStyles};
    background-color: ${colors.green[400]};
  }

  .content {
    ${infographicElementContentCommonStyles}
  }
`
