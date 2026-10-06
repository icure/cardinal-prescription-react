import styled, { css } from 'styled-components'
import { cp, displayResolution, responsiveMediaQueries, targetSize } from '../../../../styles'

export const actionBtnCommonStyles = css`
  background: none;
  cursor: pointer;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  ${targetSize('width')};
  ${targetSize('height')};
  border-radius: ${cp.radiusMd};

  ${responsiveMediaQueries.down(displayResolution.s)`
        border: 1px solid ${cp.colorSurfaceAccent};
        background: ${cp.colorSurfaceAccentSubtle};
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
  border-radius: ${cp.radiusMd};
  background: ${cp.colorSurfaceSunken};
  border: 1px solid ${cp.colorBorderAccent};

  &:hover {
    border-radius: ${cp.radiusMd};
    border-color: ${cp.colorAccent};
    box-shadow: 0 0 0 2px ${cp.colorHoverHalo};
    background-color: ${cp.colorSurface};
  }

  ${({ $prescribed }) =>
    !!$prescribed &&
    css`
      background: ${cp.colorOkSurfaceAlt};
      border-color: ${cp.colorOkBorder};

      &:hover {
        border-color: ${cp.colorOkBorder};
        border-radius: inherit;
        background: ${cp.colorOkSurfaceAlt};
        box-shadow: inherit;
      }
    `};

  .prescriptionCardHeader {
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
            color: ${cp.colorText};
            font-size: ${cp.fontSizeLg};
            font-style: normal;
            font-weight: 500;
          }
        }

        p {
          color: ${cp.colorText};
          font-size: ${cp.fontSizeMd};
          font-style: normal;
          font-weight: 300;
          line-height: normal;
        }
      }
    }
  }

  .actions {
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
            fill: ${cp.colorAccent};
          }
        }
      }
    }

    .delete {
      ${actionBtnCommonStyles};

      &:hover {
        svg {
          path {
            fill: ${cp.colorCritical};
          }
        }
      }
    }
  }

  .rid {
    font-size: ${cp.fontSizeXs};
    letter-spacing: 1.2px;
    background-color: ${cp.colorOkStrong};
    color: ${cp.colorOnBadge};
    padding: 4px 8px;
    border-radius: ${cp.radiusXs};
  }
`
