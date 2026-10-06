import styled, { css } from 'styled-components'
import { cp } from '../../../../styles'

export const StyledAlert = styled.div<{ $success: boolean; $error: boolean }>`
  width: 100%;
  display: flex;
  padding: 20px 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  align-self: stretch;
  border-radius: ${cp.radiusXl};
  border: 1px solid ${cp.colorSurface};

  .heading {
    display: flex;
    align-items: center;
    gap: 10px;
    align-self: stretch;

    svg {
      width: 24px;
      height: 24px;
    }
  }

  h4 {
    color: ${cp.colorText};
    font-size: ${cp.fontSizeLg};
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
  }

  p {
    color: ${cp.colorText};
    font-size: ${cp.fontSizeMd};
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
  }

  ${({ $error }) =>
    !!$error &&
    css`
      border-color: ${cp.colorCriticalSoft};
      background: ${cp.colorCriticalSurface};
    `};

  ${({ $success }) =>
    !!$success &&
    css`
      border-color: ${cp.colorOkSoft};
      background: ${cp.colorOkSurface};
    `};
`
