export const defaultLocale = "en"
export const locales = ["en", "ko"] as const
export type ValidLocale = typeof locales[number];

type PathnameLocale = {
  pathname: string;
  locale?: never;
};
type ISOLocale = {
  pathname?: never;
  locale: string;
};

type LocaleSource = PathnameLocale | ISOLocale;

export const getLocaleParams = () => locales.map(lang=>({ lang }))

export const getLocalePartsFrom = ({ pathname, locale }: LocaleSource) => {
  if (locale) {
    return {
      lang: locale.toLowerCase(),
    }
  } else {
    const pathnameParts = pathname!.toLowerCase().split("/")
    return {
      lang: pathnameParts[1],
    }
  }
}

const dictionaries: Record<ValidLocale, any> = {
  "en": () =>
    import("src/dictionaries/en.json").then((module) => module.default),
  "ko": () =>
    import("src/dictionaries/ko.json").then((module) => module.default),
} as const

export const getTranslator = async (locale: ValidLocale) => dictionaries[locale]()
