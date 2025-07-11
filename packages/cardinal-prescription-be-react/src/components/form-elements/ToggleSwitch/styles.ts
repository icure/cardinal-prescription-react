import styled from 'styled-components'
import { colors, fieldCommonStyles, labelCommonStyles } from '../../../styles'

export const StyledSwitch = styled.div`

  ${fieldCommonStyles};

  .toggleSwitchLabel {
    ${labelCommonStyles};
  }

  .toggleWrapper {
    display: flex;
    padding: 4px 0;
    align-items: center;
    gap: 12px;
    align-self: stretch;

    .toggle {
      position: relative;
      display: inline-block;
      width: 46px;
      height: 24px;

      .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: ${colors.grey[550]};
        border: 1px solid transparent;
        transition: 0.4s;
        border-radius: 34px;

        &:hover {
          border-color: ${colors.blue[800]};
          box-shadow: 0 0 0 2px rgba(61, 135, 197, 0.2);
        }

        &::before {
          position: absolute;
          content: '';
          height: 18px;
          width: 18px;
          left: 2px;
          bottom: 2px;
          background-color: white;
          transition: 0.4s;
          border-radius: 50%;
        }
      }

      input {
        opacity: 0;
        width: 0;
        height: 0;

        &:checked + .slider {
          background-color: ${colors.blue[800]};
        }

        &:checked + .slider:hover {
          box-shadow: 0 0 0 2px rgba(61, 135, 197, 0.2);
        }

        &:focus + .slider {
          box-shadow: 0 0 1px ${colors.blue[800]};
        }

        &:checked + .slider::before {
          -webkit-transform: translateX(20px);
          -ms-transform: translateX(20px);
          transform: translateX(20px);
        }
      }
    }

    p {
      ${labelCommonStyles};
    }
`
