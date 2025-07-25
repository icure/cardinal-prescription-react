import styled from 'styled-components'
import { colors } from '../../../styles'

export const StyledPrescriptionDocument = styled.div`
  @media print {
    .prescription {
      page-break-after: always;
      border: none;
    }
  }

  display: flex;
  flex-direction: column;
  gap: 24px;

  .prescription-document {
    border: 1px solid ${colors.grey[300]};
    border-radius: 8px;
    background-color: white;
    padding: 24px;
    font-size: 14px;

    display: flex;
    flex-direction: column;
    gap: 24px;

    &__divider {
      border-top: 1px solid ${colors.grey[300]};
    }

    &__header {
      text-align: center;

      display: flex;
      flex-direction: column;
      gap: 4px;

      h1 {
        margin: 0;
        font-size: 18px;
        padding-bottom: 4px;
      }
    }

    &__options {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
  }

  .prescription-section {
    display: flex;
    flex-direction: column;
    gap: 12px;

    &__persons {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    h3 {
      font-size: 14px;
    }

    .prescription-item {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      padding: 24px 12px;
      border-radius: 12px;
      border: 1px dashed ${colors.grey[600]};

      &__block {
        display: flex;
        flex-direction: column;
        width: 48%;

        &--right {
          align-items: center;
          width: auto;
        }
      }
    }

    .prescription-item:nth-child(even) {
      flex-direction: row-reverse;
    }
  }

  .barcode {
    width: 200px;
    height: 40px;
    margin: 5px 0;
    display: flex;
    flex-direction: row;
    align-items: flex-end;

    svg {
      height: 40px;
    }
  }
`
