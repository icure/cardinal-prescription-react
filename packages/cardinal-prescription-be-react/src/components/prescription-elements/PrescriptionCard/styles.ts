import styled, { css } from 'styled-components'
import { colors, colorsRgb, displayResolution, responsiveMediaQueries } from '../../../styles'

export const actionBtnCommonStyles = css`
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  ${responsiveMediaQueries.down(displayResolution.s)`
        width: 32px;
        height: 32px;
        border: 1px solid #eef6fe;
        background: rgba(238, 246, 254, 0.3);
        border-radius: 6px;
    `};
`

export const StyledPrescriptionCard = styled.div<{ $prescribed?: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  gap: 12px;
  border-radius: 6px;
  background: ${colors.blue[200]};
  border: 1px solid ${colors.blue[100]};

  &:hover {
    border-radius: 6px;
    border-color: ${colors.blue[500]};
    box-shadow: 0 0 0 2px rgba(${colorsRgb.blue[500]}, 0.3);
    background-color: white;
  }

  ${({ $prescribed }) =>
    !!$prescribed &&
    css`
      background: ${colors.green[200]};
      border-color: green;

      &:hover {
        border-color: green;
        border-radius: inherit;
        background: ${colors.green[200]};
        box-shadow: inherit;
      }
    `};

  .header {
    width: 83%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;

    ${responsiveMediaQueries.down(displayResolution.s)`
      width: 100%;
    `};

    &__prescription {
      display: flex;
      align-items: center;
      gap: 12px;

      &__content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;

        &__title {
          display: flex;
          align-items: flex-start;
          gap: 8px;

          h3 {
            color: ${colors.grey[900]};
            font-size: 16px;
            font-style: normal;
            font-weight: 500;
          }
        }

        p {
          color: ${colors.grey[900]};
          font-size: 14px;
          font-style: normal;
          font-weight: 300;
          line-height: normal;
        }
      }
    }
  }

  .actions {
    width: 36px;
    display: flex;
    gap: 8px;

    ${responsiveMediaQueries.down(displayResolution.s)`
     width: 100%;
      gap: 4px;
    `};

    .edit {
      ${actionBtnCommonStyles};

      &:hover {
        svg {
          path {
            fill: ${colors.blue[500]};
          }
        }
      }
    }

    .delete {
      ${actionBtnCommonStyles};

      &:hover {
        svg {
          path {
            fill: ${colors.red[800]};
          }
        }
      }
    }
  }

  .rid {
    font-size: 12px;
    letter-spacing: 1.2px;
    background-color: ${colors.green[500]};
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
  }
`
