import styled from 'styled-components'
import { cp, displayResolution, labelCommonStyles, libraryRoot, responsiveMediaQueries } from '../../../styles'

export const StyledPrescriptionList = styled.div`
  ${libraryRoot}
  display: flex;
  flex-direction: column;
  gap: 24px;

  .cardinal-prescriptions {
    display: flex;
    flex-direction: column;
    gap: 4px;

    ${responsiveMediaQueries.down(displayResolution.m)`
      width: 100%;
      min-width: 100%;
    `};

    &__title {
      ${labelCommonStyles}
    }

    &__rows {
      width: 100%;
      height: auto;
      max-height: 380px;
      overflow-y: scroll;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      align-self: stretch;

      padding: 6px 8px 6px 6px;
      gap: 5px;
      border-radius: ${cp.radiusLg};
      border: 1px solid ${cp.colorBorder};
      background: ${cp.colorSurface};
    }

    &__footer {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 12px;
      align-self: stretch;
    }
  }
`
