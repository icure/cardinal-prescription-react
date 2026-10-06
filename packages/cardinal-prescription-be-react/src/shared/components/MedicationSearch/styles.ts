import styled, { css } from 'styled-components'
import {
  cp,
  libraryRoot,
  errorMessageCommonStyles,
  fieldCommonStyles,
  inputCommonStyles,
  inputCommonStyles_error,
  labelCommonStyles,
  labelCommonStyles_error,
} from '../../../styles'

export const StyledMedicationSearch = styled.div`
  ${libraryRoot}
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;

  .spinner {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px 0;
  }

  .placeholder {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px 12px;

    p {
      color: ${cp.colorTextSubtle};
      font-size: ${cp.fontSizeMd};
      text-align: center;
    }
  }
`

export const StyledMedicationSearchInput = styled.div<{ $dropdownDisplayed?: boolean; $error?: boolean }>`
  ${fieldCommonStyles};

  p {
    ${labelCommonStyles};
  }

  input {
    width: 100%;
    background: transparent;
    color: inherit;
    font: inherit;
    /* The surrounding field draws the focus indicator (:focus-within). */
    outline: none;

    &::placeholder {
      color: ${cp.colorPlaceholder};
    }
  }

  ${({ $dropdownDisplayed }) =>
    !!$dropdownDisplayed &&
    css`
      label {
        border-color: ${cp.colorPrimary};
        box-shadow: 0 0 0 2px ${cp.colorFocusHalo};
        border-radius: ${cp.radiusMd};
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
    border-color: ${cp.colorPrimary};
    box-shadow: 0 0 0 2px ${cp.colorFocusHalo};
    outline: 2px solid ${cp.colorFocusRing};
    outline-offset: 1px;
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

  border-radius: 0 0 ${cp.radiusMd} ${cp.radiusMd};
  border-top: none;
  background: ${cp.colorSurfaceAccent};
  box-shadow: ${cp.shadowPopup};

  .medicationCardWrap {
    width: 100%;
  }

  .medOrProdWrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .cardWrap {
    width: 100%;

    &.subMedication {
      padding-left: 12px;
    }
  }
`
