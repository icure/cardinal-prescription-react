import styled from 'styled-components'
import { cp, displayResolution, responsiveMediaQueries } from '../../../../styles'

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
  border-radius: ${cp.radiusXl};
  border: 1px solid ${cp.colorBorder};
  background: ${cp.colorSurface};
  padding: 24px;
  gap: 12px;

  ${responsiveMediaQueries.down(displayResolution.l)`
   padding: 18px;
  `}
  h3 {
    color: ${cp.colorText};
    font-size: ${cp.fontSizeLg};
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
