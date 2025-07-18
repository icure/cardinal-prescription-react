import styled from 'styled-components'
import { displayResolution, responsiveMediaQueries } from '../../../styles'

export const StyledPractitionerCertificate = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 12px;

  ${responsiveMediaQueries.down(displayResolution.m)`
  width: 100%;
    min-width: 100%;
  `}
`
