import Link from 'next/link'
import LanguageSwitcher from '../LanguageSwitcher'
import { getTranslation } from '@/i18n/index'
import { ValidLocale } from '@/i18n/settings'
import styles from './index.module.scss'

export default async function Header({ lang }: { lang: ValidLocale }) {
  const { t } = await getTranslation(lang, 'header')
  // const { k } = await getTranslation(lang, 'category-page')
  const queryParams = 'market'

  return (
    <header>
      <Link href="/">
        <h1>
          IOB
        </h1>
      </Link>
      <Link href={`/${lang}/about`}>
        {t('about')}
      </Link>
      <Link className={styles['content-menu']} href={`/${lang}/category`} >
        {t('content')}
        <nav className={styles['sub-menu']}>
          <Link href={`/${lang}/category/?name=${queryParams}`}>
            {t('market')}
          </Link>
          <Link href={`/${lang}/category/?name=${queryParams}`}>
            {t('corporate')}
          </Link>
          <Link href={`/${lang}/category/?name=${queryParams}`}>
            {t('consumer')}
          </Link>
          <Link href={`/${lang}/category/?name=${queryParams}`}>
            {t('marketing')}
          </Link>
          <Link href={`/${lang}/category/?name=${queryParams}`}>
            {t('partnership')}
          </Link>
          <Link href={`/${lang}/category/?name=${queryParams}`}>
            {t('channel')}
          </Link>
          <Link href={`/${lang}/category/?name=${queryParams}`}>
            {t('payment')}
          </Link>
        </nav>
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
      <LanguageSwitcher />
    </header>
  )
}