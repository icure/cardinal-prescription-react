import styled from 'styled-components'
import { cp, infographicElementCommonStyles, infographicElementContentCommonStyles, infographicElementTitleCommonStyles } from '../../../../../../styles'

export const StyledEndCommercialization = styled.div`
  ${infographicElementCommonStyles};

  h6 {
    ${infographicElementTitleCommonStyles};
    background-color: ${cp.colorCriticalSoft};
  }

  .content {
    ${infographicElementContentCommonStyles}
  }
`
