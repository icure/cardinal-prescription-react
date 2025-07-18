import styled from 'styled-components'
import { colors, colorsRgb } from '../../../../../styles'

export const StyledExtension = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 18px 12px;
  gap: 18px;

  background-color: ${colors.blue[200]};

  border-radius: 0 0 6px 6px;

  border-top: 1px dashed ${colors.blue[500]};

  .vmp {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;

    &__item {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 4px;

      span {
        font-size: 12px;
        font-weight: 400;
        color: ${colors.blue[600]};
      }

      p {
        font-size: 14px;
        font-weight: 400;
        color: black;
      }
    }
  }

  .divider {
    width: 100%;
    display: flex;
    border-bottom: 1px dashed rgba(${colorsRgb.blue[500]}, 0.25);
  }

  .links {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
    row-gap: 8px;

    a {
      width: 49%;
      color: ${colors.blue[500]};
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`
