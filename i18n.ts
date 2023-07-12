export const defaultLocale = "ko";
export const locales = ["en", "ko"] as const;
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

export const getLocalePartsFrom = ({ pathname, locale }: LocaleSource) => {
  if (locale) {
    return {
      lang: locale.toLowerCase(),
    };
  } else {
    const pathnameParts = pathname!.toLowerCase().split("/");
    return {
      lang: pathnameParts[1],
    };
  }
};

const dictionaries: Record<ValidLocale, any> = {
  "en": () =>
    import("./dictionaries/en.json").then((module) => module.default),
  "ko": () =>
    import("./dictionaries/ko.json").then((module) => module.default),
} as const;

export const getTranslator = async (locale: ValidLocale) => {
  const dictionary = await dictionaries[locale]();
  return (key: string, params?: { [key: string]: string | number }) => {
    let translation = key
      .split(".")
      .reduce((obj, key) => obj && obj[key], dictionary);
    if (!translation) {
      return key;
    }
    if (params && Object.entries(params).length) {
      Object.entries(params).forEach(([key, value]) => {
        translation = translation!.replace(`{{ ${key} }}`, String(value));
      });
    }
    return translation;
  };
};