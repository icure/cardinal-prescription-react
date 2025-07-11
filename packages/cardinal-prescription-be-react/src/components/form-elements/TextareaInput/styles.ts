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

export const StyledTextareaInputLabel = styled.label<{ $required?: boolean; $error?: boolean }>`
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
export const StyledTextareaInput = styled.div`
  ${fieldCommonStyles};

  .error {
    ${errorMessageCommonStyles}
  }
`
export const StyledTextarea = styled.textarea<{ $disabled?: boolean; $error?: boolean }>`
  ${inputCommonStyles};
  height: unset;

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
