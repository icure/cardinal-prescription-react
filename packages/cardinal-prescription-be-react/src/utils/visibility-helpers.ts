import { PharmacistVisibilityType, PractitionerVisibilityType } from '../types'
import type { TFunction } from 'i18next'

export function getPractitionerVisibilityOptions(t: TFunction): {
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

export function getPharmacistVisibilityOptions(t: TFunction): {
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
