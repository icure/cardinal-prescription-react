import styled, { css } from 'styled-components'
import { cp, displayResolution, responsiveMediaQueries, targetSize } from '../../../../../../styles'

export const StyledHeader = styled.div`
  width: 100%;
  display: flex;
  padding: 8px 12px;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
  align-self: stretch;
  background: ${cp.colorSurface};
  border-radius: ${cp.radiusMd};

  ${responsiveMediaQueries.down(displayResolution.s)`
  gap: 4px;
  `};

  .medication {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 12px;

    ${responsiveMediaQueries.down(displayResolution.s)`
    gap: 8px;
  `};

    &__content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 12px;

      &__heading {
        display: flex;
        flex-direction: column;
        gap: 4px;

        &__title {
          display: flex;
          align-items: center;
          gap: 8px;

          h3 {
            color: ${cp.colorText};
            font-size: ${cp.fontSizeLg};
            font-style: normal;
            font-weight: 500;
          }
        }

        &__activeIngredient {
          color: ${cp.colorText};
          font-size: ${cp.fontSizeMd};
          font-style: normal;
          font-weight: 300;
          line-height: normal;
        }
      }

      &__description {
        width: 100%;
        display: flex;
        gap: 32px;
        row-gap: 8px;
        flex-wrap: wrap;

        &__item {
          display: flex;
          align-items: center;
          gap: 6px;

          span {
            font-size: ${cp.fontSizeXs};
            font-weight: 400;
            color: ${cp.colorTextMuted};
          }

          p {
            font-size: ${cp.fontSizeMd};
            font-weight: 400;
            color: ${cp.colorTextStrong};
            font-style: normal;
            line-height: normal;
          }

          .price {
            color: ${cp.colorPrice};
            font-weight: 600;
          }
        }
      }
    }
  }
`

export const StyledCheapBadge = styled.span<{ $variant: 'cheap' | 'cheapest' }>`
  display: inline-flex;
  align-items: center;
  height: 20px;
  padding: 0 8px;
  border-radius: ${cp.radiusPill};
  font-size: ${cp.fontSize2xs};
  font-weight: 600;
  white-space: nowrap;
  color: ${cp.colorOnBadge};
  background-color: ${({ $variant }) => ($variant === 'cheapest' ? cp.colorOk : cp.colorOkStrong)};
`

export const StyledExpandButton = styled.button<{ $isExpanded?: boolean }>`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  ${targetSize('width')};
  ${targetSize('height')};
  background: none;
  cursor: pointer;

  ${({ $isExpanded }) =>
    !!$isExpanded &&
    css`
      transform: rotate(90deg);
    `};
`

export const StyledTextToIcon = styled.div<{ $color: 'green' | 'orange' | 'red' | 'grey' }>`
  height: 22px;
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 6px;
  border-radius: ${cp.radiusSm};

  p {
    font-size: ${cp.fontSize2xs} !important;
    font-weight: 600;
    color: ${cp.colorOnBadge} !important;
  }

  ${({ $color }) =>
    $color === 'green' &&
    css`
      background-color: ${cp.colorOk};
    `};

  ${({ $color }) =>
    $color === 'orange' &&
    css`
      background-color: ${cp.colorCaution};
    `};

  ${({ $color }) =>
    $color === 'red' &&
    css`
      background-color: ${cp.colorCriticalStrong};
    `};

  ${({ $color }) =>
    $color === 'grey' &&
    css`
      background-color: ${cp.colorNeutral};
    `};
`
