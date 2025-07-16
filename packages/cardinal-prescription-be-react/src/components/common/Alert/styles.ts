import styled, { css } from 'styled-components'
import { colors } from '../../../styles'

export const StyledAlert = styled.div<{ $success: boolean; $error: boolean }>`
  width: 100%;
  display: flex;
  padding: 20px 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  align-self: stretch;
  border-radius: 12px;
  border: 1px solid white;

  .heading {
    display: flex;
    align-items: center;
    gap: 10px;
    align-self: stretch;
  }

  h4 {
    color: ${colors.grey[900]};
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
  }

  p {
    color: ${colors.grey[900]};
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
  }

  ${({ $error }) =>
    !!$error &&
    css`
      border-color: ${colors.red[400]};
      background: ${colors.red[300]};
    `};

  ${({ $success }) =>
    !!$success &&
    css`
      border-color: ${colors.green[400]};
      background: ${colors.green[300]};
    `};
`
