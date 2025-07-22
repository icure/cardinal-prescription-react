import React, { useRef, useState, KeyboardEvent, useEffect } from 'react'
import TextInput from '../../form-elements/TextInput'
import { CloseIcn } from '../../common/Icons/Icons'
import ToggleSwitch from '../../form-elements/ToggleSwitch'
import SelectInput from '../../form-elements/SelectInput'
import TextareaInput from '../../form-elements/TextareaInput'
import { makeParser } from '@icure/medication-sdk'

import { v4 as uuid } from 'uuid'

import './index.scss'
import { Duration, Medication, Medicinalproduct, Substanceproduct } from '@icure/be-fhc-lite-api'
import { createFhcFromCode } from '../../../services/fhc'
import { offsetDate } from '../../../services/fhc'

import { durationTimeUnits, findCommonSequence, periodicityTimeUnits, pharmacistVisibilityOptions, practitionerVisibilityOptions, reimbursementOptions } from '../../../helpers'
import { MedicationType, PharmacistVisibility, PractitionerVisibility, PrescribedMedicationType } from '../../../types'
import Button from '../../form-elements/Button'
import RadioInput from '../../form-elements/RadioInput'

interface Props {
  medicationToPrescribe?: MedicationType
  prescribedMedication?: PrescribedMedicationType
  handleClose: () => void
  handleSave: (meds: PrescribedMedicationType[]) => void
  modalTitle: string
}

