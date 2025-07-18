import styled from 'styled-components'
import { colors, infographicElementCommonStyles, infographicElementContentCommonStyles, infographicElementTitleCommonStyles } from '../../../../../styles'

export const StyledSupplyProblems = styled.div`
  ${infographicElementCommonStyles};

  h6 {
    ${infographicElementTitleCommonStyles};
    background-color: ${colors.orange[800]};
  }

  .content {
    ${infographicElementContentCommonStyles}
  }
`
