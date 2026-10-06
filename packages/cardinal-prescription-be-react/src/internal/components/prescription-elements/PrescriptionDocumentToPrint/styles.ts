import styled from 'styled-components'
import { cp, libraryRoot } from '../../../../styles'

// The printed document is also a library root: the print view copies it into an iframe, outside
// the modal, and it must keep its own reset there. Paper colours stay light in dark mode.
export const StyledPrescriptionDocument = styled.div`
  ${libraryRoot}
  color: ${cp.colorPaperText};
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
    border: 1px solid ${cp.colorBorder};
    border-radius: ${cp.radiusLg};
    background-color: ${cp.colorPaper};
    padding: 24px;
    font-size: ${cp.fontSizeMd};

    display: flex;
    flex-direction: column;
    gap: 24px;

    &__divider {
      border-top: 1px solid ${cp.colorBorder};
    }

    &__header {
      text-align: center;

      display: flex;
      flex-direction: column;
      gap: 4px;

      h1 {
        margin: 0;
        font-size: ${cp.fontSizeXl};
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
      font-size: ${cp.fontSizeMd};
    }

    .prescription-item {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      padding: 24px 12px;
      border-radius: ${cp.radiusXl};
      border: 1px dashed ${cp.colorBorderControl};

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
