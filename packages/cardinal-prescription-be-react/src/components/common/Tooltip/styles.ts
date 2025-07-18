import { TooltipOrientationType } from './index'
import styled, { css } from 'styled-components'
import { colors } from '../../../styles'

export const tooltipArrow = css`
  content: '';
  width: 0;
  height: 0;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
`
export const tooltipTopOriented = css`
  .chevron {
    display: none;
    ${tooltipArrow};
    border-top: 7px solid ${colors.blue[500]};
    position: absolute;
    bottom: 23px;
    left: 50%;
    transform: translate(-50%, 0);
  }

  .popup {
    bottom: 28px;
  }
`
export const tooltipBottomOriented = css`
  .chevron {
    display: none;
    ${tooltipArrow};
    border-bottom: 7px solid ${colors.blue[500]};
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translate(-50%, 0);
  }

  .popup {
    top: 30px;
  }
`
export const tooltipRightOriented = css`
  .chevron {
    right: 50%;
  }

  .popup {
    // Half width of the chevron
    right: -7px;
  }
`
export const tooltipLeftOriented = css`
  .popup {
    // Half width of the chevron
    left: -7px;
  }
`

const tooltipOrientationStyles = ($tooltipOrientation: TooltipOrientationType) => {
  switch ($tooltipOrientation) {
    case 'tr':
      return css`
        ${tooltipTopOriented};
        ${tooltipRightOriented};
      `
    case 'tl':
      return css`
        ${tooltipTopOriented};
        ${tooltipLeftOriented};
      `
    case 'br':
      return css`
        ${tooltipBottomOriented};
        ${tooltipRightOriented};
      `
    case 'bl':
      return css`
        ${tooltipBottomOriented};
        ${tooltipLeftOriented};
      `
    default:
      return null
  }
}

export const StyleTooltip = styled.div<{ $tooltipOrientation: TooltipOrientationType; $active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: min-content;
  cursor: pointer;

  ${({ $tooltipOrientation }) => tooltipOrientationStyles($tooltipOrientation)};

  &:hover {
    .chevron {
      display: flex;
    }
  }

  .icon {
    height: 22px;
    display: flex;
    align-items: center;
    z-index: 10;
  }

  .popup {
    display: none;
    position: absolute;
    z-index: 15;
    min-height: 32px;
    min-width: 300px;
    padding: 8px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 6px;
    align-self: stretch;
    border-radius: 6px;
    border: 1px solid ${colors.blue[500]};
    background: #fff;

    &__iconWrap {
      width: 100%;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      border-bottom: 1px solid ${colors.blue[500]};
      padding-bottom: 6px;
    }

    &__icon {
      display: flex;
      min-width: 22px;
      height: 22px;
      justify-content: center;
      align-items: center;
      border-radius: 16px;
    }

    p {
      color: ${colors.grey[900]};
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }

  ${({ $active }) =>
    !!$active &&
    css`
      .popup {
        display: flex;
      }
    `};
`
