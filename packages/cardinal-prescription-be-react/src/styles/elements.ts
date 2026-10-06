import { css } from 'styled-components'
import { cp, targetSize, translucent } from './theme'

// Input common styles
export const fieldCommonStyles = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  align-self: stretch;
`

export const inputCommonStyles = css`
  width: 100%;
  display: flex;
  ${targetSize('height', cp.inputHeight)};
  padding: 5px 12px;
  align-items: center;
  gap: 4px;
  align-self: stretch;
  cursor: pointer;

  border-radius: ${cp.radiusMd};
  border: 1px solid ${cp.colorBorderStrong};
  background: ${cp.colorSurface};

  color: ${cp.colorText};
  font-family: ${cp.fontFamilyControl};
  font-size: ${cp.fontSizeMd};
  font-weight: 400;
  line-height: 22px;

  &::placeholder {
    color: ${cp.colorPlaceholder};
  }

  &:hover,
  &:focus {
    border-color: ${cp.colorPrimary};
  }

  &:focus {
    box-shadow: 0 0 0 2px ${cp.colorFocusHalo};
  }
`

export const inputCommonStyles_disabled = css`
  cursor: not-allowed;
  background-color: ${cp.colorSurfaceDisabled};
  border-color: ${cp.colorBorderStrong};
  opacity: 0.7;

  &:hover {
    border-color: ${cp.colorBorderStrong};
  }
`

export const inputCommonStyles_error = css`
  border-color: ${cp.colorCritical};
  color: ${cp.colorCritical};

  &::placeholder {
    color: ${translucent(cp.colorCritical, 70)};
  }

  &:hover {
    border-color: ${translucent(cp.colorCritical, 50)};
  }

  &:focus {
    box-shadow: 0 0 0 2px ${translucent(cp.colorCritical, 20)};
  }
`

export const labelCommonStyles = css`
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 4px;
  color: ${cp.colorText};
  font-size: ${cp.fontSizeMd};
  font-weight: 500;
  line-height: 22px;
  cursor: pointer;

  span {
    display: none;
  }
`

export const labelCommonStyles_required = css`
  span {
    display: flex;
    color: ${cp.colorCritical};
    font-weight: bold;
  }
`

export const labelCommonStyles_error = css`
  color: ${cp.colorCritical};
`

export const errorMessageCommonStyles = css`
  color: ${cp.colorCritical};
  font-size: ${cp.fontSizeSm};
`

// Infographic-elements common styles

export const infographicElementCommonStyles = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const infographicElementTitleCommonStyles = css`
  width: 100%;
  font-size: ${cp.fontSizeMd};
  font-weight: 500;
`

export const infographicElementTextCommonStyles = css`
  font-size: ${cp.fontSizeMd};
  font-weight: 400;
  color: ${cp.colorTextStrong};
`

export const infographicElementContentCommonStyles = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;

  div {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 4px;

    span {
      font-size: ${cp.fontSizeXs};
      font-weight: 400;
      color: ${cp.colorTextMuted};
    }

    p {
      ${infographicElementTextCommonStyles};
    }

    a {
      ${infographicElementTextCommonStyles};
      color: ${cp.colorLink};

      &:hover {
        text-decoration: underline;
      }
    }
  }
`

export const infographicElementLinkCommonStyles = css`
  ${infographicElementTextCommonStyles};
  color: ${cp.colorLink};

  &:hover {
    text-decoration: underline;
  }
`
