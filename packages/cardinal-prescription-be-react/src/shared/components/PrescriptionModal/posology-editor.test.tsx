import React from 'react'
import { act, cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { RegimenItem } from '@icure/be-fhc-lite-api'
import { PrescriptionModal } from './index'
import type { PosologyEditorProps, PrescribedMedicationType } from '../../types'
import { fakeSamSdk, sampleMedication, samplePrescription, sampleRegimen } from '../../../testing/component-fixtures'
import { resetTestLanguage, setTestLanguage } from '../../../testing'
import { createRegimenItemsFromDosage } from '../../../internal/services/prescription/create-prescription'

// MD-03: `PrescriptionModal`'s `posologyEditor` slot. Without it the free-text editor behaves as
// before; with it, the host editor's regimen and text are submitted as they are. (That the host
// editor is left out of the library's scoped reset needs a real selector engine: see the
// Playwright harness, `e2e/harness`.)

const submit = async () => userEvent.click(screen.getByRole('button', { name: 'Soumettre' }))

const renderModal = async (props: Partial<React.ComponentProps<typeof PrescriptionModal>> = {}) => {
  const onSubmit = vi.fn<(meds: PrescribedMedicationType[]) => void>()
  await act(async () => {
    render(<PrescriptionModal sdk={fakeSamSdk} medicationToPrescribe={sampleMedication} onClose={() => undefined} onSubmit={onSubmit} modalMood="create" {...props} />)
  })
  return onSubmit
}

/** A host editor: a text input plus a button that sets a structured regimen. */
const HostEditor = vi.fn(({ id, label, value, onChange, errorMessageId }: PosologyEditorProps) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <input id={id} value={value.text} aria-describedby={errorMessageId} onChange={(e) => onChange({ regimen: value.regimen, text: e.target.value })} />
    <button type="button" onClick={() => onChange({ regimen: sampleRegimen, text: '1 comprimé le matin (éditeur)' })}>
      Matin
    </button>
  </div>
))

describe('PrescriptionModal posology editor slot', () => {
  beforeEach(() => {
    setTestLanguage('fr')
    HostEditor.mockClear()
  })

  afterEach(() => {
    cleanup()
    resetTestLanguage()
  })

  describe('without a slot (default free-text editor)', () => {
    it('renders the free-text posology field and none of a host editor', async () => {
      await renderModal()
      expect(screen.getByRole('combobox', { name: 'Posologie' })).toBeInTheDocument()
      expect(document.querySelector('[data-cp-slot]')).toBeNull()
    })

    it('submits the typed text and the regimen parsed from it, as before', async () => {
      const onSubmit = await renderModal()
      await userEvent.type(screen.getByRole('combobox', { name: 'Posologie' }), '1 comprimé 3 fois par jour')
      await userEvent.keyboard('{Escape}')
      await submit()

      await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1))
      const [medication] = onSubmit.mock.calls[0][0]
      expect(medication.medication.instructionForPatient).toBe('1 comprimé 3 fois par jour')
      expect(medication.medication.regimen).toEqual(createRegimenItemsFromDosage('1 comprimé 3 fois par jour'))
      expect(medication.medication.regimen?.length).toBeGreaterThan(0)
    })

    it('does not submit the form on Enter in the posology field', async () => {
      const onSubmit = await renderModal()
      await userEvent.type(screen.getByRole('combobox', { name: 'Posologie' }), '1 comprimé 3 fois par jour{Enter}')
      expect(onSubmit).not.toHaveBeenCalled()
    })

    it('still requires a posology', async () => {
      const onSubmit = await renderModal()
      await submit()
      expect(await screen.findByText('Ce champ est requis')).toBeInTheDocument()
      expect(onSubmit).not.toHaveBeenCalled()
    })
  })

  describe('with a slot', () => {
    it('renders the host editor instead of the free-text field, with an empty value and the product context', async () => {
      await renderModal({ posologyEditor: HostEditor, standardDosageContext: { ageInYears: 40 } })

      expect(screen.queryByRole('combobox', { name: 'Posologie' })).toBeNull()
      expect(screen.getByRole('textbox', { name: 'Posologie' })).toBeInTheDocument()
      const props = HostEditor.mock.calls.at(-1)![0]
      expect(props.id).toBe('dosage')
      expect(props.value).toEqual({ regimen: [], text: '' })
      expect(props.context.medication).toBe(sampleMedication)
      expect(props.context.language).toBe('fr')
      expect(props.context.standardDosages).toEqual([])
      expect(props.context.standardDosageContext).toEqual({ ageInYears: 40 })
    })

    it('submits the regimen and the text the editor returned, without re-parsing the text', async () => {
      const onSubmit = await renderModal({ posologyEditor: HostEditor })
      await userEvent.click(screen.getByRole('button', { name: 'Matin' }))
      await submit()

      await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1))
      const [medication] = onSubmit.mock.calls[0][0]
      expect(medication.medication.instructionForPatient).toBe('1 comprimé le matin (éditeur)')
      expect(medication.medication.regimen).toEqual(sampleRegimen)
    })

    it('submits a text-only posology with no regimen', async () => {
      const onSubmit = await renderModal({ posologyEditor: HostEditor })
      await userEvent.type(screen.getByRole('textbox', { name: 'Posologie' }), 'selon avis médical')
      await submit()

      await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1))
      const [medication] = onSubmit.mock.calls[0][0]
      expect(medication.medication.instructionForPatient).toBe('selon avis médical')
      expect(medication.medication.regimen).toBeUndefined()
    })

    it('hands the prescription being modified to the editor', async () => {
      const prescription = samplePrescription()
      await renderModal({ posologyEditor: HostEditor, medicationToPrescribe: undefined, prescriptionToModify: prescription, modalMood: 'modify' })

      const props = HostEditor.mock.calls.at(-1)![0]
      expect(props.value).toEqual({ regimen: prescription.medication.regimen, text: '1 comprimé le matin' })
      expect(props.context.prescriptionToModify).toBe(prescription)
      expect(props.value.regimen[0]).toBeInstanceOf(RegimenItem)
    })

    it('requires a posology and gives the editor the error message', async () => {
      const onSubmit = await renderModal({ posologyEditor: HostEditor })
      await submit()

      const error = await screen.findByText('Ce champ est requis')
      expect(error).toHaveAttribute('id', 'dosage-error')
      expect(screen.getByRole('textbox', { name: 'Posologie' })).toHaveAccessibleDescription('Ce champ est requis')
      expect(HostEditor.mock.calls.at(-1)![0].errorMessage).toBe('Ce champ est requis')
      expect(onSubmit).not.toHaveBeenCalled()
    })
  })
})
