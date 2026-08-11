import styled from 'styled-components'
import { colors, infographicElementCommonStyles, infographicElementContentCommonStyles, infographicElementTitleCommonStyles } from '../../../../../../styles'

export const StyledInteractions = styled.div`
  ${infographicElementCommonStyles};

  h6 {
    ${infographicElementTitleCommonStyles};
    background-color: ${colors.orange[950]};
    color: white;
  }

  .content {
    ${infographicElementContentCommonStyles};

    div p.effect {
      font-size: 13px;
      color: ${colors.grey[600]};
    }

    p.more {
      font-size: 12px;
      font-weight: 400;
      color: ${colors.blue[600]};
    }
  }
`
