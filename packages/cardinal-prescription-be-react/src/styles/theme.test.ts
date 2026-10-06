import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { cp, themeTokens } from './theme'

const readme = readFileSync(resolve(__dirname, '../../README.md'), 'utf8')
const documentedTable = readme.slice(readme.indexOf('<!-- theme-tokens:start -->'), readme.indexOf('<!-- theme-tokens:end -->'))
const documentedNames = Array.from(documentedTable.matchAll(/^\| `--cp-([a-z0-9-]+)` \|/gm), (match) => match[1])

describe('theme tokens', () => {
  it('README lists exactly the tokens the components read, in order', () => {
    expect(documentedNames).toEqual(themeTokens.map((token) => token.name))
  })

  it('README shows each token with its current light and dark defaults', () => {
    themeTokens.forEach((token) => {
      const row = documentedTable.split('\n').find((line) => line.startsWith(`| \`--cp-${token.name}\` |`))!
      expect(row).toContain(`\`${token.light}\``)
      if (token.dark) expect(row).toContain(`\`${token.dark}\``)
    })
  })

  it('reads every value from a --cp- custom property with the light default as the last fallback', () => {
    expect(cp.colorSurface).toBe('var(--cp-color-surface, var(--cp-dark-color-surface, #ffffff))')
    expect(cp.fontSizeMd).toBe('var(--cp-font-size-md, 14px)')
    expect(cp.buttonPrimaryBackground).toBe('var(--cp-button-primary-background, var(--cp-color-primary, var(--cp-dark-color-primary, #084b83)))')
  })

  it('has unique names and resolvable references', () => {
    const names = themeTokens.map((token) => token.name)
    expect(new Set(names).size).toBe(names.length)
    themeTokens
      .filter((token) => token.ref)
      .forEach((token) => {
        // The documented default of a following token is the one it actually resolves to.
        expect(themeTokens.find((referenced) => referenced.name === token.ref)?.light).toBe(token.light)
      })
  })
})
