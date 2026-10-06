import axe from 'axe-core'
import { act, cleanup, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { publicComponents } from '../../../testing/component-fixtures'
import { setTestLanguage, resetTestLanguage } from '../../../testing'

vi.mock('jsbarcode', () => ({ default: vi.fn() }))

// axe (WCAG 2.2 A/AA rules) on every public component. Rules that need a layout engine
// (contrast, target size, scrollable regions) cannot run in happy-dom: the Playwright harness
// (`e2e/harness`) runs the full rule set, contrast and target sizes included, in three engines.
const LAYOUT_RULES = ['color-contrast', 'target-size', 'scrollable-region-focusable', 'region']

const violationsOf = async (container: HTMLElement) => {
  const result = await axe.run(container, {
    runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] },
    rules: Object.fromEntries(LAYOUT_RULES.map((id) => [id, { enabled: false }])),
  })
  return result.violations.map((violation) => ({ id: violation.id, impact: violation.impact, nodes: violation.nodes.map((node) => node.target.join(' ')) }))
}

describe('accessibility of the public components', () => {
  afterEach(() => {
    cleanup()
    resetTestLanguage()
  })

  it.each(Object.keys(publicComponents))('%s has no axe violation', async (name) => {
    setTestLanguage('fr')
    let container: HTMLElement | undefined
    await act(async () => {
      container = render(publicComponents[name]()).container
    })
    expect(await violationsOf(container!)).toEqual([])
  })

  it('names the modal close button and exposes the modal as a labelled dialog', async () => {
    setTestLanguage('fr')
    await act(async () => {
      render(publicComponents.PrescriptionModal())
    })
    const dialog = screen.getByRole('dialog', { name: 'Créer la prescription' })
    expect(within(dialog).getByRole('button', { name: 'Fermer la fenêtre' })).toBeInTheDocument()
  })

  it('no longer puts a listbox role on the modal form body, and the posology field is a combobox', async () => {
    setTestLanguage('fr')
    await act(async () => {
      render(publicComponents.PrescriptionModal())
    })
    expect(document.querySelector('.addMedicationForm__body')).not.toHaveAttribute('role')
    const dosage = screen.getByRole('combobox', { name: 'Posologie' })
    expect(dosage).toHaveAttribute('aria-expanded', 'false')
    expect(dosage).toHaveAttribute('aria-required', 'true')
    expect(document.getElementById(dosage.getAttribute('aria-controls')!)).toHaveAttribute('role', 'listbox')
  })

  it('labels the extra-fields switch', async () => {
    setTestLanguage('fr')
    await act(async () => {
      render(publicComponents.PrescriptionModal())
    })
    expect(screen.getByRole('switch', { name: 'Afficher plus' })).toBeInTheDocument()
  })

  it('names the edit and delete buttons of a pending prescription', async () => {
    setTestLanguage('fr')
    await act(async () => {
      render(publicComponents.PrescriptionList())
    })
    expect(screen.getByRole('button', { name: 'Modifier' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Supprimer' })).toBeInTheDocument()
  })

  it('names the print modal close icon apart from its "Fermer" button', async () => {
    setTestLanguage('fr')
    await act(async () => {
      render(publicComponents.PrescriptionPrintModal())
    })
    expect(screen.getAllByRole('button', { name: 'Fermer' })).toHaveLength(1)
    expect(screen.getByRole('button', { name: 'Fermer la fenêtre' })).toBeInTheDocument()
  })
})
