import styled, { css } from 'styled-components'
import { cp, darkModeDefaults, targetSize } from '../../../../styles'
import { ButtonViewType } from './index'

const viewStyles = ($view?: ButtonViewType) => {
  switch ($view) {
    case 'primary':
      return css`
        background: ${cp.buttonPrimaryBackground};
        border-color: ${cp.buttonPrimaryBackground};
        color: ${cp.buttonPrimaryText};

        &:hover {
          opacity: 0.9;
        }
      `
    case 'outlined':
      return css`
        border-color: ${cp.buttonSecondaryBorder};
        background: ${cp.buttonSecondaryBackground};
        color: ${cp.buttonSecondaryText};

        &:hover {
          border-color: ${cp.buttonSecondaryText};
        }
      `
    case 'withSpinner':
      return css`
        border-color: ${cp.buttonSecondaryBorder};
        background: ${cp.buttonSecondaryBackground};
        color: ${cp.buttonSecondaryText};
        gap: 8px;
      `
    default:
      return null
  }
}

export const StyledButton = styled.button<{ $view?: 'primary' | 'withSpinner' | 'outlined' }>`
  /* The button is a public atom that may be mounted outside any library root. */
  ${darkModeDefaults}
  display: flex;
  ${targetSize('height', cp.controlHeight)};
  padding: 0 16px;
  justify-content: center;
  align-items: center;
  border-radius: ${cp.buttonRadius};
  font-family: ${cp.fontFamily};
  font-size: ${cp.fontSizeMd};
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border: 1px solid ${cp.buttonPrimaryBackground};
  cursor: pointer;
  min-width: 64px;

  ${({ $view }) => viewStyles($view)}
  &[disabled],
  &[disabled]:hover {
    cursor: not-allowed;
    border-color: ${cp.colorBorderStrong};
    background: ${cp.colorSurfaceDisabled};
    color: ${cp.colorTextSubtle};
  }
`
