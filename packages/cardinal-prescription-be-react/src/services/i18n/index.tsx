import i18n, { i18n as I18nInstance } from 'i18next'
import { initReactI18next } from 'react-i18next'
import { SamText } from '@icure/cardinal-be-sam-sdk'
import { appTranslations } from './translations'
import { DEFAULT_APP_LANGULAGE } from '../constants'

export type AvailableLanguagesType = SamText['fr'] | SamText['en'] | SamText['nl'] | SamText['de']

export class I18nService {
  private static instance: I18nService
  private i18n: I18nInstance

  private constructor() {
    this.i18n = i18n

    this.i18n
      .use(initReactI18next)
      .init({
        resources: {
          en: { translation: appTranslations.en },
          fr: { translation: appTranslations.fr },
          nl: { translation: appTranslations.nl },
          de: { translation: appTranslations.de },
        },
        lng: DEFAULT_APP_LANGULAGE,
        fallbackLng: DEFAULT_APP_LANGULAGE,
        interpolation: { escapeValue: false },
      })
      .catch((error) => {
        console.error('i18n init error:', error)
      })
  }

  // Singleton pattern to avoid multiple initializations
  public static getInstance(): I18nService {
    if (!I18nService.instance) {
      I18nService.instance = new I18nService()
    }
    return I18nService.instance
  }

  public setLanguage(lang: AvailableLanguagesType) {
    return this.i18n.changeLanguage(lang)
  }

  public getCurrentLanguage(): string {
    return this.i18n.language
  }

  public t(key: string, options?: any) {
    return this.i18n.t(key, options)
  }
}
