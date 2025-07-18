import React, { KeyboardEvent, useEffect, useRef, useState } from 'react'
import { makeParser } from '@icure/medication-sdk'
import { Duration, Medication, Medicinalproduct, Substanceproduct } from '@icure/be-fhc-lite-api'
import { v4 as uuid } from 'uuid'
import { MedicationType, PharmacistVisibilityType, PractitionerVisibilityType, PrescribedMedicationType } from '../../../types'
import { createFhcCode } from '../../../services/fhc'
import { offsetDate } from '../../../utils/date-helpers'
import { findCommonSequence } from '../../../utils/dosage-helpers'
import { cardinalLanguage, t } from '../../../services/i18n'
import { SamText } from '@icure/cardinal-be-sam-sdk'
import { getDurationTimeUnits, getPeriodicityTimeUnits } from '../../../utils/prescription-duration-helpers'
import { getPharmacistVisibilityOptions, getPractitionerVisibilityOptions } from '../../../utils/visibility-helpers'
import { CloseIcn } from '../../common/Icons'
import { TextInput } from '../../form-elements/TextInput'
import { SelectInput } from '../../form-elements/SelectInput'
import { RadioInput } from '../../form-elements/RadioInput'
import { ToggleSwitch } from '../../form-elements/ToggleSwitch'
import { getReimbursementOptions } from '../../../utils/reimbursement-helpers'
import { TextareaInput } from '../../form-elements/TextareaInput'
import { Button } from '../../form-elements/Button'
import { StyledDosageInput, StyledPrescriptionModal, StyledSuggestionItem } from './styles'
import { GlobalStyles } from '../../../styles'

interface Props {
  medicationToPrescribe?: MedicationType
  prescriptionToModify?: PrescribedMedicationType

  onClose: () => void
  onSubmit: (meds: PrescribedMedicationType[]) => void

  modalMood: 'create' | 'modify'
}

