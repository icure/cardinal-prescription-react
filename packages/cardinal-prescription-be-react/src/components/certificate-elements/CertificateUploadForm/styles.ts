import styled from 'styled-components'
import { colors, displayResolution, responsiveMediaQueries } from '../../../styles'

export const StyledCertificateUpload = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  gap: 12px;
`

export const StyledCertificateForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  border-radius: 12px;
  border: 1px solid ${colors.grey[300]};
  background: #fff;
  padding: 24px;
  gap: 12px;

  ${responsiveMediaQueries.down(displayResolution.l)`
   padding: 18px;
  `}
  h3 {
    color: ${colors.grey[900]};
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  .StyledCertificateUpload__inputs {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    align-self: stretch;
    gap: 12px;
  }
`
