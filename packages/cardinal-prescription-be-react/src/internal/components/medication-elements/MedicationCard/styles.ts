import styled, { css } from 'styled-components'
import { cp, darkModeDefaults, rootText } from '../../../../styles'
import { StyledHeader } from './medication-card-elements/Header/styles'

export const activeMedicationCard = css`
  border-color: ${cp.colorAccent};
  box-shadow: 0 0 0 2px ${cp.colorHoverHalo};
`

export const StyledMedicationCard = styled.div<{ $focused?: boolean; $isExpanded: boolean; $disableHover?: boolean; $subMedication?: boolean }>`
  /* The card is a public atom that may be mounted outside any library root. */
  ${darkModeDefaults}
  ${rootText}
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: ${cp.radiusMd};
  background: ${cp.colorSurface};
  border: 1px solid ${cp.colorBorderAccent};
  cursor: pointer;

  ${({ $subMedication }) =>
    $subMedication &&
    css`
      ${StyledHeader} {
        padding-left: 28px;

        h3 {
          font-size: ${cp.fontSizeMd};
        }
      }
    `};

  &:hover {
    ${activeMedicationCard};
  }

  ${({ $isExpanded }) =>
    $isExpanded &&
    css`
      ${activeMedicationCard};

      ${StyledHeader} {
        border-radius: ${cp.radiusMd} ${cp.radiusMd} 0 0;
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
        border-color: ${cp.colorBorderAccent};
        box-shadow: none;
        cursor: not-allowed;
      }
    `};
`
