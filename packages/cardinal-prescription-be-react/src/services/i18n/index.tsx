import { SamText } from '@icure/cardinal-be-sam-sdk'
import { appTranslations } from './translations'

export type AvailableLanguagesType = SamText['fr'] | SamText['en'] | SamText['nl'] | SamText['de']

class CardinalLanguage {
  private language = 'en'

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