export const PrescriptionModal: React.FC<Props> = ({ medicationToPrescribe, prescriptionToModify, onClose, onSubmit, modalMood }) => {
  // State for all form fields and logic
  const [dosage, setDosage] = useState<string>(prescriptionToModify?.medication?.instructionForPatient ?? '')
  const [duration, setDuration] = useState<number>(prescriptionToModify?.medication?.duration?.value ?? 1)
  const [durationTimeUnit, setDurationTimeUnit] = useState<string>(prescriptionToModify?.medication?.duration?.unit?.code ?? getDurationTimeUnits()[0].value)
  const [treatmentStartDate, setTreatmentStartDate] = useState<string>(() => {
    if (prescriptionToModify?.medication?.beginMoment) {
      // Format as YYYY-MM-DD
      const dateNumber = prescriptionToModify.medication.beginMoment
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
    if (prescriptionToModify?.medication?.endMoment) {
      const dateNumber = prescriptionToModify.medication.endMoment
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
  const [periodicityTimeUnit, setPeriodicityTimeUnit] = useState<string>(getPeriodicityTimeUnits()[0].value)
  const [periodicityDaysNumber, setPeriodicityDaysNumber] = useState<number>(1)
  const [substitutionAllowed, setSubstitutionAllowed] = useState<boolean>(prescriptionToModify?.medication?.substitutionAllowed ?? false)
  const [showExtraFields, setShowExtraFields] = useState(false)
  const [recipeInstructionForPatient, setRecipeInstructionForPatient] = useState<string | undefined>(prescriptionToModify?.medication?.recipeInstructionForPatient ?? undefined)
  const [instructionsForReimbursement, setInstructionsForReimbursement] = useState<string | undefined>(prescriptionToModify?.medication?.instructionsForReimbursement ?? undefined)
  const [practitionerVisibility, setPractitionerVisibility] = useState<string>(prescriptionToModify?.prescriberVisibility ?? getPractitionerVisibilityOptions()[0]?.value)
  const [pharmacistVisibility, setPharmacistVisibility] = useState<string>(prescriptionToModify?.pharmacistVisibility ?? getPharmacistVisibilityOptions()[0]?.value)
  const [errors, setErrors] = useState<{ [inputName: string]: { validationError?: string } }>({})
  const [posologySuggestions, setPosologySuggestions] = useState<string[]>([])
  const [focusedDosageIndex, setFocusedDosageIndex] = useState(-1)
  const resultRefs = useRef<(HTMLLIElement | null)[]>([])
  const [disableHover, setDisableHover] = useState(false)
  const [dosageFromSuggestion, setDosageFromSuggestion] = useState<string>('')

  // Placeholder: medicationTitle logic
  const medicationTitle = medicationToPrescribe?.title ?? prescriptionToModify?.medication?.medicinalProduct?.intendedname ?? ''

  // Error messages
  const errorMessages = {
    isRequired: 'Ce champ est obligatoire.',
  }

  const language: keyof SamText = cardinalLanguage.getLanguage()

  const { completePosology: completeDosage } = makeParser(language)
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
  const handleFormSubmit = (e: React.FormEvent) => {
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
      const prescribedMedications = prescriptionToModify
        ? [
            {
              ...prescriptionToModify,
              medication: new Medication({
                ...prescriptionToModify.medication,

                duration: new Duration({
                  unit: createFhcCode('CD-TIMEUNIT', 'D'),
                  value: getDurationInDays(data.durationTimeUnit as string, data.duration as number),
                }),
                instructionForPatient: data.dosage,
                recipeInstructionForPatient: data.recipeInstructionForPatient,
                instructionsForReimbursement: data.instructionsForReimbursement,
                substitutionAllowed: data.substitutionAllowed,
              }),
              prescriberVisibility: data.prescriberVisibility as PractitionerVisibilityType,
              pharmacistVisibility: data.pharmacistVisibility as PharmacistVisibilityType,
            },
          ]
        : Array.from({ length: data.prescriptionsNumber ?? 1 }, (_, i) => i).map(
            (idx): PrescribedMedicationType => ({
              uuid: uuid(),
              medication: new Medication({
                ...(medicationToPrescribe?.ampId && !medicationToPrescribe.genericPrescriptionRequired
                  ? {
                      medicinalProduct: new Medicinalproduct({
                        samId: medicationToPrescribe.dmppProductId,
                        intendedcds: [createFhcCode('CD-DRUG-CNK', medicationToPrescribe.cnk)],
                        intendedname: medicationToPrescribe.intendedName,
                      }),
                    }
                  : medicationToPrescribe?.vmpGroupId
                    ? {
                        substanceProduct: new Substanceproduct({
                          samId: medicationToPrescribe.vmpGroupId,
                          intendedcds: [createFhcCode('CD_VMPGROUP', medicationToPrescribe.vmpGroupId)],
                          intendedname: medicationToPrescribe?.vmpTitle ?? medicationToPrescribe.title,
                        }),
                      }
                    : {
                        compoundPrescription: medicationToPrescribe.title,
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
                  unit: createFhcCode('CD-TIMEUNIT', 'D'),
                  value: getDurationInDays(data.durationTimeUnit as string, data.duration as number),
                }),

                instructionForPatient: data.dosage,
                recipeInstructionForPatient: data.recipeInstructionForPatient,
                instructionsForReimbursement: data.instructionsForReimbursement,
                substitutionAllowed: data.substitutionAllowed,
              }),
              prescriberVisibility: data.prescriberVisibility as PractitionerVisibilityType,
              pharmacistVisibility: data.pharmacistVisibility as PharmacistVisibilityType,
            }),
          )

      onSubmit(prescribedMedications)
      onClose()
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
      handleFormSubmit(event as any)
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
    <>
      <GlobalStyles />
      <StyledPrescriptionModal>
        <div className="content">
          <form id="prescriptionForm" className="addMedicationForm" onSubmit={handleFormSubmit} autoComplete="off">
            <div className="addMedicationForm__header">
              <h3>{modalMood === 'create' ? t('prescription.createTitle') : t('prescription.modifyTitle')}</h3>
              <button className="addMedicationForm__header__closeIcn" onClick={onClose} type="reset">
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
                <TextInput label={t('prescription.form.medicationTitle')} value={medicationTitle} required disabled id="drugName" />
                <StyledDosageInput>
                  <TextInput
                    label={t('prescription.form.dosage')}
                    id="dosage"
                    value={dosage}
                    onChange={(e) => setDosage(e.target.value)}
                    required
                    autoFocus
                    errorMessage={errors.dosage?.validationError}
                  />
                  {posologySuggestions.length !== 0 && (
                    <ul className="suggestionsDropdown" onMouseMove={handleMouseMove}>
                      {posologySuggestions.map((posology, index) => (
                        <StyledSuggestionItem key={index} id={`posology-${index}`} $disableHover={disableHover} $focused={focusedDosageIndex === index}>
                          <button
                            onClick={(e) => {
                              e.preventDefault()
                              validateSuggestion(posology)
                            }}
                          >
                            {posology}
                          </button>
                        </StyledSuggestionItem>
                      ))}
                    </ul>
                  )}
                </StyledDosageInput>
                <div className="addMedicationForm__body__content__inputsGroup">
                  <TextInput
                    label={t('prescription.form.duration')}
                    id="duration"
                    type="number"
                    min={1}
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    required
                    errorMessage={errors.duration?.validationError}
                  />
                  <SelectInput
                    label={t('prescription.form.durationTimeUnit')}
                    id="durationTimeUnit"
                    required
                    options={getDurationTimeUnits()}
                    value={durationTimeUnit}
                    onChange={setDurationTimeUnit}
                  />
                </div>
                <div className="addMedicationForm__body__content__inputsGroup">
                  <TextInput
                    label={t('prescription.form.treatmentStartDate')}
                    id="treatmentStartDate"
                    type="date"
                    value={treatmentStartDate}
                    onChange={(e) => setTreatmentStartDate(e.target.value)}
                    required
                    errorMessage={errors.treatmentStartDate?.validationError}
                  />
                  <TextInput
                    label={t('prescription.form.executableUntil')}
                    id="executableUntil"
                    type="date"
                    value={executableUntil}
                    onChange={(e) => setExecutableUntil(e.target.value)}
                    required
                    errorMessage={errors.executableUntil?.validationError}
                  />
                </div>
                {!prescriptionToModify && (
                  <div className="addMedicationForm__body__content__inputsGroup">
                    <TextInput
                      label={t('prescription.form.prescriptionsNumber')}
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
                        label={t('prescription.form.periodicityTimeUnit')}
                        id="periodicityTimeUnit"
                        required
                        options={getPeriodicityTimeUnits()}
                        value={periodicityTimeUnit}
                        onChange={setPeriodicityTimeUnit}
                      />
                    )}
                    {periodicityTimeUnit === '1' && (
                      <TextInput
                        label={t('prescription.form.periodicityDaysNumber')}
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
                    // value={substitutionAllowed}
                    label={t('prescription.form.substitutionAllowed')}
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

              <ToggleSwitch id="showExtraFields" value={t('prescription.form.toggleExtraFields')} checked={showExtraFields} onChange={setShowExtraFields} />

              {!showExtraFields ? (
                <div className="addMedicationForm__body__extraFieldsPreview">
                  <p>
                    <span>{t('prescription.form.patientInstructions')} :</span>{' '}
                    <i>
                      <span>{recipeInstructionForPatient || t('prescription.form.instructionLabelNone')}</span>
                    </i>
                  </p>
                  <p>
                    <span>{t('prescription.form.reimbursementInstructions')} :</span>{' '}
                    <i>
                      <span>{getReimbursementOptions().find((x) => x.value === instructionsForReimbursement)?.label || t('prescription.form.instructionLabelNone')}</span>
                    </i>
                  </p>
                  <p>
                    <span>{t('prescription.form.prescriberVisibility')} :</span>{' '}
                    <i>
                      <span>{getPractitionerVisibilityOptions().find((o) => o.value === practitionerVisibility)?.label}</span>
                    </i>
                  </p>
                  <p>
                    <span>{t('prescription.form.pharmacistVisibility')} :</span>{' '}
                    <i>
                      <span>{getPharmacistVisibilityOptions().find((o) => o.value === pharmacistVisibility)?.label}</span>
                    </i>
                  </p>
                </div>
              ) : (
                <div className="addMedicationForm__body__content">
                  <TextareaInput
                    label={t('prescription.form.patientInstructions')}
                    id="recipeInstructionForPatient"
                    value={recipeInstructionForPatient}
                    onChange={setRecipeInstructionForPatient}
                  />
                  <SelectInput
                    label={t('prescription.form.reimbursementInstructions')}
                    id="instructionsForReimbursement"
                    value={instructionsForReimbursement}
                    onChange={setInstructionsForReimbursement}
                    options={getReimbursementOptions()}
                  />
                  <SelectInput
                    label={t('prescription.form.prescriberVisibility')}
                    id="prescriberVisibility"
                    value={practitionerVisibility}
                    onChange={setPractitionerVisibility}
                    options={getPractitionerVisibilityOptions()}
                  />
                  <SelectInput
                    label={t('prescription.form.pharmacistVisibility')}
                    id="pharmacyVisibility"
                    value={pharmacistVisibility}
                    onChange={setPharmacistVisibility}
                    options={getPharmacistVisibilityOptions()}
                  />
                </div>
              )}
            </div>

            <div className="addMedicationForm__footer">
              <Button title={t('prescription.form.cancel')} type="reset" view={'outlined'} onClick={onClose} />
              <Button title={t('prescription.form.submit')} type="submit" view={'primary'} />
            </div>
          </form>
        </div>
      </StyledPrescriptionModal>
    </>
  )
}
