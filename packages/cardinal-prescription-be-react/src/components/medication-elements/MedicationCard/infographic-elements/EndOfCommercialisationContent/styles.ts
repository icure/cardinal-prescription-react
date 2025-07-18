import styled from 'styled-components'
import { colors, infographicElementCommonStyles, infographicElementContentCommonStyles, infographicElementTitleCommonStyles } from '../../../../../styles'

export const StyledEndCommercialization = styled.div`
  ${infographicElementCommonStyles};

  h6 {
    ${infographicElementTitleCommonStyles};
    background-color: ${colors.red[400]};
  }

  .content {
    ${infographicElementContentCommonStyles}
  }
`
