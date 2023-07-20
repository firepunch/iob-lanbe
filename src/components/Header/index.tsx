import Link from 'next/link'
import LanguageSwitcher from '../LanguageSwitcher'
import { getTranslation } from '@/i18n/index'
import { ValidLocale } from '@/i18n/settings'

export default async function Header({ lang }: { lang: ValidLocale }) {
  const { t } = await getTranslation(lang, 'header')

  return (
    <header>
      <Link href="/">
        <h1>
          IOB
        </h1>
      </Link>

      <nav>
        <Link href={`/${lang}/about`}>
          {t('about')}
        </Link>
        <Link href={`/${lang}/category`}>
          {t('content')}
        </Link>
        <Link href={`/${lang}/report`}>
          {t('report')}
        </Link>
        <Link href={`/${lang}/search`}>
          {t('search')}
        </Link>
        <Link href={`/${lang}/sign-in`}>
          {t('sign_in')}
        </Link>
        <Link href={`/${lang}/my-page`}>
          {t('my_page')}
        </Link>
      </nav>

      <LanguageSwitcher />
    </header>
  )
}