const PrescriptionModal: React.FC<Props> = ({ medicationToPrescribe, prescribedMedication, handleClose, handleSave, modalTitle }) => {
  // State for all form fields and logic
  const [dosage, setDosage] = useState<string>(prescribedMedication?.medication?.instructionForPatient ?? '')
  const [duration, setDuration] = useState<number>(prescribedMedication?.medication?.duration?.value ?? 1)
  const [durationTimeUnit, setDurationTimeUnit] = useState<string>(prescribedMedication?.medication?.duration?.unit?.code ?? durationTimeUnits[0].value)
  const [treatmentStartDate, setTreatmentStartDate] = useState<string>(() => {
    if (prescribedMedication?.medication?.beginMoment) {
      // Format as YYYY-MM-DD
      const dateNumber = prescribedMedication.medication.beginMoment
      const year = Math.floor(dateNumber / 10000)
      const month = Math.floor((dateNumber % 10000) / 100)
        .toString()
        .padStart(2, '0')
      const day = (dateNumber % 100).toString().padStart(2, '0')
      return `${year}-${month}-${day}`
    }
    return new Date().toISOString().split('T')[0]
  })
  const [executableUntil, setExecutableUntil] = useState<string>(() => {
    if (prescribedMedication?.medication?.endMoment) {
      const dateNumber = prescribedMedication.medication.endMoment
      const year = Math.floor(dateNumber / 10000)
      const month = Math.floor((dateNumber % 10000) / 100)
        .toString()
        .padStart(2, '0')
      const day = (dateNumber % 100).toString().padStart(2, '0')
      return `${year}-${month}-${day}`
    }
    const startDay = new Date()
    const nextYear = new Date(startDay)
    nextYear.setFullYear(startDay.getFullYear() + 1)
    return nextYear.toISOString().split('T')[0]
  })
  const [prescriptionsNumber, setPrescriptionsNumber] = useState<number>(1)
  const [periodicityTimeUnit, setPeriodicityTimeUnit] = useState<string>(periodicityTimeUnits[0].value)
  const [periodicityDaysNumber, setPeriodicityDaysNumber] = useState<number>(1)
  const [substitutionAllowed, setSubstitutionAllowed] = useState<boolean>(prescribedMedication?.medication?.substitutionAllowed ?? false)
  const [showExtraFields, setShowExtraFields] = useState(false)
  const [recipeInstructionForPatient, setRecipeInstructionForPatient] = useState<string | undefined>(prescribedMedication?.medication?.recipeInstructionForPatient ?? undefined)
  const [instructionsForReimbursement, setInstructionsForReimbursement] = useState<string | undefined>(prescribedMedication?.medication?.instructionsForReimbursement ?? undefined)
  const [practitionerVisibility, setPractitionerVisibility] = useState<string>(prescribedMedication?.prescriberVisibility ?? practitionerVisibilityOptions[0]?.value)
  const [pharmacistVisibility, setPharmacistVisibility] = useState<string>(prescribedMedication?.pharmacistVisibility ?? pharmacistVisibilityOptions[0]?.value)
  const [errors, setErrors] = useState<{ [inputName: string]: { validationError?: string } }>({})
  const [posologySuggestions, setPosologySuggestions] = useState<string[]>([])
  const [focusedDosageIndex, setFocusedDosageIndex] = useState(-1)
  const resultRefs = useRef<(HTMLLIElement | null)[]>([])
  const [disableHover, setDisableHover] = useState(false)
  const [dosageFromSuggestion, setDosageFromSuggestion] = useState<string>('')

  // Placeholder: medicationTitle logic
  const medicationTitle = medicationToPrescribe?.title ?? prescribedMedication?.medication?.medicinalProduct?.intendedname ?? ''

  // Error messages
  const errorMessages = {
    isRequired: 'Ce champ est obligatoire.',
  }
  const { completePosology: completeDosage } = makeParser('fr')
  const dosageRef = useRef(dosage)
  useEffect(() => {
    dosageRef.current = dosage
  }, [dosage])

  useEffect(() => {
    const dosageWhenCalled = dosage
    setTimeout(() => {
      if (dosageWhenCalled && dosageWhenCalled === dosageRef.current && dosageWhenCalled != dosageFromSuggestion) {
        setPosologySuggestions(completeDosage(dosageWhenCalled))
      }
    }, 100)
  }, [dosage])

  // Validation logic
  const validateForm = (data: { [inputName: string]: any }) => {
    const setError = (inputName: string, isValid: boolean) => {
      setErrors((prev) => ({
        ...prev,
        [inputName]: {
          validationError: !isValid ? errorMessages.isRequired : undefined,
        },
      }))
    }
    const isRequiredFieldValid = (value: string | number) => value != null && value !== ''
    const inputsToValidate = [
      'dosage',
      'duration',
      'durationTimeUnit',
      'treatmentStartDate',
      'executableUntil',
      'prescriptionsNumber',
      'substitutionAllowed',
      prescriptionsNumber && prescriptionsNumber > 1 ? 'periodicityTimeUnit' : null,
      periodicityTimeUnit && periodicityTimeUnit === '1' ? 'periodicityDaysNumber' : null,
    ].filter((x): x is string => !!x)
    inputsToValidate.forEach((input) => setError(input, isRequiredFieldValid(data[input])))
  }

  const isFormValid = () => {
    return !Object.keys(errors).some((inputName) => errors[inputName].validationError)
  }

  // Submit logic
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const data = {
      dosage,
      duration,
      durationTimeUnit,
      treatmentStartDate,
      executableUntil,
      prescriptionsNumber,
      periodicityTimeUnit,
      periodicityDaysNumber,
      substitutionAllowed,
      recipeInstructionForPatient,
      instructionsForReimbursement,
      prescriberVisibility: practitionerVisibility,
      pharmacistVisibility: pharmacistVisibility,
    }
    validateForm(data)
    if (isFormValid()) {
      const getDurationInDays = (timeUnit: string, value: number) => {
        if (timeUnit === 'jour') {
          return value
        } else if (timeUnit === 'semaine') {
          return value * 7
        }
      }
      const prescribedMedications = prescribedMedication
        ? [
            {
              ...prescribedMedication,
              medication: new Medication({
                ...prescribedMedication.medication,

                duration: new Duration({
                  unit: createFhcFromCode.from('CD-TIMEUNIT', 'D'),
                  value: getDurationInDays(data.durationTimeUnit as string, data.duration as number),
                }),
                instructionForPatient: data.dosage,
                recipeInstructionForPatient: data.recipeInstructionForPatient,
                instructionsForReimbursement: data.instructionsForReimbursement,
                substitutionAllowed: data.substitutionAllowed,
              }),
              prescriberVisibility: data.prescriberVisibility as PractitionerVisibility,
              pharmacistVisibility: data.pharmacistVisibility as PharmacistVisibility,
            },
          ]
        : Array.from({ length: data.prescriptionsNumber ?? 1 }, (_, i) => i).map(
            (idx): PrescribedMedicationType => ({
              uuid: uuid(),
              medication: new Medication({
                ...(medicationToPrescribe?.ampId && !medicationToPrescribe.genericPrescriptionRequired
                  ? {
                      medicinalProduct: new Medicinalproduct({
                        samId: medicationToPrescribe!.dmppProductId,
                        intendedcds: [createFhcFromCode.from('CD-DRUG-CNK', medicationToPrescribe!.cnk!)],
                        intendedname: medicationToPrescribe!.intendedName,
                      }),
                    }
                  : medicationToPrescribe?.vmpGroupId
                    ? {
                        substanceProduct: new Substanceproduct({
                          samId: medicationToPrescribe!.vmpGroupId,
                          intendedcds: [createFhcFromCode.from('CD_VMPGROUP', medicationToPrescribe!.vmpGroupId!)],
                          intendedname: medicationToPrescribe?.vmpTitle ?? medicationToPrescribe!.title,
                        }),
                      }
                    : {
                        compoundPrescription: medicationToPrescribe!.title,
                      }),
                beginMoment: offsetDate(
                  parseInt((data.treatmentStartDate as string).replace(/-/g, '')),
                  data.periodicityTimeUnit ? parseInt(data.periodicityTimeUnit) * (data.periodicityDaysNumber ?? 1) * idx : 0,
                ),
                endMoment: offsetDate(
                  parseInt((data.executableUntil as string).replace(/-/g, '')),
                  data.periodicityTimeUnit ? parseInt(data.periodicityTimeUnit) * (data.periodicityDaysNumber ?? 1) * idx : 0,
                ),

                duration: new Duration({
                  unit: createFhcFromCode.from('CD-TIMEUNIT', 'D'),
                  value: getDurationInDays(data.durationTimeUnit as string, data.duration as number),
                }),

                instructionForPatient: data.dosage,
                recipeInstructionForPatient: data.recipeInstructionForPatient,
                instructionsForReimbursement: data.instructionsForReimbursement,
                substitutionAllowed: data.substitutionAllowed,
              }),
              prescriberVisibility: data.prescriberVisibility as PractitionerVisibility,
              pharmacistVisibility: data.pharmacistVisibility as PharmacistVisibility,
            }),
          )

      handleSave(prescribedMedications)
      handleClose()
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const length = posologySuggestions.length
    const defaultActions = () => {
      event.preventDefault()
      setDisableHover(true)
    }
    if (event.key === 'ArrowDown') {
      defaultActions()
      setFocusedDosageIndex((prev) => (prev + 1) % length)
      scrollToFocusedItem((focusedDosageIndex + 1) % length)
    } else if (event.key === 'ArrowUp') {
      defaultActions()
      setFocusedDosageIndex((prev) => (prev - 1 + length) % length)
      scrollToFocusedItem((focusedDosageIndex - 1 + length) % length)
    } else if (event.key === 'Enter' && focusedDosageIndex >= 0) {
      event.preventDefault()
      setDisableHover(false)
      validateSuggestion(posologySuggestions[focusedDosageIndex])
    } else if (event.key === 'Escape') {
      if (posologySuggestions.length) {
        event.preventDefault()
        event.stopPropagation()
        setPosologySuggestions([])
        setFocusedDosageIndex(-1)
      }
    } else if (event.key === 'Enter') {
      handleSubmit(event as any)
    }
  }

  const scrollToFocusedItem = (index: number) => {
    if (index >= 0 && resultRefs.current[index]) {
      resultRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }

  const handleMouseMove = () => {
    setDisableHover(false)
  }

  const validateSuggestion = (suggestion: string) => {
    if (suggestion) {
      const common = findCommonSequence(dosage ?? '', suggestion)
      setDosage((dosageRef.current + (common.length ? suggestion.slice(common.length) : ' ' + suggestion)).replace(/ {2,}/g, ' ').replace(/\/ /g, '/'))
      setDosageFromSuggestion(dosageRef.current)
      setPosologySuggestions([])
      setFocusedDosageIndex(1)
    }
  }

  return (
    <div className="addMedicationModal">
      <div className="addMedicationModal__content">
        <form id="prescriptionForm" className="addMedicationForm" onSubmit={handleSubmit} autoComplete="off">
          <div className="addMedicationForm__header">
            <h3>{modalTitle}</h3>
            <button className="addMedicationForm__header__closeIcn" onClick={handleClose} type="button">
              <CloseIcn />
            </button>
          </div>
          <div
            className="addMedicationForm__body"
            onKeyDown={handleKeyDown}
            role="listbox"
            tabIndex={0}
            aria-activedescendant={focusedDosageIndex >= 0 ? `posology-${focusedDosageIndex}` : undefined}
          >
            <div className="addMedicationForm__body__content">
              <TextInput label="Nom du médicament" value={medicationTitle} required disabled id="drugName" />
              <div className="dosageInput">
                <TextInput
                  label="Posologie"
                  id="dosage"
                  value={dosage}
                  onChange={(e) => setDosage(e.target.value)}
                  required
                  autoFocus
                  errorMessage={errors.dosage?.validationError}
                />
                {posologySuggestions.length !== 0 && (
                  <ul className="dosageInput__dropdown" onMouseMove={handleMouseMove}>
                    {posologySuggestions.map((posology, index) => (
                      <li key={index} id={`posology-${index}`} className={`${disableHover ? 'disableHover' : ''} ${focusedDosageIndex === index ? 'focused' : ''}`}>
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            validateSuggestion(posology)
                          }}
                        >
                          {posology}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="addMedicationForm__body__content__inputsGroup">
                <TextInput
                  label="Durée (nombre d’unités)"
                  id="duration"
                  type="number"
                  min={1}
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  required
                  errorMessage={errors.duration?.validationError}
                />
                <SelectInput label="Unité de temps" id="durationTimeUnit" required options={durationTimeUnits} value={durationTimeUnit} onChange={setDurationTimeUnit} />
              </div>
              <div className="addMedicationForm__body__content__inputsGroup">
                <TextInput
                  label="Date début du traitement"
                  id="treatmentStartDate"
                  type="date"
                  value={treatmentStartDate}
                  onChange={(e) => setTreatmentStartDate(e.target.value)}
                  required
                  errorMessage={errors.treatmentStartDate?.validationError}
                />
                <TextInput
                  label="Exécutable jusqu`au"
                  id="executableUntil"
                  type="date"
                  value={executableUntil}
                  onChange={(e) => setExecutableUntil(e.target.value)}
                  required
                  errorMessage={errors.executableUntil?.validationError}
                />
              </div>
              {!prescribedMedication && (
                <div className="addMedicationForm__body__content__inputsGroup">
                  <TextInput
                    label="Nombre de prescriptions"
                    id="prescriptionsNumber"
                    type="number"
                    min={1}
                    max={12}
                    value={prescriptionsNumber}
                    onChange={(e) => setPrescriptionsNumber(Number(e.target.value))}
                    required
                    errorMessage={errors.prescriptionsNumber?.validationError}
                  />
                  {prescriptionsNumber && prescriptionsNumber > 1 && (
                    <SelectInput
                      label="Périodicité"
                      id="periodicityTimeUnit"
                      required
                      options={periodicityTimeUnits}
                      value={periodicityTimeUnit}
                      onChange={setPeriodicityTimeUnit}
                    />
                  )}
                  {periodicityTimeUnit === '1' && (
                    <TextInput
                      label="Nombre de jours"
                      id="periodicityDaysNumber"
                      type="number"
                      min={1}
                      value={periodicityDaysNumber}
                      onChange={(e) => setPeriodicityDaysNumber(Number(e.target.value))}
                      required
                      errorMessage={errors.periodicityDaysNumber?.validationError}
                    />
                  )}
                </div>
              )}
              <div className="addMedicationForm__body__content__radioBtns">
                <RadioInput
                  name="substitutionAllowed"
                  value={substitutionAllowed}
                  label="Substitution autorisée"
                  options={[
                    { label: 'Non', value: false, id: 'substitutionIsNotAllowed' },
                    { label: 'Oui', value: true, id: 'substitutionIsAllowed' },
                  ]}
                  required
                  errorMessage={errors.substitutionAllowed?.validationError}
                  onChange={setSubstitutionAllowed}
                />
              </div>
            </div>

            <ToggleSwitch id="showExtraFields" value="Afficher plus" checked={showExtraFields} onChange={setShowExtraFields} />

            {!showExtraFields ? (
              <div className="addMedicationForm__body__extraFieldsPreview">
                <p>
                  <span>Instructions pour le patient:</span>
                  <i>
                    <span>{recipeInstructionForPatient || 'Aucun'}</span>
                  </i>
                </p>
                <p>
                  <span>Instructions remboursement:</span>
                  <i>
                    <span>{reimbursementOptions.find((x) => x.value === instructionsForReimbursement)?.label || 'Aucun'}</span>
                  </i>
                </p>
                <p>
                  <span>Visibilité prescripteur: </span>
                  <i>
                    <span>{practitionerVisibilityOptions.find((o) => o.value === practitionerVisibility)?.label}</span>
                  </i>
                </p>
                <p>
                  <span>Visibilité officine:</span>
                  <i>
                    <span>{pharmacistVisibilityOptions.find((o) => o.value === pharmacistVisibility)?.label}</span>
                  </i>
                </p>
              </div>
            ) : (
              <div className="addMedicationForm__body__content">
                <TextareaInput
                  label="Instructions pour le patient"
                  id="recipeInstructionForPatient"
                  value={recipeInstructionForPatient}
                  onChange={setRecipeInstructionForPatient}
                />
                <SelectInput
                  label="Instructions remboursement"
                  id="instructionsForReimbursement"
                  value={instructionsForReimbursement}
                  onChange={setInstructionsForReimbursement}
                  options={reimbursementOptions}
                />
                <SelectInput
                  label="Visibilité prescripteur"
                  id="prescriberVisibility"
                  value={practitionerVisibility}
                  onChange={setPractitionerVisibility}
                  options={practitionerVisibilityOptions}
                />
                <SelectInput
                  label="Visibilité officine"
                  id="pharmacyVisibility"
                  value={pharmacistVisibility}
                  onChange={setPharmacistVisibility}
                  options={pharmacistVisibilityOptions}
                />
              </div>
            )}
          </div>

          <div className="addMedicationForm__footer">
            <Button title="Cancel" type="reset" view={'outlined'} onClick={handleClose} />
            <Button title="Save" type="submit" view={'primary'}>
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PrescriptionModal
