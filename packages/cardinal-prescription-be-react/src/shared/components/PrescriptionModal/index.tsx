import React, { KeyboardEvent, useEffect, useMemo, useRef, useState } from 'react'
import { makeParser, marshal, RegimenItem as ParsedRegimenItem } from '@icure/medication-sdk'
import { MagistralText } from '@icure/be-fhc-lite-api'
import { SamText, SamV2Api } from '@icure/cardinal-be-sam-sdk'
import { MedicationType, PrescribedMedicationType } from '../../types'
import { getExecutableUntilDate, getTreatmentStartDate } from '../../../internal/utils/date-helpers'
import { suffixPrefixOverlap } from '../../../internal/utils/dosage-helpers'
import { cardinalLanguage, t } from '../../services/i18n'
import { getDurationFromDays, getDurationTimeUnits, getPeriodicityTimeUnits } from '../../../internal/utils/prescription-duration-helpers'
import { getPharmacistVisibilityOptions, getPractitionerVisibilityOptions } from '../../../internal/utils/visibility-helpers'
import { CloseIcn } from '../../../internal/components/common/Icons'
import { TextInput } from '../../../internal/components/form-elements/TextInput'
import { SelectInput } from '../../../internal/components/form-elements/SelectInput'
import { RadioInput } from '../../../internal/components/form-elements/RadioInput'
import { ToggleSwitch } from '../../../internal/components/form-elements/ToggleSwitch'
import { getReimbursementOptions } from '../../../internal/utils/reimbursement-helpers'
import { TextareaInput } from '../../../internal/components/form-elements/TextareaInput'
import { Button } from '../../../internal/components/form-elements/Button'
import { StyledDosageInput, StyledPrescriptionModal, StyledSuggestionItem } from './styles'
import { GlobalStyles } from '../../../styles'
import { Controller, useForm } from 'react-hook-form'
import { trim } from '../../../internal/utils/string-helpers'
import { CheapAlternatives } from '../../../internal/components/medication-elements/CheapAlternatives'
import { StandardDosages } from '../../../internal/components/medication-elements/StandardDosages'
import { createPosologyFromStandardDosage, createPrescribedMedication, StandardDosageContext } from '../../../internal/services/prescription/create-prescription'
import { PrescriptionFormType as ServicePrescriptionFormType } from '../../../internal/types'

interface Props {
  sdk: SamV2Api
  medicationToPrescribe?: MedicationType
  prescriptionToModify?: PrescribedMedicationType
  alternativeCheapMedications?: MedicationType[]
  standardDosageContext?: StandardDosageContext

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

export const PrescriptionModal: React.FC<Props> = ({
  sdk,
  medicationToPrescribe,
  prescriptionToModify,
  alternativeCheapMedications,
  standardDosageContext,
  onClose,
  onSubmit,
  modalMood,
}) => {
  // State for all form fields and logic

  const [posologySuggestions, setPosologySuggestions] = useState<string[]>([])
  const [focusedDosageIndex, setFocusedDosageIndex] = useState(-1)
  const [disableHover, setDisableHover] = useState(false)
  const [dosageFromSuggestion, setDosageFromSuggestion] = useState<string>('')

  // The medication being prescribed and its cheaper alternatives are stateful so
  // the user can swap the prescribed medication for a cheaper alternative.
  const [medication, setMedication] = useState<MedicationType | undefined>(medicationToPrescribe)
  const [alternatives, setAlternatives] = useState<MedicationType[]>(alternativeCheapMedications ?? [])

  const resultRefs = useRef<(HTMLLIElement | null)[]>([])

  const defaultValues = {
    medicationTitle: trim(
      medicationToPrescribe?.title ??
        prescriptionToModify?.medication?.medicinalProduct?.intendedname ??
        prescriptionToModify?.medication?.substanceProduct?.intendedname ??
        prescriptionToModify?.medication?.compoundPrescription ??
        (prescriptionToModify?.medication?.compoundPrescriptionV2 as MagistralText)?.text ??
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

  // SAM-suggested standard dosages for the prescribed medication's VMP group,
  // filtered by the patient context supplied by the host app.
  const standardDosages = useMemo<ParsedRegimenItem[]>(
    () => (medication?.vmpGroup ? createPosologyFromStandardDosage(medication.vmpGroup, standardDosageContext ?? {}) : []),
    [medication, standardDosageContext],
  )

  const onSelectStandardDosage = (item: ParsedRegimenItem) => {
    setValue('dosage', marshal(item, language), { shouldValidate: true, shouldDirty: true, shouldTouch: true })
  }

  const onSelectAlternativeMedication = (selected: MedicationType) => {
    setAlternatives((prev) => {
      const withoutSelected = prev.filter((m) => m !== selected)
      return medication ? [medication, ...withoutSelected] : withoutSelected
    })
    setMedication(selected)
    setValue('medicationTitle', trim(selected.title), { shouldValidate: true, shouldDirty: true, shouldTouch: true })
  }

  const handleModalClose = () => {
    onClose()
    reset()
  }

  const handleFormSubmit = (data: PrescriptionFormType) => {
    const prescribedMedications = createPrescribedMedication(data as unknown as ServicePrescriptionFormType, prescriptionToModify, medication)

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
    } else if (event.key === 'Enter') {
      // Enter never submits the form from within the dosage field; it only
      // accepts the focused posology suggestion (if any).
      event.preventDefault()
      event.stopPropagation()
      if (focusedDosageIndex >= 0) {
        setDisableHover(false)
        validateSuggestion(posologySuggestions[focusedDosageIndex])
      }
    } else if (event.key === 'Escape') {
      if (posologySuggestions.length) {
        event.preventDefault()
        event.stopPropagation()
        setPosologySuggestions([])
        setFocusedDosageIndex(-1)
      }
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
      const current = dosageRef.current ?? ''
      const overlap = suffixPrefixOverlap(current, suggestion)
      const merged = ((overlap > 0 ? current.replace(/\s+$/, '') : current.trimEnd() + (current ? ' ' : '')) + suggestion.slice(overlap))
        .replace(/\s*\/\s*/g, ' / ')
        .replace(/\s{2,}/g, ' ')
        .trim()
      setValue('dosage', merged, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      })
      setDosageFromSuggestion(merged)
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
                {alternatives.length > 0 && <CheapAlternatives sdk={sdk} medications={alternatives} onSelectMedication={onSelectAlternativeMedication} />}
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
                {standardDosages.length > 0 && <StandardDosages dosages={standardDosages} language={language} onSelectDosage={onSelectStandardDosage} />}
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
                          { label: t('medication.no'), value: false, id: 'substitutionIsNotAllowed' },
                          { label: t('medication.yes'), value: true, id: 'substitutionIsAllowed' },
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
