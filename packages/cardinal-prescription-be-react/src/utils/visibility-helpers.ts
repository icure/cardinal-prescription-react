import { PharmacistVisibilityType, PractitionerVisibilityType } from '../types'
import { t } from '../services/i18n'

export function getPractitionerVisibilityOptions(): {
  value: PractitionerVisibilityType
  label: string
}[] {
  return [
    {
      value: 'open',
      label: t('prescriptionVisibilityHelper.practitionerVisibility.open'),
    },
    {
      value: 'locked',
      label: t('prescriptionVisibilityHelper.practitionerVisibility.locked'),
    },
    {
      value: 'gmd_prescriber',
      label: t('prescriptionVisibilityHelper.practitionerVisibility.gmd_prescriber'),
    },
  ]
}

export function getPharmacistVisibilityOptions(): {
  value: PharmacistVisibilityType
  label: string
}[] {
  return [
    {
      value: null,
      label: t('prescriptionVisibilityHelper.pharmacistVisibility.null'),
    },
    {
      value: 'locked',
      label: t('prescriptionVisibilityHelper.pharmacistVisibility.locked'),
    },
  ]
}
