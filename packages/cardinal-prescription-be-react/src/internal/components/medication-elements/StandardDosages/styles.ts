import styled from 'styled-components'
import { cp, targetSize } from '../../../../styles'

export const StyledStandardDosages = styled.div`
  margin: 8px 0;
  border: 1px solid ${cp.colorBorderAccent};
  border-radius: ${cp.radiusMd};
  overflow: hidden;
`

export const StyledStandardDosagesHeader = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${targetSize('min-height')};
  padding: 8px 12px;
  border: none;
  cursor: pointer;
  text-align: left;
  background: ${cp.colorSurfaceAccentSubtle};
  color: ${cp.colorLink};
  font-family: inherit;
  font-size: ${cp.fontSizeSm};
`

export const StyledStandardDosagesHeaderContent = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const StyledStandardDosagesToggle = styled.span<{ $expanded: boolean }>`
  display: flex;
  align-items: center;
  transition: transform 0.2s ease;
  transform: rotate(${({ $expanded }) => ($expanded ? '90deg' : '0deg')});
`

export const StyledStandardDosagesContent = styled.ul`
  list-style: none;
  margin: 0;
  padding: 4px 0;
`

export const StyledStandardDosagesItem = styled.li`
  button {
    width: 100%;
    ${targetSize('min-height')};
    text-align: left;
    padding: 6px 12px;
    border: none;
    background: none;
    color: ${cp.colorText};
    cursor: pointer;
    font-family: inherit;
    font-size: ${cp.fontSizeSm};

    &:hover {
      background: ${cp.colorSurfaceAccentSubtle};
    }
  }
`
