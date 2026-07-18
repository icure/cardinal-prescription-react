import styled from 'styled-components'
import { colors, colorsRgb } from '../../../../../../styles'

export const StyledExtension = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 18px 12px;
  gap: 18px;

  background-color: ${colors.blue[200]};

  border-radius: 0 0 6px 6px;

  border-top: 1px dashed ${colors.blue[500]};

  .vmp {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;

    &__item {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 4px;

      span {
        font-size: 12px;
        font-weight: 400;
        color: ${colors.blue[600]};
      }

      p {
        font-size: 14px;
        font-weight: 400;
        color: black;
      }
    }
  }

  // Generic label+value row for country-specific fields that don't warrant their own styled
  // component (currently ch's GTIN list / generic group) — same visual treatment as .vmp__item
  // above, under a country-neutral name.
  .regulatoryField {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 4px;

    span {
      font-size: 12px;
      font-weight: 400;
      color: ${colors.blue[600]};
    }

    p {
      font-size: 14px;
      font-weight: 400;
      color: black;
    }
  }

  // Each section below is now an independently-registered 'expanded' badge that may render
  // null (React emits no DOM node for it), so a divider div can no longer be hand-placed
  // between "the next section that will actually render". Putting the divider styling on
  // every child but the first sidesteps that: :not(:first-child) only ever matches DOM
  // siblings that actually rendered, so the line shows up exactly between rendered sections
  // with zero bookkeeping. padding-top replicates the second half of the original
  // gap-line-gap spacing (18px gap, 1px line, 18px gap) that the container's gap alone
  // only covers half of, now that the line lives on the section itself instead of its own
  // flex item.
  & > *:not(:first-child) {
    padding-top: 18px;
    border-top: 1px dashed rgba(${colorsRgb.blue[500]}, 0.25);
  }

  .links {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
    row-gap: 8px;

    a {
      width: 49%;
      color: ${colors.blue[500]};
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`
