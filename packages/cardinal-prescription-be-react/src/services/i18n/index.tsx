import { SamText } from '@icure/cardinal-be-sam-sdk'
import { appTranslations } from './translations'
import { DEFAULT_APP_LANGULAGE } from '../constants'

export type AvailableLanguagesType = SamText['fr'] | SamText['en'] | SamText['nl'] | SamText['de']

class CardinalLanguage {
  private language: AvailableLanguagesType = DEFAULT_APP_LANGULAGE

  public setLanguage(language: string): void {
    this.language = language
  }

  public getLanguage(): string {
    return this.language
  }
}

export const cardinalLanguage = new CardinalLanguage()

export const t = (key: string): string => {
  const getKeyValue = (collection: Record<string, any>, complexKey: string): string | undefined => {
    const keys = complexKey.split('.')
    let value: any = collection

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        return undefined
      }
    }

    return typeof value === 'string' ? value : undefined
  }

  return getKeyValue(appTranslations[cardinalLanguage.getLanguage()], key) ?? key
}

export const getSamTextTranslation = (samText?: SamText): string | undefined => {
  if (!samText) {
    return undefined
  }
  const lang = cardinalLanguage.getLanguage() as keyof SamText
  const fallback = DEFAULT_APP_LANGULAGE as keyof SamText
  return samText[lang] ?? samText[fallback]
}
