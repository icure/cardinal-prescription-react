import styled from 'styled-components'
import { cp, infographicElementCommonStyles, infographicElementContentCommonStyles, infographicElementTitleCommonStyles } from '../../../../../../styles'

export const StyledComposition = styled.div`
  ${infographicElementCommonStyles};

  h6 {
    ${infographicElementTitleCommonStyles};
    background-color: ${cp.colorAccentSoft};
  }

  .content {
    ${infographicElementContentCommonStyles};

    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 2px;

      li {
        font-size: ${cp.fontSizeSm};
        font-weight: 400;
        color: ${cp.colorTextStrong};
        display: flex;
        justify-content: space-between;
        gap: 8px;

        &.excipient {
          color: ${cp.colorTextSubtle};
        }

        .quantity {
          white-space: nowrap;
        }
      }
    }
  }
`
