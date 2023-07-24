import Link from "next/link"
import LanguageSwitcher from "../LanguageSwitcher"
import { ValidLocale, getTranslator } from "i18n"

export default async function Footer( {
  lang,
}: {
  lang: ValidLocale
}){
  const t = await getTranslator(lang as ValidLocale)
  return (
    <footer>
      Footer
      <Link href='/'>
        <h1>
          IOB
        </h1>
      </Link>

      <nav>
        <Link href={`/${lang}/content`}>
          {t("I.O.B Content")}
        </Link>
        <Link href={`/${lang}/report`}>
          {t("I.O.B Report")}
        </Link>
        <Link href={`/${lang}/project`}>
          {t("I.O.B project")}
        </Link>
        <Link href={`https://linkedin.com`}>
          {t("LinkedIn")}
        </Link>
        <Link href={`/${lang}/privacy-policy`}>
          {t("Privacy Policy")}
        </Link>
        <Link href={`/${lang}/terms-conditions`}>
          {t("Terms & Conditions")}
        </Link>
        <Link href={`/${lang}/cookie-policy`}>
          {t("Cookie Policy")}
        </Link>
      </nav>

      <LanguageSwitcher />
    </footer>
  )
}