import styled from 'styled-components'
import { cp, infographicElementCommonStyles, infographicElementContentCommonStyles, infographicElementTitleCommonStyles } from '../../../../../../styles'

export const StyledDeliveryConditions = styled.div`
  ${infographicElementCommonStyles};

  h6 {
    ${infographicElementTitleCommonStyles};
    background-color: ${cp.colorCautionSoft};
  }

  .content {
    ${infographicElementContentCommonStyles}
  }
`

export const StyledDeliveryConditionsNotApplicable = styled.div`
  ${infographicElementCommonStyles};

  h6 {
    ${infographicElementTitleCommonStyles};
    background-color: ${cp.colorOkSoft};
  }

  .content {
    ${infographicElementContentCommonStyles}
  }
`
