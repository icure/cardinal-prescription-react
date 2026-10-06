import AxeBuilder from '@axe-core/playwright'
import { expect, Page, test } from '@playwright/test'

// The library's own browser checks (MD-02), offline: see playwright.harness.config.ts.

const COMPONENTS = ['search', 'modal', 'list', 'print', 'certificate'] as const

const open = async (page: Page, query: string) => {
  await page.goto(`/harness.html?${query}`)
  await page.waitForLoadState('networkidle')
}

/** The host chrome's own styles, as MD-00's "Global reset" table measured them. */
const hostChrome = async (page: Page) => {
  // A key press first, so the programmatic focus counts as keyboard focus and `:focus-visible`
  // applies in every engine (WebKit and Firefox on macOS skip buttons when tabbing).
  await page.keyboard.press('Shift')
  await page.locator('#host-button').focus()
  return page.evaluate(() => {
    const body = getComputedStyle(document.body)
    const button = getComputedStyle(document.getElementById('host-button')!)
    const list = getComputedStyle(document.getElementById('host-list')!)
    return {
      focusedIsHostButton: document.activeElement?.id === 'host-button',
      buttonOutline: `${button.outlineStyle} ${button.outlineWidth} ${button.outlineColor}`,
      bodyBackground: body.backgroundColor,
      bodyFont: body.fontFamily,
      bodyFontSize: body.fontSize,
      listStyle: list.listStyleType,
      listPaddingStart: list.paddingInlineStart,
    }
  })
}

test.describe('host page isolation', () => {
  for (const component of COMPONENTS) {
    test(`mounting ${component} leaves the host focus ring, body and list bullets unchanged`, async ({ page }) => {
      await open(page, 'mount=none')
      const before = await hostChrome(page)
      expect(before.focusedIsHostButton).toBe(true)
      expect(before.buttonOutline).toContain('solid')
      expect(before.listStyle).toBe('disc')

      await open(page, `mount=${component}`)
      expect(await page.locator('.cp-root').count()).toBeGreaterThan(0)
      expect(await hostChrome(page)).toEqual(before)
    })
  }

  test("a host posology editor inside the modal keeps the host's own list styles", async ({ page }) => {
    await open(page, 'mount=modal&slot=1')
    const listStyle = await page.locator('#host-editor-list').evaluate((el) => getComputedStyle(el).listStyleType)
    expect(listStyle).toBe('disc')
    // A list in the library's own markup, for comparison: the reset still applies there.
    const libraryListStyle = await page.locator('.addMedicationForm__body').evaluate((body) => getComputedStyle(body.appendChild(document.createElement('ul'))).listStyleType)
    expect(libraryListStyle).toBe('none')
  })
})

const axeViolations = async (page: Page, include: string) => {
  const result = await new AxeBuilder({ page }).include(include).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze()
  return result.violations
    .filter((violation) => violation.impact === 'critical' || violation.impact === 'serious')
    .map((violation) => ({ id: violation.id, impact: violation.impact, nodes: violation.nodes.map((node) => `${node.target.join(' ')} ${node.failureSummary ?? ''}`) }))
}

test.describe('accessibility (axe, WCAG 2.2 AA)', () => {
  for (const theme of ['light', 'dark'] as const) {
    test(`the modal has no critical or serious violation (${theme})`, async ({ page }) => {
      await open(page, `mount=modal&theme=${theme}`)
      expect(await axeViolations(page, '.cp-root')).toEqual([])
    })

    test(`the search and its results have no critical or serious violation (${theme})`, async ({ page }) => {
      await open(page, `mount=search&theme=${theme}`)
      await page.getByRole('textbox', { name: 'Trouver un médicament' }).fill('dafalgan')
      await expect(page.locator('.medicationSearchDropdown .StyledMedicationCard').first()).toBeVisible()
      expect(await axeViolations(page, '.cp-root')).toEqual([])
    })

    test(`the list and the print modal have no critical or serious violation (${theme})`, async ({ page }) => {
      await open(page, `mount=list&theme=${theme}`)
      expect(await axeViolations(page, '.cp-root')).toEqual([])
      await open(page, `mount=print&theme=${theme}`)
      expect(await axeViolations(page, '.cp-root')).toEqual([])
    })
  }
})

