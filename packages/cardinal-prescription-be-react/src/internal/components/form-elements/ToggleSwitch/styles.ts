import styled from 'styled-components'
import { cp, fieldCommonStyles, labelCommonStyles, targetSize } from '../../../../styles'

export const StyledSwitch = styled.div`
  ${fieldCommonStyles};

  .toggleSwitchLabel {
    ${labelCommonStyles};
  }

  .toggleWrapper {
    display: flex;
    ${targetSize('min-height')};
    padding: 4px 0;
    align-items: center;
    gap: 12px;
    align-self: stretch;

    .toggle {
      position: relative;
      display: inline-block;
      flex-shrink: 0;
      width: 46px;
      height: 24px;

      .slider {
        position: absolute;
        pointer-events: none;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: ${cp.colorBorderStrong};
        border: 1px solid transparent;
        transition: 0.4s;
        border-radius: ${cp.radiusPill};

        &::before {
          position: absolute;
          content: '';
          height: 18px;
          width: 18px;
          left: 2px;
          bottom: 2px;
          background-color: ${cp.colorSurface};
          transition: 0.4s;
          border-radius: 50%;
        }
      }

      input {
        position: absolute;
        z-index: 1;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 100%;
        ${targetSize('height', '24px')};
        margin: 0;
        opacity: 0;
        cursor: pointer;

        &:hover + .slider {
          border-color: ${cp.colorPrimary};
          box-shadow: 0 0 0 2px ${cp.colorFocusHalo};
        }

        &:checked + .slider {
          background-color: ${cp.colorPrimary};
        }

        &:focus-visible + .slider {
          outline: 2px solid ${cp.colorFocusRing};
          outline-offset: 2px;
        }

        &:checked + .slider::before {
          transform: translateX(20px);
        }
      }
    }

    .toggleSwitchText {
      ${labelCommonStyles};
      width: auto;
    }
  }
`
