import { Duration, Medication, Medicinalproduct, RegimenItem, Substanceproduct } from '@icure/be-fhc-lite-api'
import { v4 as uuid } from 'uuid'
import { makeParser, RegimenItem as ParsedRegimenItem } from '@icure/medication-sdk'
import { StandardDosage, VmpGroup } from '@icure/cardinal-be-sam-sdk'

import { createFhcCode } from '../../../shared/services/fhc'
import { offsetDate } from '../../utils/date-helpers'
import { durationTimeUnitsEnum, getDurationInDays } from '../../utils/prescription-duration-helpers'
import { PrescriptionFormType } from '../../types'
import { MedicationType, PrescribedMedicationType } from '../../../shared/types'

export interface StandardDosageContext {
  ageInYears?: number
  weightInKg?: number
  renalFunctionMlPerMin?: number
}

const createRegimenItemsFromDosage = (dosage: string | undefined): RegimenItem[] | undefined => {
  try {
    const { parsePosology } = makeParser('fr')
    const parsedPosologies: ParsedRegimenItem[] | undefined = dosage ? parsePosology(dosage) : undefined

    if (!parsedPosologies || parsedPosologies.length === 0) {
      return undefined
    }

    const errors: string[] = []
    // Check the consistency of items
    parsedPosologies.forEach((posology: ParsedRegimenItem) => {
      if ((posology.period?.temporalUnit ?? 'day') === 'day') {
        const dayMoments = posology.moments.filter((m) => m.periodOfTime || m.fullTime)
        if (dayMoments.length > 0 && posology.frequency && posology.frequency != dayMoments.length) {
          errors.push(`Inconsistent posology: frequency ${posology.frequency}/day does not match the number of day periods specified`)
        }
      } else if (posology.period?.temporalUnit === 'week') {
        if (posology.moments.filter((m) => m.dayOfWeek).length > 0 && posology.frequency && posology.frequency != posology.moments.length) {
          errors.push(`Inconsistent posology: frequency ${posology.frequency}/week does not match number of days specified`)
        }
        if (posology.moments.filter((m) => m.periodOfTime || m.fullTime).length > 1) {
          errors.push(`Inconsistent posology: for weekly posologies, only one time of day specification is allowed`)
        }
      }
    })

    return errors.length > 0
      ? undefined
      : parsedPosologies.flatMap((posology: ParsedRegimenItem) => {
          if ((posology.period?.temporalUnit ?? 'day') === 'day') {
            const dailyRegiment = [...new Array(Math.max((posology.frequency ?? 1) - posology.moments.filter((m) => m.periodOfTime || m.fullTime).length, 0))]
              .map(() => {
                return new RegimenItem({
                  administratedQuantity: {
                    quantity: posology.regimenQuantity?.quantity ?? 1,
                    unit: posology.regimenQuantity?.galenic ?? 'unit',
                  },
                })
              })
              .concat(
                posology.moments
                  .filter((m) => m.periodOfTime)
                  .map((moment) => {
                    return new RegimenItem({
                      administratedQuantity: {
                        quantity: posology.regimenQuantity?.quantity ?? 1,
                        unit: posology.regimenQuantity?.galenic ?? 'unit',
                      },
                      dayPeriod: {
                        type: 'CD-PERIOD',
                        code: moment.periodOfTime,
                      },
                    })
                  }),
              )
              .concat(
                posology.moments
                  .filter((m) => m.fullTime)
                  .map((moment) => {
                    return new RegimenItem({
                      administratedQuantity: {
                        quantity: posology.regimenQuantity?.quantity ?? 1,
                        unit: posology.regimenQuantity?.galenic ?? 'unit',
                      },
                      timeOfDay: parseInt(moment.fullTime?.replace(':', '') ?? '0000'),
                    })
                  }),
              )
            const weekMoments = posology.moments.filter((m) => m.dayOfWeek)

            return weekMoments.length > 0
              ? dailyRegiment.flatMap((item) =>
                  weekMoments.map((moment) => {
                    return new RegimenItem({
                      ...item,
                      weekday: {
                        weekDay: { type: 'CD-WEEKDAY', code: moment.dayOfWeek },
                      },
                    })
                  }),
                )
              : dailyRegiment
          } else if ((posology.frequency ?? 1) === posology.moments.length) {
            const periodOfTimeItem = posology.moments.find((m) => m.periodOfTime)
            const timeOfDayItem = posology.moments.find((m) => m.fullTime)

            return posology.moments
              .filter((m) => m.dayOfWeek)
              .map((moment) => {
                return new RegimenItem({
                  administratedQuantity: {
                    quantity: posology.regimenQuantity?.quantity ?? 1,
                    unit: posology.regimenQuantity?.galenic ?? 'unit',
                  },
                  weekday: {
                    weekDay: { type: 'CD-WEEKDAY', code: moment.dayOfWeek },
                  },
                  dayPeriod: periodOfTimeItem
                    ? {
                        type: 'CD-PERIOD',
                        code: periodOfTimeItem.periodOfTime,
                      }
                    : undefined,
                  timeOfDay: timeOfDayItem ? parseInt(timeOfDayItem.fullTime?.replace(':', '') ?? '0000') : undefined,
                })
              })
          } else {
            return []
          }
        })
  } catch (e) {
    // Never the posology text in the console (patient data).
    console.error('Error parsing dosage:', e instanceof Error ? e.name : 'unknown')
    return undefined
  }
}

