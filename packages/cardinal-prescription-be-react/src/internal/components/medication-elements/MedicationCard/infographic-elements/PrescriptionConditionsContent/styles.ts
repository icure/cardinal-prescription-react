import styled from 'styled-components'
import { cp, infographicElementCommonStyles, infographicElementContentCommonStyles, infographicElementTitleCommonStyles } from '../../../../../../styles'

export const StyledPrescriptionConditions = styled.div`
  ${infographicElementCommonStyles};

  h6 {
    ${infographicElementTitleCommonStyles};
    background-color: ${cp.colorCriticalSoft};
  }

  .content {
    ${infographicElementContentCommonStyles}
  }
`

export const StyledPrescriptionConditionsNotApplicable = styled.div`
  ${infographicElementCommonStyles};

  h6 {
    ${infographicElementTitleCommonStyles};
    background-color: ${cp.colorOkSoft};
  }

  .content {
    ${infographicElementContentCommonStyles}
  }
`
