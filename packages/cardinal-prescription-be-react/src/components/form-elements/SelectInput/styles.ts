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

export const StyledSelectInputLabel = styled.label<{ $required?: boolean; $error?: boolean }>`
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
export const StyledSelectInput = styled.div`
  ${fieldCommonStyles};

  .error {
    ${errorMessageCommonStyles}
  }
`
export const StyledSelectDropdown = styled.select<{ $disabled?: boolean; $error?: boolean }>`
  ${inputCommonStyles};

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
