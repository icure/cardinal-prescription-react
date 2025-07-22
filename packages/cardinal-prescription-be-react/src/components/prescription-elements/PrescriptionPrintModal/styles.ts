import styled from 'styled-components'
import { colors, colorsRgb, displayResolution, responsiveMediaQueries } from '../../../styles'

export const StyledPrescriptionPrintModal = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  background: rgba(${colorsRgb.blue[800]}, 0.3);

  .contentWrap {
    width: 900px;
    height: 100%;
    max-height: 100%;
    border: none;
    padding: 0;
    margin: 0 0 0 auto;

    ${responsiveMediaQueries.down(displayResolution.l)`
       width: 100%;
      border-radius: 0.2em;
  `};
  }

  .content {
    display: flex;
    width: 100%;
    height: 100%;
    overflow: hidden;
    flex-direction: column;
    align-items: flex-start;
    align-self: stretch;

    &__header {
      display: flex;
      padding: 20px 24px;
      justify-content: space-between;
      align-items: center;
      align-self: stretch;

      border-bottom: 1px solid ${colors.grey[300]};
      background: #fff;

      ${responsiveMediaQueries.down(displayResolution.l)`
        padding: 20px 16px;
      `};

      h3 {
        color: ${colors.grey[900]};
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
      }

      &__closeIcn {
        width: 22px;
        height: 22px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        background-color: #ffffff;
        border-radius: 4px;

        &:hover {
          background-color: rgba(${colorsRgb.grey[300]} 0.4);
        }
      }
    }

    &__body {
      width: 100%;
      height: 100%;
      overflow-y: auto;
      padding: 24px 32px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      align-self: stretch;
      flex: 1 0 0;
      gap: 12px;
      background-color: ${colors.blue[200]};

      ${responsiveMediaQueries.down(displayResolution.l)`
        padding: 16px;
      `};

      ${responsiveMediaQueries.down(displayResolution.s)`
         padding: 8px;
      `};

      &__content {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        align-self: stretch;
        border-radius: 12px;
        border: 1px solid ${colors.grey[300]};
        background: #fff;
        padding: 24px;
        gap: 12px;

        ${responsiveMediaQueries.down(displayResolution.l)`
          padding: 18px;
        `};
      }

      &__extraFieldsPreview {
        display: flex;
        width: 100%;
        padding: 12px;
        flex-direction: column;
        align-items: flex-start;
        align-self: stretch;

        border-radius: 12px;
        border: 1px solid ${colors.grey[300]};
        background: #fff;
        box-shadow: 0 1px 1px 0 rgba(218, 218, 222, 0.25);

        p {
          color: rgba(${colorsRgb.grey[600]}, 0.7);
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: 22px; /* 169.231% */
        }
      }
    }

    &__footer {
      display: flex;
      padding: 20px 24px;
      justify-content: flex-end;
      align-items: flex-start;
      gap: 12px;
      align-self: stretch;
      border-top: 1px solid ${colors.grey[300]};
      background: #fff;
    }
  }
`
