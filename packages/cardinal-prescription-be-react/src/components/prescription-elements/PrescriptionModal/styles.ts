import styled, { css } from 'styled-components'
import { colors, colorsRgb, displayResolution, responsiveMediaQueries } from '../../../styles'

export const StyledPrescriptionModal = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  background-color: rgba(${colorsRgb.blue[800]}, 0.3);

  .content {
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

  .addMedicationForm {
    display: flex;
    width: 100%;
    height: 100vh;
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
          background-color: rgba(${colorsRgb.grey[300]};, 0.4);
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

        &__inputsGroup {
          width: 100%;
          display: flex;
          align-items: flex-start;
          gap: 4px;
          align-self: stretch;

          ${responsiveMediaQueries.down(displayResolution.s)`
          flex-direction: column;
            gap: 12px;
        `};
        }
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

    @keyframes zoom {
      from {
        transform: scale(0.95);
      }
      to {
        transform: scale(1);
      }
    }

    @keyframes fade {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
`

export const StyledDosageInput = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .suggestionsDropdown {
    position: absolute;
    top: calc(100% + 2px);

    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 2px;
    gap: 2px;

    border-radius: 6px;
    background: #fff;
    box-shadow:
      0 9px 28px 0 rgba(0, 0, 0, 0.05),
      0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 3px 6px 0 rgba(0, 0, 0, 0.12);
  }
`

export const suggestionItemOnAction = css`
  background: ${colors.blue[300]};
  color: ${colors.blue[800]} !important;
`

export const StyledSuggestionItem = styled.li<{ $focused?: boolean; $disableHover: boolean }>`
  width: 100%;
  display: flex;
  padding: 8px;
  align-items: center;
  align-self: stretch;

  border-radius: 4px;
  background: #fff;

  color: ${colors.grey[900]};
  font-family: 'Inter Variable', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;

  button {
    background: none;
  }

  &:hover {
    ${suggestionItemOnAction}
  }

  ${({ $focused }) =>
    !!$focused &&
    css`
      ${suggestionItemOnAction}
    `};

  ${({ $disableHover }) =>
    !!$disableHover &&
    css`
      &:hover {
        background: none;
      }
    `};

  ${({ $disableHover, $focused }) =>
    !!$disableHover &&
    $focused &&
    css`
      &:hover {
        ${suggestionItemOnAction}
      }
    `};
`
