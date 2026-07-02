import { describe, it, expect } from 'vitest'
import { appTranslations } from './index'

/** Recursively collect the dotted key paths of an object (leaves only). */
const collectKeys = (obj: unknown, prefix = ''): string[] => {
  if (obj === null || typeof obj !== 'object') return [prefix]
  return Object.entries(obj as Record<string, unknown>).flatMap(([k, v]) => collectKeys(v, prefix ? `${prefix}.${k}` : k))
}

describe('appTranslations language parity', () => {
  const languages = ['fr', 'en', 'nl', 'de'] as const
  const keysByLang = Object.fromEntries(languages.map((lang) => [lang, new Set(collectKeys(appTranslations[lang]))])) as Record<(typeof languages)[number], Set<string>>

  it('exposes all four languages', () => {
    languages.forEach((lang) => expect(appTranslations[lang]).toBeDefined())
  })

  it('every language has an identical set of translation keys', () => {
    const reference = keysByLang.fr
    languages.forEach((lang) => {
      const missing = [...reference].filter((k) => !keysByLang[lang].has(k))
      const extra = [...keysByLang[lang]].filter((k) => !reference.has(k))
      expect(missing, `keys missing in ${lang}: ${missing.join(', ')}`).toEqual([])
      expect(extra, `keys extra in ${lang}: ${extra.join(', ')}`).toEqual([])
    })
  })
})
