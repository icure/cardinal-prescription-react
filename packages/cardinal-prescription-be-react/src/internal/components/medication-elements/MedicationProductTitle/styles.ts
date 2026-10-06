import styled from 'styled-components'
import { cp } from '../../../../styles'

export const StyledMedicationProductTitle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: ${cp.radiusMd};
  background: ${cp.colorSurface};
  border: 1px solid ${cp.colorBorderAccent};
  padding: 8px 12px;

  h3 {
    color: ${cp.colorText};
    font-size: ${cp.fontSizeLg};
    font-style: normal;
    font-weight: 500;
  }
`
