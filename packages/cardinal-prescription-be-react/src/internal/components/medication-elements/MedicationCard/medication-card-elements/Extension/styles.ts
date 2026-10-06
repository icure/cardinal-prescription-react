import styled from 'styled-components'
import { cp, translucent } from '../../../../../../styles'

export const StyledExtension = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 18px 12px;
  gap: 18px;

  background-color: ${cp.colorSurfaceSunken};

  border-radius: 0 0 ${cp.radiusMd} ${cp.radiusMd};

  border-top: 1px dashed ${cp.colorAccent};

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
        font-size: ${cp.fontSizeXs};
        font-weight: 400;
        color: ${cp.colorTextMuted};
      }

      p {
        font-size: ${cp.fontSizeMd};
        font-weight: 400;
        color: ${cp.colorTextStrong};
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
      font-size: ${cp.fontSizeXs};
      font-weight: 400;
      color: ${cp.colorTextMuted};
    }

    p {
      font-size: ${cp.fontSizeMd};
      font-weight: 400;
      color: ${cp.colorTextStrong};
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
    border-top: 1px dashed ${translucent(cp.colorAccent, 25)};
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
      color: ${cp.colorLink};
      font-size: ${cp.fontSizeMd};
      font-style: normal;
      font-weight: 400;
      line-height: normal;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`
