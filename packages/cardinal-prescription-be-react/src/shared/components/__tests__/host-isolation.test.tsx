import { act, cleanup, render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { publicComponents } from '../../../testing/component-fixtures'

// The barcode renderer needs a real canvas, which happy-dom does not provide.
vi.mock('jsbarcode', () => ({ default: vi.fn() }))

// MD-00 "Global reset": every public component used to mount a page-wide `createGlobalStyle` that
// removed the host's focus ring, repainted and re-fonted its `body` and stripped its list bullets.
// These tests mount each public component inside a host page and check the host is untouched.

const HOST_CSS = `
  body { font-family: "Host Sans"; font-size: 14px; background-color: rgb(18, 20, 23); }
  ul { list-style-type: disc; }
  :focus { outline: 2px solid rgb(0, 0, 255); }
`

interface HostSnapshot {
  bodyFont: string
  bodyFontSize: string
  bodyBackground: string
  listStyle: string
  buttonOutline: string
}

const snapshotHost = (): HostSnapshot => {
  const body = getComputedStyle(document.body)
  const button = document.getElementById('host-button') as HTMLButtonElement
  button.focus()
  const outline = getComputedStyle(button)
  return {
    bodyFont: body.fontFamily,
    bodyFontSize: body.fontSize,
    bodyBackground: body.backgroundColor,
    listStyle: getComputedStyle(document.getElementById('host-list') as HTMLElement).listStyleType,
    buttonOutline: `${outline.outlineStyle} ${outline.outlineWidth} ${outline.outlineColor}`,
  }
}

/** Splits a selector list on its top-level commas only (not those inside `:where(...)`). */
const splitSelectorList = (selectorText: string): string[] => {
  const parts: string[] = []
  let depth = 0
  let current = ''
  for (const char of selectorText) {
    if (char === '(') depth++
    if (char === ')') depth--
    if (char === ',' && depth === 0) {
      parts.push(current)
      current = ''
    } else current += char
  }
  return [...parts, current]
}

/** Every selector of every rule the library injected, flattened out of @media blocks. */
const librarySelectors = (): string[] => {
  const selectors: string[] = []
  const walk = (rules: CSSRuleList) => {
    Array.from(rules).forEach((rule) => {
      if ('selectorText' in rule) selectors.push(...splitSelectorList((rule as CSSStyleRule).selectorText))
      else if ('cssRules' in rule && !(rule instanceof CSSKeyframesRule)) walk((rule as CSSGroupingRule).cssRules)
    })
  }
  Array.from(document.querySelectorAll('style[data-styled]')).forEach((style) => walk((style as HTMLStyleElement).sheet!.cssRules))
  return selectors.map((selector) => selector.trim()).filter(Boolean)
}

describe('host page isolation (no global reset)', () => {
  let hostStyle: HTMLStyleElement

  beforeEach(() => {
    hostStyle = document.createElement('style')
    hostStyle.textContent = HOST_CSS
    document.head.prepend(hostStyle)
    document.body.insertAdjacentHTML('beforeend', '<div id="host"><button id="host-button">Host</button><ul id="host-list"><li>Host item</li></ul></div>')
  })

  afterEach(() => {
    cleanup()
    document.getElementById('host')?.remove()
    hostStyle.remove()
  })

  it.each(Object.keys(publicComponents))('%s leaves the host body font and background, focus ring and list bullets unchanged', async (name) => {
    const before = snapshotHost()
    expect(before.bodyFont).toContain('Host Sans')
    expect(before.listStyle).toBe('disc')
    expect(before.buttonOutline).toContain('solid')

    await act(async () => {
      render(publicComponents[name]())
    })

    expect(snapshotHost()).toEqual(before)
  })

  it.each(Object.keys(publicComponents))('%s injects only rules scoped to its own classes', async (name) => {
    await act(async () => {
      render(publicComponents[name]())
    })

    const selectors = librarySelectors()
    expect(selectors.length).toBeGreaterThan(0)
    // A scoped rule always involves one of the generated component classes.
    expect(selectors.filter((selector) => !selector.includes('.'))).toEqual([])
    expect(selectors.filter((selector) => /^(html|body|:root|\*|:focus|ul|li|a|button|input)\b/.test(selector))).toEqual([])
  })

  it('applies its reset inside its own root only', async () => {
    await act(async () => {
      render(publicComponents.PrescriptionList())
    })
    const libraryList = document.querySelector('.cp-root ul') ?? document.querySelector('.cp-root')
    expect(libraryList).not.toBeNull()
    expect(getComputedStyle(document.getElementById('host-list') as HTMLElement).listStyleType).toBe('disc')
  })
})
