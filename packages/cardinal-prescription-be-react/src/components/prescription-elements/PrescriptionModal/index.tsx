import React, { KeyboardEvent, useEffect, useRef, useState } from 'react'
import { makeParser } from '@icure/medication-sdk'
import { Duration, Medication, Medicinalproduct, Substanceproduct } from '@icure/be-fhc-lite-api'
import { v4 as uuid } from 'uuid'
import { MedicationType, PharmacistVisibilityType, PractitionerVisibilityType, PrescribedMedicationType } from '../../../types'
import { createFhcCode } from '../../../services/fhc'
import { getExecutableUntilDate, getTreatmentStartDate, offsetDate } from '../../../utils/date-helpers'
import { findCommonSequence } from '../../../utils/dosage-helpers'
import { cardinalLanguage, t } from '../../../services/i18n'
import { SamText } from '@icure/cardinal-be-sam-sdk'
import { durationTimeUnitsEnum, getDurationFromDays, getDurationInDays, getDurationTimeUnits, getPeriodicityTimeUnits } from '../../../utils/prescription-duration-helpers'
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
import { Controller, useForm } from 'react-hook-form'
import { trim } from '../../../utils/string-helpers'

interface Props {
  medicationToPrescribe?: MedicationType
  prescriptionToModify?: PrescribedMedicationType

  onClose: () => void
  onSubmit: (meds: PrescribedMedicationType[]) => void

  modalMood: 'create' | 'modify'
}

type PrescriptionFormType = {
  medicationTitle: string
  dosage: string
  duration: number
  durationTimeUnit: string
  treatmentStartDate: string
  executableUntil: string
  prescriptionsNumber: number
  periodicityTimeUnit: string
  periodicityDaysNumber: number
  substitutionAllowed: boolean
  showExtraFields: boolean
  recipeInstructionForPatient?: string
  instructionsForReimbursement?: string
  prescriberVisibility?: string
  pharmacistVisibility?: string
}

