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
      <input className={styles['hamburger']} type="checkbox"/>
      <div className={styles['menu']}>
        <Link href={`/${lang}/about`}>
          {t('about')}
        </Link>
        <Link className={styles['content-menu']} href={`/${lang}/category`} >
          {t('content')}
        </Link>
        <input className={styles['dropdown']} type="checkbox"/>
        <ul className={styles['sub-menu']}>
          <p>Market Research</p>
          <li><Link href={`/${lang}/category/?name=${queryParams}`}>
            {t('market')}
          </Link></li>
          <li><Link href={`/${lang}/category/?name=${queryParams}`}>
            {t('corporate')}
          </Link></li>
          <li><Link href={`/${lang}/category/?name=${queryParams}`}>
            {t('consumer')}
          </Link></li>
          <p>Market Entry</p>
          <li><Link href={`/${lang}/category/?name=${queryParams}`}>
            {t('marketing')}
          </Link></li>
          <li><Link href={`/${lang}/category/?name=${queryParams}`}>
            {t('partnership')}
          </Link></li>
          <li><Link href={`/${lang}/category/?name=${queryParams}`}>
            {t('channel')}
          </Link></li>
          <li><Link href={`/${lang}/category/?name=${queryParams}`}>
            {t('payment')}
          </Link></li>
        </ul>
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
      </div>  
      <LanguageSwitcher />
    </header>
  )
}