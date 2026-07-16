import styled from 'styled-components'
import { colors } from '../../../../styles'

export const StyledMedicationInfographics = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  .medicationInfographics,
  .medicationAvailabilityInfographics,
  .deliveryPrescriptionConditions {
    display: flex;
    align-items: center;
    gap: 2px;
  }

  .medicationInfographics {
    &__item {
      display: flex;
      width: 22px;
      height: 22px;
      justify-content: center;
      align-items: center;

      border-radius: 5px;
      border: 1px solid ${colors.blue[400]};
    }
  }

  .medicationAvailabilityInfographics {
    &__item {
      display: flex;
      width: 22px;
      height: 22px;
      justify-content: center;
      align-items: center;

      border-radius: 5px;

      &--red {
        background-color: ${colors.red[400]};
      }

      &--orange {
        background-color: ${colors.orange[800]};
      }

      &--green {
        background-color: ${colors.green[400]};
      }
    }
  }
`
