import styled, { css } from 'styled-components'
import { colors, errorMessageCommonStyles, fieldCommonStyles, inputCommonStyles, inputCommonStyles_error, labelCommonStyles, labelCommonStyles_error } from '../../../styles'

export const StyledMedicationSearch = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const StyledMedicationSearchInput = styled.div<{ $dropdownDisplayed?: boolean; $error?: boolean }>`
  ${fieldCommonStyles};

  p {
    ${labelCommonStyles};
  }

  input {
    width: 100%;

    &::placeholder {
      color: ${colors.grey[650]};
    }
  }

  ${({ $dropdownDisplayed }) =>
    !!$dropdownDisplayed &&
    css`
      label {
        border-color: ${colors.blue[800]};
        box-shadow: 0 0 0 2px rgba(61, 135, 197, 0.2);
        border-radius: 6px;
      }
    `};

  ${({ $error }) =>
    !!$error &&
    css`
      p {
        ${labelCommonStyles_error};
      }
    `};

  .error {
    ${errorMessageCommonStyles}
  }
`

export const StyledLabel = styled.label<{ $error?: boolean }>`
  ${inputCommonStyles};

  justify-content: space-between;

  &:focus-within {
    border-color: ${colors.blue[800]};
    box-shadow: 0 0 0 2px rgba(61, 135, 197, 0.2);
  }

  ${({ $error }) =>
    !!$error &&
    css`
      ${inputCommonStyles_error};
    `};
`
export const StyledMedicationSearchDropdown = styled.div`
  width: 100%;
  height: 400px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  position: relative;

  padding: 6px 8px 6px 6px;
  gap: 5px;

  border-radius: 0 0 6px 6px;
  border-top: none;
  background: ${colors.blue[300]};
  box-shadow:
    0 9px 28px 0 rgba(0, 0, 0, 0.05),
    0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 3px 6px 0 rgba(0, 0, 0, 0.12);

  .medicationCardWrap {
    width: 100%;
  }
`