export const PrescriptionModal: React.FC<Props> = ({ medicationToPrescribe, prescriptionToModify, onClose, onSubmit, modalMood }) => {
  // State for all form fields and logic

  const [posologySuggestions, setPosologySuggestions] = useState<string[]>([])
  const [focusedDosageIndex, setFocusedDosageIndex] = useState(-1)
  const [disableHover, setDisableHover] = useState(false)
  const [dosageFromSuggestion, setDosageFromSuggestion] = useState<string>('')

  const resultRefs = useRef<(HTMLLIElement | null)[]>([])

  const defaultValues = {
    medicationTitle: trim(
      medicationToPrescribe?.title ??
        prescriptionToModify?.medication?.medicinalProduct?.intendedname ??
        prescriptionToModify?.medication?.substanceProduct?.intendedname ??
        prescriptionToModify?.medication?.compoundPrescription ??
        '',
    ),
    dosage: prescriptionToModify?.medication?.instructionForPatient ?? '',
    duration: getDurationFromDays(prescriptionToModify?.medication?.duration?.value ?? 1).duration,
    durationTimeUnit: getDurationFromDays(prescriptionToModify?.medication?.duration?.value ?? 1).durationTimeUnit,
    treatmentStartDate: getTreatmentStartDate(prescriptionToModify),
    executableUntil: getExecutableUntilDate(prescriptionToModify),
    prescriptionsNumber: 1,
    substitutionAllowed: prescriptionToModify?.medication?.substitutionAllowed ?? false,
    showExtraFields: false,
    periodicityTimeUnit: getPeriodicityTimeUnits()[0].value,
    periodicityDaysNumber: 1,
    recipeInstructionForPatient: prescriptionToModify?.medication?.recipeInstructionForPatient ?? undefined,
    instructionsForReimbursement: prescriptionToModify?.medication?.instructionsForReimbursement ?? undefined,
    prescriberVisibility: prescriptionToModify?.prescriberVisibility ?? getPractitionerVisibilityOptions()[0]?.value,
    pharmacistVisibility: prescriptionToModify?.pharmacistVisibility ?? getPharmacistVisibilityOptions()[0]?.value,
  }

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    control,
    formState: { errors: prescriptionFormErrors },
  } = useForm<PrescriptionFormType>({ defaultValues })

  const dosage = watch('dosage')
  const prescriptionsNumber = watch('prescriptionsNumber')
  const periodicityTimeUnit = watch('periodicityTimeUnit')
  const showExtraFields = watch('showExtraFields')
  const recipeInstructionForPatient = watch('recipeInstructionForPatient')
  const instructionsForReimbursement = watch('instructionsForReimbursement')
  const prescriberVisibility = watch('prescriberVisibility')
  const pharmacistVisibility = watch('pharmacistVisibility')

  const language: keyof SamText = cardinalLanguage.getLanguage()

  const { completePosology: completeDosage } = makeParser(language)
  const dosageRef = useRef(dosage)
  useEffect(() => {
    if (dosage !== undefined) {
      dosageRef.current = dosage
    }
  }, [dosage])

  useEffect(() => {
    const dosageWhenCalled = dosage
    setTimeout(() => {
      if (dosageWhenCalled && dosageWhenCalled === dosageRef.current && dosageWhenCalled != dosageFromSuggestion) {
        setPosologySuggestions(completeDosage(dosageWhenCalled))
      }
    }, 100)
  }, [dosage])

  const handleModalClose = () => {
    onClose()
    reset()
  }

  const handleFormSubmit = (data: PrescriptionFormType) => {
    const {
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
      prescriberVisibility,
      pharmacistVisibility,
    } = data
    const prescribedMedications = prescriptionToModify
      ? [
          {
            ...prescriptionToModify,
            medication: new Medication({
              ...prescriptionToModify.medication,
              beginMoment: offsetDate(
                parseInt((treatmentStartDate as string)?.replace(/-/g, '')),
                periodicityTimeUnit ? parseInt(periodicityTimeUnit) * (periodicityDaysNumber ?? 1) : 0,
              ),
              endMoment: offsetDate(
                parseInt((executableUntil as string)?.replace(/-/g, '')),
                periodicityTimeUnit ? parseInt(periodicityTimeUnit) * (periodicityDaysNumber ?? 1) : 0,
              ),
              duration: new Duration({
                unit: createFhcCode('CD-TIMEUNIT', 'D'),
                value: getDurationInDays(durationTimeUnit as durationTimeUnitsEnum, duration as number),
              }),
              instructionForPatient: dosage,
              recipeInstructionForPatient: recipeInstructionForPatient,
              instructionsForReimbursement: instructionsForReimbursement,
              substitutionAllowed: substitutionAllowed,
            }),
            prescriberVisibility: prescriberVisibility as PractitionerVisibilityType,
            pharmacistVisibility: pharmacistVisibility as PharmacistVisibilityType,
          },
        ]
      : Array.from({ length: prescriptionsNumber ?? 1 }, (_, i) => i).map(
          (idx): PrescribedMedicationType => ({
            uuid: uuid(),
            medication: new Medication({
              ...(medicationToPrescribe?.ampId && !medicationToPrescribe.genericPrescriptionRequired
                ? {
                    medicinalProduct: new Medicinalproduct({
                      samId: medicationToPrescribe.dmppProductId,
                      intendedcds: [createFhcCode('CD-DRUG-CNK', medicationToPrescribe.cnk)],
                      intendedname: trim(medicationToPrescribe.intendedName),
                    }),
                  }
                : medicationToPrescribe?.vmpGroupId
                  ? {
                      substanceProduct: new Substanceproduct({
                        samId: medicationToPrescribe.vmpGroupId,
                        intendedcds: [createFhcCode('CD_VMPGROUP', medicationToPrescribe.vmpGroupId)],
                        intendedname: trim(medicationToPrescribe?.vmpTitle ?? medicationToPrescribe.title),
                      }),
                    }
                  : {
                      compoundPrescription: trim(medicationToPrescribe.title),
                    }),
              beginMoment: offsetDate(
                parseInt((treatmentStartDate as string)?.replace(/-/g, '')),
                periodicityTimeUnit ? parseInt(periodicityTimeUnit) * (periodicityDaysNumber ?? 1) * idx : 0,
              ),
              endMoment: offsetDate(
                parseInt((executableUntil as string)?.replace(/-/g, '')),
                periodicityTimeUnit ? parseInt(periodicityTimeUnit) * (periodicityDaysNumber ?? 1) * idx : 0,
              ),

              duration: new Duration({
                unit: createFhcCode('CD-TIMEUNIT', 'D'),
                value: getDurationInDays(durationTimeUnit as durationTimeUnitsEnum, duration as number),
              }),

              instructionForPatient: dosage,
              recipeInstructionForPatient: recipeInstructionForPatient,
              instructionsForReimbursement: instructionsForReimbursement,
              substitutionAllowed: substitutionAllowed,
            }),
            prescriberVisibility: prescriberVisibility as PractitionerVisibilityType,
            pharmacistVisibility: pharmacistVisibility as PharmacistVisibilityType,
          }),
        )

    onSubmit(prescribedMedications)
    handleModalClose()
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
      handleSubmit(handleFormSubmit)
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
      setValue('dosage', (dosageRef.current + (common.length ? suggestion.slice(common.length) : ' ' + suggestion))?.replace(/ {2,}/g, ' ')?.replace(/\/ /g, '/'), {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      })
      setDosageFromSuggestion(dosageRef.current)
      setPosologySuggestions([])
      setFocusedDosageIndex(1)
    }
  }

  return (
    <>
      <GlobalStyles />
      <StyledPrescriptionModal className="StyledPrescriptionModal">
        <div className="content">
          <form id="prescriptionForm" className="addMedicationForm" onSubmit={handleSubmit(handleFormSubmit)} autoComplete="off">
            <div className="addMedicationForm__header">
              <h3>{modalMood === 'create' ? t('prescription.createTitle') : t('prescription.modifyTitle')}</h3>
              <button className="addMedicationForm__header__closeIcn" onClick={handleModalClose} type="reset">
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
                <TextInput
                  label={t('prescription.form.medicationTitle')}
                  required
                  disabled
                  id="medicationTitle"
                  {...register('medicationTitle', {
                    required: t('prescription.form.fieldRequired'),
                  })}
                  errorMessage={prescriptionFormErrors['medicationTitle']?.message}
                />
                <StyledDosageInput className="StyledDosageInput">
                  <TextInput
                    label={t('prescription.form.dosage')}
                    id="dosage"
                    required
                    autoFocus
                    {...register('dosage', {
                      required: t('prescription.form.fieldRequired'),
                    })}
                    errorMessage={prescriptionFormErrors['dosage']?.message}
                  />
                  {posologySuggestions.length !== 0 && (
                    <ul className="suggestionsDropdown" onMouseMove={handleMouseMove}>
                      {posologySuggestions.map((posology, index) => (
                        <StyledSuggestionItem
                          key={index}
                          id={`posology-${index}`}
                          $disableHover={disableHover}
                          $focused={focusedDosageIndex === index}
                          className="StyledSuggestionItem"
                        >
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
                    required
                    {...register('duration', {
                      required: t('prescription.form.fieldRequired'),
                    })}
                    errorMessage={prescriptionFormErrors['duration']?.message}
                  />
                  <Controller
                    name="durationTimeUnit"
                    control={control}
                    rules={{ required: t('prescription.form.fieldRequired') }}
                    render={({ field }) => (
                      <SelectInput
                        {...field}
                        label={t('prescription.form.durationTimeUnit')}
                        id="durationTimeUnit"
                        required
                        options={getDurationTimeUnits()}
                        errorMessage={prescriptionFormErrors['durationTimeUnit']?.message}
                      />
                    )}
                  />
                </div>
                <div className="addMedicationForm__body__content__inputsGroup">
                  <TextInput
                    label={t('prescription.form.treatmentStartDate')}
                    id="treatmentStartDate"
                    type="date"
                    required
                    {...register('treatmentStartDate', {
                      required: t('prescription.form.fieldRequired'),
                    })}
                    errorMessage={prescriptionFormErrors['treatmentStartDate']?.message}
                  />
                  <TextInput
                    label={t('prescription.form.executableUntil')}
                    id="executableUntil"
                    type="date"
                    required
                    {...register('executableUntil', {
                      required: t('prescription.form.fieldRequired'),
                    })}
                    errorMessage={prescriptionFormErrors['executableUntil']?.message}
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
                      required
                      {...register('prescriptionsNumber', {
                        required: t('prescription.form.fieldRequired'),
                      })}
                      errorMessage={prescriptionFormErrors['prescriptionsNumber']?.message}
                    />
                    {prescriptionsNumber && prescriptionsNumber > 1 && (
                      <Controller
                        name="periodicityTimeUnit"
                        control={control}
                        rules={{ required: t('prescription.form.fieldRequired') }}
                        render={({ field }) => (
                          <SelectInput
                            {...field}
                            label={t('prescription.form.periodicityTimeUnit')}
                            id="periodicityTimeUnit"
                            required
                            options={getPeriodicityTimeUnits()}
                            errorMessage={prescriptionFormErrors['periodicityTimeUnit']?.message}
                          />
                        )}
                      />
                    )}
                    {periodicityTimeUnit === '1' && (
                      <TextInput
                        label={t('prescription.form.periodicityDaysNumber')}
                        id="periodicityDaysNumber"
                        type="number"
                        min={1}
                        required
                        {...register('periodicityDaysNumber', {
                          required: t('prescription.form.fieldRequired'),
                        })}
                        errorMessage={prescriptionFormErrors['periodicityDaysNumber']?.message}
                      />
                    )}
                  </div>
                )}
                <div className="addMedicationForm__body__content__radioBtns">
                  <Controller
                    name="substitutionAllowed"
                    control={control}
                    render={({ field }) => (
                      <RadioInput
                        {...field}
                        value={field.value}
                        onChange={(val) => field.onChange(val)}
                        label={t('prescription.form.substitutionAllowed')}
                        options={[
                          { label: 'Non', value: false, id: 'substitutionIsNotAllowed' },
                          { label: 'Oui', value: true, id: 'substitutionIsAllowed' },
                        ]}
                        required
                        errorMessage={prescriptionFormErrors['substitutionAllowed']?.message}
                      />
                    )}
                  />
                </div>
              </div>

              <Controller
                name="showExtraFields"
                control={control}
                render={({ field }) => <ToggleSwitch {...field} id="showExtraFields" value={t('prescription.form.toggleExtraFields')} />}
              />

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
                      <span>{getPractitionerVisibilityOptions().find((o) => o.value === prescriberVisibility)?.label}</span>
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
                  <TextareaInput label={t('prescription.form.patientInstructions')} id="recipeInstructionForPatient" {...register('recipeInstructionForPatient')} />
                  <Controller
                    name="instructionsForReimbursement"
                    control={control}
                    render={({ field }) => (
                      <SelectInput
                        {...field}
                        label={t('prescription.form.reimbursementInstructions')}
                        id="instructionsForReimbursement"
                        options={getReimbursementOptions()}
                        value={field.value ?? ''}
                        onChange={(e) => {
                          // Convert empty string back to null before updating RHF state
                          const val = e.target.value === '' ? null : e.target.value
                          field.onChange(val)
                        }}
                      />
                    )}
                  />
                  <Controller
                    name="prescriberVisibility"
                    control={control}
                    render={({ field }) => (
                      <SelectInput {...field} label={t('prescription.form.prescriberVisibility')} id="prescriberVisibility" options={getPractitionerVisibilityOptions()} />
                    )}
                  />

                  <Controller
                    name="pharmacistVisibility"
                    control={control}
                    render={({ field }) => (
                      <SelectInput
                        {...field}
                        label={t('prescription.form.pharmacistVisibility')}
                        id="pharmacistVisibility"
                        options={getPharmacistVisibilityOptions()}
                        value={field.value ?? ''}
                        onChange={(e) => {
                          // Convert empty string back to null before updating RHF state
                          const val = e.target.value === '' ? null : e.target.value
                          field.onChange(val)
                        }}
                      />
                    )}
                  />
                </div>
              )}
            </div>

            <div className="addMedicationForm__footer">
              <Button title={t('prescription.form.cancel')} type="reset" view={'outlined'} onClick={handleModalClose} />
              <Button title={t('prescription.form.submit')} type="submit" view={'primary'} />
            </div>
          </form>
        </div>
      </StyledPrescriptionModal>
    </>
  )
}
