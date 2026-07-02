import { FC } from 'react'
import { Tooltip } from '../../common/Tooltip'
import { SolidPillIcn } from '../../common/Icons'
import { t } from '../../../../shared/services/i18n'
import { StyledMedicationProductTitle } from './styles'

interface Props {
  productTitle: string
}

export const MedicationProductTitle: FC<Props> = ({ productTitle }) => {
  return (
    <StyledMedicationProductTitle className="StyledMedicationProductTitle">
      <Tooltip content={t('medication.drugType.medication')} iconSnippet={<SolidPillIcn />} />
      <h3>{productTitle}</h3>
    </StyledMedicationProductTitle>
  )
}
