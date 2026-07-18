import { describe, it, expect } from 'vitest'
import { Medication } from '@icure/be-fhc-lite-api'
import { VmpGroup } from '@icure/cardinal-be-sam-sdk'
import { createPrescribedMedication, createPosologyFromStandardDosage, createRegimenItemsFromDosage } from './create-prescription'
import { PrescriptionFormType } from '../../types'
import { MedicationType, PrescribedMedicationType } from '../../../shared/types'

const baseForm: PrescriptionFormType = {
  dosage: '1 comprimé 3 fois par jour',
  duration: 30,
  durationTimeUnit: 'DAY',
  treatmentStartDate: '2026-01-01',
  executableUntil: '2026-06-01',
  prescriptionsNumber: 1,
  substitutionAllowed: true,
}

describe('createRegimenItemsFromDosage', () => {
  it('parses a simple French posology into a non-empty regimen', () => {
    const regimen = createRegimenItemsFromDosage('1 comprimé 3 fois par jour')
    expect(Array.isArray(regimen)).toBe(true)
    expect(regimen!.length).toBeGreaterThan(0)
  })

  it('returns undefined for empty or missing dosage', () => {
    expect(createRegimenItemsFromDosage('')).toBeUndefined()
    expect(createRegimenItemsFromDosage(undefined)).toBeUndefined()
  })
})

describe('createPosologyFromStandardDosage', () => {
  const group = {
    singleAdministrationDose: { value: 2, unit: 'mg' },
    standardDosage: [
      // Adult, matches a 30yo/70kg patient
      {
        targetGroup: 'ADULT',
        quantity: 10,
        quantityDenominator: 2,
        administrationFrequencyQuantity: 2,
        administrationFrequencyTimeframe: { value: 1, unit: 'D' },
        parameterBounds: [{ dosageParameter: { code: 'WEIGHT' }, lowerBound: 50, upperBound: 100 }],
      },
      // Paediatric, should be filtered out for a 30yo
      {
        targetGroup: 'PAEDIATRICS',
        quantity: 5,
        administrationFrequencyQuantity: 1,
        administrationFrequencyTimeframe: { value: 1, unit: 'D' },
      },
    ],
  } as unknown as VmpGroup

  it('filters by target group / parameter bounds and computes quantity', () => {
    const result = createPosologyFromStandardDosage(group, { ageInYears: 30, weightInKg: 70 })
    expect(result.length).toBe(1)
    // quantity (10) / denominator (2) = 5, × singleAdministrationDose (2) = 10
    expect(result[0].regimenQuantity.quantity).toBe(10)
    expect(result[0].regimenQuantity.galenic).toBe('mg')
    expect(result[0].frequency).toBe(2)
    expect(result[0].period.temporalUnit).toBe('day')
  })

  it('returns an empty array when the group has no standard dosage', () => {
    expect(createPosologyFromStandardDosage(undefined, {})).toEqual([])
    expect(createPosologyFromStandardDosage({ standardDosage: [] } as unknown as VmpGroup, {})).toEqual([])
  })
})

describe('createPrescribedMedication', () => {
  it('returns an empty array when neither an existing prescription nor a medication is provided', () => {
    expect(createPrescribedMedication(baseForm)).toEqual([])
  })

  it('single path: preserves the prescription and sets regimen + instructionForPatient', () => {
    const existing: PrescribedMedicationType = {
      uuid: 'uuid-1',
      medication: new Medication({ compoundPrescription: 'Existing' }),
    }
    const result = createPrescribedMedication(baseForm, existing)
    expect(result).toHaveLength(1)
    expect(result[0].uuid).toBe('uuid-1')
    expect(result[0].medication.instructionForPatient).toBe(baseForm.dosage)
    expect(result[0].medication.regimen && result[0].medication.regimen.length).toBeGreaterThan(0)
  })

  it('multiple path: creates one prescription per prescriptionsNumber with generated uuids', () => {
    const medication: MedicationType = {
      title: 'Aspirin 500mg',
      regulatory: {
        be: {
          ampId: 'amp-1',
          cnk: '1234567',
          dmppProductId: 'prod-1',
          intendedName: 'Aspirin',
        },
      },
    }
    const result = createPrescribedMedication({ ...baseForm, prescriptionsNumber: 3 }, undefined, medication)
    expect(result).toHaveLength(3)
    const uuids = new Set(result.map((r) => r.uuid))
    expect(uuids.size).toBe(3)
    result.forEach((r) => expect(r.medication.instructionForPatient).toBe(baseForm.dosage))
  })
})
