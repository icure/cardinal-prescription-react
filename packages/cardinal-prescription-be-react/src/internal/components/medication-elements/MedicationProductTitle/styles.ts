import styled from 'styled-components'
import { colors } from '../../../../styles'

export const StyledMedicationProductTitle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 6px;
  background: #fff;
  border: 1px solid ${colors.blue[100]};
  padding: 8px 12px;

  h3 {
    color: ${colors.grey[900]};
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
  }
`
