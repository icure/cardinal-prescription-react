import styled from 'styled-components'
import { cp, infographicElementCommonStyles, infographicElementContentCommonStyles, infographicElementTitleCommonStyles } from '../../../../../../styles'

export const StyledReimbursement = styled.div`
  ${infographicElementCommonStyles};

  h6 {
    ${infographicElementTitleCommonStyles};
    background-color: ${cp.colorOkSoft};
  }

  .content {
    ${infographicElementContentCommonStyles}
  }
`
