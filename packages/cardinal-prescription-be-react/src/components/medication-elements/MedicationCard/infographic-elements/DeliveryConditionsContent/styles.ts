import styled from 'styled-components'
import { colors, infographicElementCommonStyles, infographicElementContentCommonStyles, infographicElementTitleCommonStyles } from '../../../../../styles'

export const StyledDeliveryConditions = styled.div`
  ${infographicElementCommonStyles};

  h6 {
    ${infographicElementTitleCommonStyles};
    background-color: ${colors.orange[800]};
  }

  .content {
    ${infographicElementContentCommonStyles}
  }
`

export const StyledDeliveryConditionsNotApplicable = styled.div`
  ${infographicElementCommonStyles};

  h6 {
    ${infographicElementTitleCommonStyles};
    background-color: ${colors.green[400]};
  }

  .content {
    ${infographicElementContentCommonStyles}
  }
`
