import styled, { css } from 'styled-components'
import {
  errorMessageCommonStyles,
  fieldCommonStyles,
  inputCommonStyles,
  inputCommonStyles_disabled,
  inputCommonStyles_error,
  labelCommonStyles,
  labelCommonStyles_error,
  labelCommonStyles_required,
} from '../../../styles'

export const StyledTextInputLabel = styled.label<{ $required?: boolean; $error?: boolean }>`
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
export const StyledTextInput = styled.div`
  ${fieldCommonStyles};

  .error {
    ${errorMessageCommonStyles}
  }
`
export const StyledInput = styled.input<{ $disabled?: boolean; $error?: boolean }>`
  ${inputCommonStyles};

  &::file-selector-button {
    border-radius: 0;
    height: 100%;
    cursor: pointer;
    background-color: white;
    border: none;
    border-right: 1px solid rgba(0, 0, 0, 0.16);
    margin-right: 16px;
    padding-right: 12px;
    transition: background-color 200ms;
  }

  ${({ $error }) =>
    !!$error &&
    css`
      ${inputCommonStyles_error}
    `};
  ${({ $disabled }) =>
    !!$disabled &&
    css`
      ${inputCommonStyles_disabled}
    `};
`
