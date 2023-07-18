import Link from 'next/link'
import LanguageSwitcher from '../LanguageSwitcher'
import { ValidLocale, getTranslator } from 'i18n'

export default async function Header({
  lang,
}: {
  lang: ValidLocale
}) {
  const dict = await getTranslator(lang)

  return (
    <header>
      <Link href="/">
        <h1>
          IOB
        </h1>
      </Link>

      <nav>
        <Link href={`/${lang}/about`}>
          {dict.menu.about}
        </Link>
        <Link href={`/${lang}/category`}>
          {dict.menu.content}
        </Link>
        <Link href={`/${lang}/report`}>
          {dict.menu.report}
        </Link>
        <Link href={`/${lang}/search`}>
          {dict.menu.search}
        </Link>
        <Link href={`/${lang}/sign-in`}>
          {dict.menu.sign_in}
        </Link>
        <Link href={`/${lang}/my-page`}>
          {dict.menu.my_page}
        </Link>
      </nav>

      <LanguageSwitcher />
    </header>
  )
}