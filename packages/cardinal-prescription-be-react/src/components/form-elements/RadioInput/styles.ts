import styled, { css } from 'styled-components'
import { colors, errorMessageCommonStyles, fieldCommonStyles, labelCommonStyles, labelCommonStyles_error, labelCommonStyles_required } from '../../../styles'

export const StyledRadioGroupLabel = styled.p<{ $required?: boolean; $error?: boolean }>`
  ${labelCommonStyles};
  ${({ $error }) =>
    !!$error &&
    css`
      ${labelCommonStyles_error}
    `};
  ${({ $required }) =>
    !!$required &&
    css`
      ${labelCommonStyles_required}
    `};
`

export const StyledRadioButtonToggleStuffing = styled.span`
  display: none;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: ${colors.blue[800]};
`

export const StyledRadioButtonToggle = styled.span<{ $error?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15px;
  height: 15px;
  padding: 2px;
  border-radius: 50%;
  border: 1px solid ${colors.grey[600]};
  background: #fff;

  ${({ $error }) =>
    !!$error &&
    css`
      border-color: red;

      &:hover {
        box-shadow: 0 0 0 2px rgba(255, 0, 0, 0.2);
      }

      ${StyledRadioButtonToggleStuffing} {
        background: red;
      }
    `}
`
export const StyledRadioButtonLabel = styled.span<{ $error?: boolean }>`
  ${labelCommonStyles};

  ${({ $error }) =>
    !!$error &&
    css`
      ${labelCommonStyles_error}
    `}

  width: auto;
  font-weight: 400;
`

export const StyledRadioButton = styled.label<{ $error?: boolean }>`
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  cursor: pointer;

  &:hover {
    ${StyledRadioButtonToggle} {
      box-shadow: 0 0 0 2px rgba(61, 135, 197, 0.2);
      border-color: ${colors.blue[800]};
    }
  }

  input {
    display: none;

    &:checked + ${StyledRadioButtonToggle} {
      border-color: ${colors.blue[800]};

      ${StyledRadioButtonToggleStuffing} {
        display: flex;
      }
    }
  }

  ${({ $error }) =>
    !!$error &&
    css`
      &:hover {
        ${StyledRadioButtonToggle} {
          box-shadow: 0 0 0 2px rgba(255, 0, 0, 0.2);
          border-color: red;
        }
      }

      input {
        display: none;

        &:checked + ${StyledRadioButtonToggle} {
          border-color: red;

          ${StyledRadioButtonToggleStuffing} {
            display: flex;
          }
        }
      }
    `}
`

export const StyledRadioInput = styled.div`
  ${fieldCommonStyles};

  .radioBtnsGroup {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    gap: 18px;
  }

  .error {
    ${errorMessageCommonStyles}
  }
`
