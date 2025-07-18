import styled, { css } from 'styled-components'
import { colors } from '../../../styles'
import { StyledHeader } from './medication-card-elements/Header/styles'

export const activeMedicationCard = css`
  border-color: ${colors.blue[500]};
  box-shadow: 0 0 0 2px rgba(${colors.blue[500]}, 0.3);
`

export const StyledMedicationCard = styled.div<{ $focused: boolean; $isExpanded: boolean; $disableHover: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  background: #fff;
  border: 1px solid ${colors.blue[100]};
  cursor: pointer;

  &:hover {
    ${activeMedicationCard};
  }

  ${({ $isExpanded }) =>
    $isExpanded &&
    css`
      ${activeMedicationCard};

      ${StyledHeader} {
        border-radius: 6px 6px 0 0;
      }
    `};

  ${({ $focused, $disableHover }) =>
    $focused &&
    $disableHover &&
    css`
      &:hover {
        ${activeMedicationCard};
      }
    `};

  ${({ $focused }) =>
    $focused &&
    css`
      ${activeMedicationCard};
    `};

  ${({ $disableHover }) =>
    $disableHover &&
    css`
      &:hover {
        border-color: ${colors.blue[100]};
        box-shadow: none;
        cursor: not-allowed;
      }
    `};
`
