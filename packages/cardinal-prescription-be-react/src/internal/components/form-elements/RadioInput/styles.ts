import styled, { css } from 'styled-components'
import {
  cp,
  errorMessageCommonStyles,
  fieldCommonStyles,
  labelCommonStyles,
  labelCommonStyles_error,
  labelCommonStyles_required,
  targetSize,
  translucent,
} from '../../../../styles'

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
  background: ${cp.colorPrimary};
`

export const StyledRadioButtonToggle = styled.span<{ $error?: boolean }>`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 15px;
  height: 15px;
  padding: 2px;
  border-radius: 50%;
  border: 1px solid ${cp.colorBorderControl};
  background: ${cp.colorSurface};

  ${({ $error }) =>
    !!$error &&
    css`
      border-color: ${cp.colorCritical};

      &:hover {
        box-shadow: 0 0 0 2px ${translucent(cp.colorCritical, 20)};
      }

      ${StyledRadioButtonToggleStuffing} {
        background: ${cp.colorCritical};
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
  position: relative;
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  ${targetSize('min-height')};
  cursor: pointer;

  &:hover {
    ${StyledRadioButtonToggle} {
      box-shadow: 0 0 0 2px ${cp.colorFocusHalo};
      border-color: ${cp.colorPrimary};
    }
  }

  /* Visually hidden but still focusable and announced; the whole label is the target. */
  input {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: 0;
    opacity: 0;
    pointer-events: none;

    &:checked + ${StyledRadioButtonToggle} {
      border-color: ${cp.colorPrimary};

      ${StyledRadioButtonToggleStuffing} {
        display: flex;
      }
    }

    &:focus-visible + ${StyledRadioButtonToggle} {
      outline: 2px solid ${cp.colorFocusRing};
      outline-offset: 2px;
    }
  }

  ${({ $error }) =>
    !!$error &&
    css`
      &:hover {
        ${StyledRadioButtonToggle} {
          box-shadow: 0 0 0 2px ${translucent(cp.colorCritical, 20)};
          border-color: ${cp.colorCritical};
        }
      }

      input {
        &:checked + ${StyledRadioButtonToggle} {
          border-color: ${cp.colorCritical};

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
    column-gap: 18px;
  }

  .error {
    ${errorMessageCommonStyles}
  }
`
