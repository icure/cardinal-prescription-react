import { css } from 'styled-components'
import { colors } from './variables'

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
  height: 32px;
  padding: 5px 12px;
  align-items: center;
  gap: 4px;
  align-self: stretch;
  cursor: pointer;

  border-radius: 6px;
  border: 1px solid ${colors.grey[550]};
  background: #fff;

  color: ${colors.grey[900]};
  font-family: 'Inter Variable', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;

  &::placeholder {
    color: ${colors.grey[650]};
  }

  &:hover,
  &:focus {
    border-color: ${colors.blue[800]};
  }

  &:focus {
    box-shadow: 0 0 0 2px rgba(61, 135, 197, 0.2);
  }
`

export const inputCommonStyles_disabled = css`
  cursor: not-allowed;
  background-color: ${colors.grey[200]};
  border-color: ${colors.grey[550]};
  opacity: 0.7;

  &:hover {
    border-color: ${colors.grey[550]};
  }
`

export const inputCommonStyles_error = css`
  border-color: red;
  color: red;

  &::placeholder {
    color: rgba(255, 0, 0, 0.5);
  }

  &:hover {
    border-color: rgba(255, 0, 0, 0.5);
  }

  &:focus {
    box-shadow: 0 0 0 2px rgba(255, 0, 0, 0.2);
  }
`

export const labelCommonStyles = css`
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 4px;
  color: ${colors.grey[900]};
  font-size: 14px;
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
    color: red;
    font-weight: bold;
  }
`

export const labelCommonStyles_error = css`
  color: red;
`

export const errorMessageCommonStyles = css`
  color: red;
  font-size: 13px;
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
  font-size: 14px;
  font-weight: 500;
`

export const infographicElementTextCommonStyles = css`
  font-size: 14px;
  font-weight: 400;
  color: black;
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
      font-size: 12px;
      font-weight: 400;
      color: ${colors.blue[600]};
    }

    p {
      ${infographicElementTextCommonStyles};
    }

    a {
      ${infographicElementTextCommonStyles};
      color: ${colors.blue[600]};

      &:hover {
        text-decoration: underline;
      }
    }
  }
`

export const infographicElementLinkCommonStyles = css`
  ${infographicElementTextCommonStyles};
  color: ${colors.blue[500]};

  &:hover {
    text-decoration: underline;
  }
`
