import { Medication } from '@icure/be-fhc-lite-api'
import { ReimbursementType } from '../types'
import { t } from '../services/i18n'

export const getReimbursementOptions = (): { value: ReimbursementType; label: string }[] => [
  {
    value: null,
    label: t('reimbursementHelper.practitionerSelectionOptions.none'),
  },
  {
    value: Medication.InstructionsForReimbursementEnum.PAYINGTHIRDPARTY,
    label: t('reimbursementHelper.practitionerSelectionOptions.PAYINGTHIRDPARTY'),
  },
  {
    value: Medication.InstructionsForReimbursementEnum.FIRSTDOSE,
    label: t('reimbursementHelper.practitionerSelectionOptions.FIRSTDOSE'),
  },
  {
    value: Medication.InstructionsForReimbursementEnum.SECONDDOSE,
    label: t('reimbursementHelper.practitionerSelectionOptions.SECONDDOSE'),
  },
  {
    value: Medication.InstructionsForReimbursementEnum.THIRDDOSE,
    label: t('reimbursementHelper.practitionerSelectionOptions.THIRDDOSE'),
  },
  {
    value: Medication.InstructionsForReimbursementEnum.CHRONICKINDEYDISEASE,
    label: t('reimbursementHelper.practitionerSelectionOptions.CHRONICKINDEYDISEASE'),
  },
  {
    value: Medication.InstructionsForReimbursementEnum.DIABETESTREATMENT,
    label: t('reimbursementHelper.practitionerSelectionOptions.DIABETESTREATMENT'),
  },
  {
    value: Medication.InstructionsForReimbursementEnum.DIABETESCONVENTION,
    label: t('reimbursementHelper.practitionerSelectionOptions.DIABETESCONVENTION'),
  },
  {
    value: Medication.InstructionsForReimbursementEnum.NOTREIMBURSABLE,
    label: t('reimbursementHelper.practitionerSelectionOptions.NOTREIMBURSABLE'),
  },
  {
    value: Medication.InstructionsForReimbursementEnum.EXPLAINMEDICATION,
    label: t('reimbursementHelper.practitionerSelectionOptions.EXPLAINMEDICATION'),
  },
  {
    value: Medication.InstructionsForReimbursementEnum.DIABETESSTARTPATH,
    label: t('reimbursementHelper.practitionerSelectionOptions.DIABETESSTARTPATH'),
  },
]

export function getCategoryLabelForReimbursement(code: string | undefined): string {
  if (!code) return ''
  return t(`reimbursementHelper.categoryOptions.${code}`) || code
}