/**
 * A host posology editor's regimen is taken as is (an empty one means "text only"); without an
 * editor, the regimen is parsed from the free-text posology, as before.
 */
const regimenOf = (formValues: PrescriptionFormType): RegimenItem[] | undefined =>
  formValues.regimen !== undefined ? (formValues.regimen.length > 0 ? formValues.regimen : undefined) : createRegimenItemsFromDosage(formValues.dosage)

const createSinglePrescribedMedication = (prescribedMedication: PrescribedMedicationType, formValues: PrescriptionFormType): PrescribedMedicationType[] => {
  return [
    {
      ...prescribedMedication,
      medication: new Medication({
        ...prescribedMedication.medication,
        beginMoment: offsetDate(
          parseInt((formValues.treatmentStartDate as string)?.replace(/-/g, '')),
          formValues.periodicityTimeUnit ? parseInt(formValues.periodicityTimeUnit) * (formValues.periodicityDaysNumber ?? 1) : 0,
        ),

        endMoment: offsetDate(
          parseInt((formValues.executableUntil as string)?.replace(/-/g, '')),
          formValues.periodicityTimeUnit ? parseInt(formValues.periodicityTimeUnit) * (formValues.periodicityDaysNumber ?? 1) : 0,
        ),
        duration: new Duration({
          unit: createFhcCode('CD-TIMEUNIT', 'D'),
          value: getDurationInDays(formValues.durationTimeUnit as durationTimeUnitsEnum, formValues.duration as number),
        }),
        regimen: regimenOf(formValues),
        instructionForPatient: formValues.dosage,
        recipeInstructionForPatient: formValues.recipeInstructionForPatient,
        instructionsForReimbursement: formValues.instructionsForReimbursement,
        substitutionAllowed: formValues.substitutionAllowed,
      }),
      prescriberVisibility: formValues.prescriberVisibility,
      pharmacistVisibility: formValues.pharmacistVisibility,
    },
  ]
}

const determineMedicationData = (medicationToPrescribe: MedicationType) => {
  const be = medicationToPrescribe?.regulatory?.be
  if (be?.ampId && !be.genericPrescriptionRequired && be.cnk) {
    return {
      medicinalProduct: new Medicinalproduct({
        samId: be.dmppProductId,
        intendedcds: [createFhcCode('CD-DRUG-CNK', be.cnk)],
        intendedname: be.intendedName,
      }),
    }
  } else if (be?.vmpGroupId) {
    return {
      substanceProduct: new Substanceproduct({
        samId: be.vmpGroupId,
        intendedcds: [createFhcCode('CD_VMPGROUP', be.vmpGroupId)],
        intendedname: be.vmpTitle ?? medicationToPrescribe.title,
      }),
    }
  } else {
    return { compoundPrescription: medicationToPrescribe.title }
  }
}

const createMedicationForPrescription = (formValues: PrescriptionFormType, medicationToPrescribe: MedicationType, idx: number): Medication => {
  const medicationData = determineMedicationData(medicationToPrescribe)

  return new Medication({
    ...medicationData,
    beginMoment: offsetDate(
      parseInt((formValues.treatmentStartDate as string)?.replace(/-/g, '')),
      formValues.periodicityTimeUnit ? parseInt(formValues.periodicityTimeUnit ?? '1') * (formValues.periodicityDaysNumber ?? 1) * idx : 0,
    ),

    endMoment: offsetDate(
      parseInt((formValues.executableUntil as string)?.replace(/-/g, '')),
      formValues.periodicityTimeUnit ? parseInt(formValues.periodicityTimeUnit ?? '1') * (formValues.periodicityDaysNumber ?? 1) * idx : 0,
    ),
    duration: new Duration({
      unit: createFhcCode('CD-TIMEUNIT', 'D'),
      value: getDurationInDays(formValues.durationTimeUnit as durationTimeUnitsEnum, formValues.duration as number),
    }),
    regimen: regimenOf(formValues),
    instructionForPatient: formValues.dosage,
    recipeInstructionForPatient: formValues.recipeInstructionForPatient,
    instructionsForReimbursement: formValues.instructionsForReimbursement,
    substitutionAllowed: formValues.substitutionAllowed,
  })
}

const createMultiplePrescribedMedications = (formValues: PrescriptionFormType, medicationToPrescribe: MedicationType): PrescribedMedicationType[] => {
  const prescriptionsNumber = formValues.prescriptionsNumber ?? 1
  return Array.from({ length: prescriptionsNumber }, (_, idx) => {
    return {
      uuid: uuid(),
      medication: createMedicationForPrescription(formValues, medicationToPrescribe, idx),
      prescriberVisibility: formValues.prescriberVisibility,
      pharmacistVisibility: formValues.pharmacistVisibility,
    }
  })
}

