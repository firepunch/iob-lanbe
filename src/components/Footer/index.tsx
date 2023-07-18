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
      <Link href="/">
        IOB
      </Link>
      <nav>
        <Link href={`/${lang}/content`}>
          {t("menu.content")}
        </Link>
        <Link href={`/${lang}/report`}>
          {t("menu.report")}
        </Link>
        {/* <Link href={`/${lang}/project`}>
          {t("menu.project")}
        </Link> */}
        <Link href={`/${lang}/linkedin`}>
          {t("menu.content")}
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
    </footer>
  )
}
