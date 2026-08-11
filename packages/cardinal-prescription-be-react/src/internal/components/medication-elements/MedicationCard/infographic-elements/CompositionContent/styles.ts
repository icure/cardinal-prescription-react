import styled from 'styled-components'
import { colors, infographicElementCommonStyles, infographicElementContentCommonStyles, infographicElementTitleCommonStyles } from '../../../../../../styles'

export const StyledComposition = styled.div`
  ${infographicElementCommonStyles};

  h6 {
    ${infographicElementTitleCommonStyles};
    background-color: ${colors.blue[400]};
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
        font-size: 13px;
        font-weight: 400;
        color: black;
        display: flex;
        justify-content: space-between;
        gap: 8px;

        &.excipient {
          color: ${colors.grey[600]};
        }

        .quantity {
          white-space: nowrap;
        }
      }
    }
  }
`
