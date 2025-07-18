import styled from 'styled-components'
import {
  infographicElementCommonStyles,
  infographicElementContentCommonStyles,
  infographicElementLinkCommonStyles,
  infographicElementTextCommonStyles,
} from '../../../../../styles'

export const StyledRmaLink = styled.div`
  ${infographicElementCommonStyles};

  .content {
    ${infographicElementContentCommonStyles};

    p {
      ${infographicElementTextCommonStyles};
    }

    a {
      ${infographicElementLinkCommonStyles};
    }
  }
`
