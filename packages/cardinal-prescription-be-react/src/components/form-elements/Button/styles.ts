import styled, { css } from 'styled-components'
import { colors } from '../../../styles'
import { ButtonViewType } from './index'

const viewStyles = ($view?: ButtonViewType) => {
  switch ($view) {
    case 'primary':
      return css`
        background: ${colors.blue[800]};
        color: #ffffff;

        &:hover {
          opacity: 0.9;
        }
      `
    case 'outlined':
      return css`
        border-radius: 6px;
        border-color: ${colors.grey[550]};
        background: ${colors.grey[100]};
        color: ${colors.blue[800]};

        &:hover {
          border-color: ${colors.blue[800]};
        }
      `
    case 'withSpinner':
      return css`
        border-radius: 6px;
        border-color: ${colors.grey[550]};
        background: ${colors.grey[100]};
        color: ${colors.blue[800]};
        gap: 8px;
      `
    default:
      return null
  }
}

export const StyledButton = styled.button<{ $view?: 'primary' | 'withSpinner' | 'outlined' }>`
  display: flex;
  height: 32px;
  padding: 0 16px;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border: 1px solid ${colors.blue[800]};
  cursor: pointer;
  min-width: 64px;

  ${({ $view }) => viewStyles($view)}
  &[disabled],
  &[disabled]:hover {
    cursor: not-allowed;
    border-color: ${colors.grey[550]};
    background: ${colors.grey[200]};
    color: ${colors.grey[600]};
  }
`