export const createPrescribedMedication = (
  formValues: PrescriptionFormType,
  prescribedMedication?: PrescribedMedicationType | undefined,
  medicationToPrescribe?: MedicationType | undefined,
): PrescribedMedicationType[] => {
  if (prescribedMedication) {
    return createSinglePrescribedMedication(prescribedMedication, formValues)
  } else if (medicationToPrescribe) {
    return createMultiplePrescribedMedications(formValues, medicationToPrescribe)
  } else {
    return []
  }
}

export const createPosologyFromStandardDosage = (group: VmpGroup | undefined, context: StandardDosageContext): ParsedRegimenItem[] => {
  if (!group?.standardDosage || group?.standardDosage.length === 0) {
    return []
  }

  // Filter dosages based on context (age, weight, renal function)
  const filteredDosages = group.standardDosage.filter((dosage: StandardDosage) => {
    // Check target group based on age
    if (dosage.targetGroup && context.ageInYears !== undefined) {
      const targetGroup = dosage.targetGroup
      const age = context.ageInYears

      // Target groups: Neonate (0-1 month), Paediatrics (1 month - 12 years),
      // Adolescent (12-18 years), Adult (18+ years)
      if (targetGroup === 'NEONATE' && age >= 1 / 12) return false
      if (targetGroup === 'PAEDIATRICS' && (age < 1 / 12 || age >= 12)) return false
      if (targetGroup === 'ADOLESCENT' && (age < 12 || age >= 18)) return false
      if (targetGroup === 'ADULT' && age < 18) return false
    }

    // Check kidney failure class based on creatinine clearance
    if (dosage.kidneyFailureClass !== undefined && context.renalFunctionMlPerMin !== undefined) {
      const clearance = context.renalFunctionMlPerMin
      const kidneyClass = dosage.kidneyFailureClass

      // 0 - Normal (>60), 1 - (30-60), 2 - (10-30), 3 - (<10)
      if (kidneyClass === 0 && clearance < 60) return false
      if (kidneyClass === 1 && (clearance < 30 || clearance >= 60)) return false
      if (kidneyClass === 2 && (clearance < 10 || clearance >= 30)) return false
      if (kidneyClass === 3 && clearance >= 10) return false
    }

    if (
      dosage.parameterBounds &&
      dosage.parameterBounds.length > 0 &&
      !dosage.parameterBounds.some((bound) => {
        if (bound.dosageParameter?.code?.toLowerCase() === 'age' && context.ageInYears !== undefined) {
          const age = context.ageInYears
          if (bound.lowerBound !== undefined && age < bound.lowerBound) return false
          if (bound.upperBound !== undefined && age > bound.upperBound) return false
          return true
        } else if (bound.dosageParameter?.code?.toLowerCase() === 'weight' && context.weightInKg !== undefined) {
          const weight = context.weightInKg
          if (bound.lowerBound !== undefined && weight < bound.lowerBound) return false
          if (bound.upperBound !== undefined && weight > bound.upperBound) return false
          return true
        } else {
          return false
        }
      })
    ) {
      return false
    }
    return true
  })

  // Convert filtered dosages to ParsedRegimenItem format
  return filteredDosages.flatMap((dosage: StandardDosage) => {
    // Calculate the quantity considering multiplicator and patient parameters
    let quantity = dosage.quantity ?? 1
    if (dosage.quantityDenominator) {
      quantity = quantity / dosage.quantityDenominator
    }

    // Apply multiplicator based on patient parameters
    if (dosage.quantityMultiplicator && context.weightInKg) {
      if (dosage.quantityMultiplicator.toLowerCase().includes('weight') || dosage.quantityMultiplicator.toLowerCase().includes('kg')) {
        quantity = quantity * context.weightInKg
      }
    }

    // Determine frequency and timeframe
    const frequency = dosage.administrationFrequencyQuantity ?? 1

    // Parse administrationFrequencyTimeframe (format: "value unit", e.g., "1 D" or "2 W")
    const timeframeValue = dosage.administrationFrequencyTimeframe?.value ?? 1
    const timeframeUnit = dosage.administrationFrequencyTimeframe?.unit ?? 'D'

    // Convert timeframe unit to temporal unit (only 'day' and 'week' are supported)
    const temporalUnit: 'day' | 'week' = timeframeUnit === 'W' || timeframeUnit === 'WK' || timeframeUnit.toLowerCase().includes('week') ? 'week' : 'day'

    // Create the regimen item
    const regimenItem: ParsedRegimenItem = {
      regimenQuantity: {
        quantity: quantity * (group.singleAdministrationDose?.value ?? 1),
        galenic: group.singleAdministrationDose?.unit ?? 'unit',
      },
      frequency: frequency,
      period: {
        timeframeValue: timeframeValue,
        temporalUnit: temporalUnit,
      },
      moments: [],
    }

    return [regimenItem]
  })
}

export { createRegimenItemsFromDosage }
