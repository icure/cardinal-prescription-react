import styled from 'styled-components'
import { colors, displayResolution, labelCommonStyles, responsiveMediaQueries } from '../../../styles'

export const StyledPrescriptionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  .prescriptions {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 50%;
    min-width: 700px;

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
      border-radius: 8px;
      border: 1px solid ${colors.grey[300]};
      background: white;
    }

    &__footer {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 12px;
      align-self: stretch;
      background: #fff;
    }
  }
`
