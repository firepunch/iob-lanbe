import Link from "next/link"
import LanguageSwitcher from "../LanguageSwitcher"
import { ValidLocale, getTranslator } from "i18n"

export default async function Header({
  lang,
}: {
  lang: ValidLocale
}) {
  const t = await getTranslator(lang as ValidLocale)

  return (
    <header>
      <Link href='/'>
        <h1>
          IOB
        </h1>
      </Link>

      <nav>
        <Link href={`/${lang}/about`}>
          {t("menu.about")}
        </Link>
        <Link href={`/${lang}/category`}>
          {t("menu.content")}
        </Link>
        <Link href={`/${lang}/report`}>
          {t("menu.report")}
        </Link>
        <Link href={`/${lang}/search`}>
          {t("menu.search")}
        </Link>
        <Link href={`/${lang}/login`}>
          {t("menu.sign_in")}
        </Link>
        <Link href={`/${lang}/my-page`}>
          {t("menu.my_page")}
        </Link>
      </nav>

      <LanguageSwitcher />
    </header>
  )
}