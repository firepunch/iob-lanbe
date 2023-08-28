import { TFunction } from 'i18next'

export type ValidLocale = 'en' | 'ko'
export type TI18N = TFunction<any, string>
export type TStringObj = { [key: string]: string | undefined; }
export type Options = { label: string; value: string }[]