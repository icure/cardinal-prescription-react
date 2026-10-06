import styled from 'styled-components'
import { cp, infographicElementCommonStyles, infographicElementContentCommonStyles, infographicElementTitleCommonStyles } from '../../../../../../styles'

export const StyledInteractions = styled.div`
  ${infographicElementCommonStyles};

  h6 {
    ${infographicElementTitleCommonStyles};
    background-color: ${cp.colorCaution};
    color: ${cp.colorOnBadge};
  }

  .content {
    ${infographicElementContentCommonStyles};

    div p.effect {
      font-size: ${cp.fontSizeSm};
      color: ${cp.colorTextSubtle};
    }

    p.more {
      font-size: ${cp.fontSizeXs};
      font-weight: 400;
      color: ${cp.colorTextMuted};
    }
  }
`
