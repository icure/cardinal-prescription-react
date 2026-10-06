import styled from 'styled-components'
import { cp, displayResolution, libraryRoot, responsiveMediaQueries, targetSize } from '../../../styles'

export const StyledPrescriptionPrintModal = styled.div`
  ${libraryRoot}
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1020;
  display: flex;
  background: ${cp.colorOverlay};

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

      border-bottom: 1px solid ${cp.colorBorder};
      background: ${cp.colorSurface};

      ${responsiveMediaQueries.down(displayResolution.l)`
        padding: 20px 16px;
      `};

      h3 {
        color: ${cp.colorText};
        font-size: ${cp.fontSizeLg};
        font-style: normal;
        font-weight: 500;
        line-height: normal;
      }

      &__closeIcn {
        ${targetSize('width')};
        ${targetSize('height')};
        flex-shrink: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        background-color: ${cp.colorSurface};
        border-radius: ${cp.radiusXs};

        &:hover {
          background-color: ${cp.colorSurfaceDisabled};
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
      background-color: ${cp.colorSurfaceSunken};

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
        border-radius: ${cp.radiusXl};
        border: 1px solid ${cp.colorBorder};
        background: ${cp.colorSurface};
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

        border-radius: ${cp.radiusXl};
        border: 1px solid ${cp.colorBorder};
        background: ${cp.colorSurface};
        box-shadow: ${cp.shadowSection};

        p {
          color: ${cp.colorTextSubtle};
          font-size: ${cp.fontSizeMd};
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
      border-top: 1px solid ${cp.colorBorder};
      background: ${cp.colorSurface};
    }
  }
`
