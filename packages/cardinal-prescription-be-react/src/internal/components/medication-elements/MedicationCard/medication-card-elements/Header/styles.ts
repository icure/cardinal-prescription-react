import styled, { css } from 'styled-components'
import { colors, displayResolution, responsiveMediaQueries } from '../../../../../../styles'

export const StyledHeader = styled.div`
  width: 100%;
  display: flex;
  padding: 8px 12px;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
  align-self: stretch;
  background: #fff;
  border-radius: 6px;

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
            color: ${colors.grey[900]};
            font-size: 16px;
            font-style: normal;
            font-weight: 500;
          }
        }

        &__activeIngredient {
          color: ${colors.grey[900]};
          font-size: 14px;
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
            font-size: 12px;
            font-weight: 400;
            color: ${colors.blue[600]};
          }

          p {
            font-size: 14px;
            font-weight: 400;
            color: black;
            font-style: normal;
            line-height: normal;
          }

          .price {
            color: ${colors.orange[900]};
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
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  color: #fff;
  background-color: ${({ $variant }) => ($variant === 'cheapest' ? colors.green[600] : colors.green[500])};
`

export const StyledExpandButton = styled.button<{ $isExpanded?: boolean }>`
  width: 18px;
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
  border-radius: 5px;

  p {
    font-size: 11px !important;
    font-weight: 600;
    color: white !important;
  }

  ${({ $color }) =>
    $color === 'green' &&
    css`
      background-color: ${colors.green[600]};
    `};

  ${({ $color }) =>
    $color === 'orange' &&
    css`
      background-color: ${colors.orange[950]};
    `};

  ${({ $color }) =>
    $color === 'red' &&
    css`
      background-color: ${colors.red[700]};
    `};

  ${({ $color }) =>
    $color === 'grey' &&
    css`
      background-color: ${colors.grey[700]};
    `};
`