/** Every visible, enabled control of the mounted component with its rendered size. */
const controlSizes = (page: Page) =>
  page.locator('.cp-root').evaluateAll((roots) =>
    roots.flatMap((root) =>
      Array.from(
        root.querySelectorAll<HTMLElement>('button, input:not([type=radio]):not([type=hidden]), select, textarea, [role=button], [role=switch], label:has(input[type=radio])'),
      )
        .filter((el) => el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden' && getComputedStyle(el).opacity !== '0')
        .concat(Array.from(root.querySelectorAll<HTMLElement>('[role=switch]')))
        .map((el) => {
          // An input wrapped in its label is activated by the whole label: that is its target.
          const target = el.tagName === 'INPUT' && el.parentElement?.tagName === 'LABEL' ? el.parentElement : el
          const box = target.getBoundingClientRect()
          return {
            control: `${el.tagName.toLowerCase()}${el.id ? '#' + el.id : ''}.${String(el.className).split(' ')[0]}`,
            width: Math.round(box.width),
            height: Math.round(box.height),
          }
        }),
    ),
  )

test.describe('target sizes', () => {
  test('every control of the modal, the search, the list and the print modal is at least 24 x 24 px under a fine pointer', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name.endsWith('-touch'))
    for (const component of ['modal', 'search', 'list', 'print']) {
      await open(page, `mount=${component}`)
      const sizes = await controlSizes(page)
      expect(sizes.length).toBeGreaterThan(0)
      expect(
        sizes.filter((size) => size.width < 24 || size.height < 24),
        component,
      ).toEqual([])
    }
  })

  test('every control of the modal, the search, the list and the print modal is at least 44 x 44 px on a touch screen @touch', async ({ page }, testInfo) => {
    test.skip(!testInfo.project.name.endsWith('-touch'))
    for (const component of ['modal', 'search', 'list', 'print']) {
      await open(page, `mount=${component}`)
      const sizes = await controlSizes(page)
      expect(sizes.length).toBeGreaterThan(0)
      expect(
        sizes.filter((size) => size.height < 44 || size.width < 44),
        component,
      ).toEqual([])
    }
  })
})

test.describe('theming', () => {
  const headerColours = (page: Page) =>
    page.locator('.addMedicationForm__header').evaluate((header) => ({
      background: getComputedStyle(header).backgroundColor,
      title: getComputedStyle(header.querySelector('h3')!).color,
    }))

  test('without a theme attribute, the modal keeps its light defaults even on a dark host', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' })
    await open(page, 'mount=modal')
    expect(await headerColours(page)).toEqual({ background: 'rgb(255, 255, 255)', title: 'rgb(29, 34, 53)' })
  })

  test('data-cp-theme="dark" gives a dark header with light text (no white on white)', async ({ page }) => {
    await open(page, 'mount=modal&theme=dark')
    expect(await headerColours(page)).toEqual({ background: 'rgb(27, 31, 39)', title: 'rgb(230, 233, 239)' })
  })

  test('data-cp-theme="auto" follows prefers-color-scheme', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' })
    await open(page, 'mount=modal&theme=auto')
    expect((await headerColours(page)).background).toBe('rgb(27, 31, 39)')
    await page.emulateMedia({ colorScheme: 'light' })
    expect((await headerColours(page)).background).toBe('rgb(255, 255, 255)')
  })

  test('host custom properties restyle the modal, and win over the dark defaults', async ({ page }) => {
    await open(page, 'mount=modal&skin=1&theme=dark')
    expect(await headerColours(page)).toEqual({ background: 'rgb(27, 30, 35)', title: 'rgb(235, 239, 242)' })
    const submit = page.getByRole('button', { name: 'Soumettre' })
    const [background, color, font] = await submit.evaluate((el) => [getComputedStyle(el).backgroundColor, getComputedStyle(el).color, getComputedStyle(el).fontFamily])
    expect([background, color]).toEqual(['rgb(120, 180, 240)', 'rgb(10, 20, 30)'])
    // WebKit serialises the family without quotes.
    expect(font.replace(/"/g, '')).toBe('Host Sans, Georgia, serif')
  })
})

test.describe('browser storage (MD-04)', () => {
  for (const component of ['search', 'modal', 'list', 'print'] as const) {
    test(`importing the library and mounting ${component} creates no IndexedDB database`, async ({ page }) => {
      await open(page, `mount=${component}`)
      const databases = await page.evaluate(async () => (await indexedDB.databases()).map((db) => db.name))
      expect(databases).toEqual([])
    })
  }
})
