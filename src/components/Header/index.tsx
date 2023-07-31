import Link from 'next/link'
import LanguageSwitcher from '../LanguageSwitcher'
import { getTranslation } from '@/i18n/index'
import { ValidLocale } from '@/i18n/settings'
import styles from './index.module.scss'
import { TI18N } from '@/types'

export default async function Header({
  ct,
  t,
  lang, 
}: { 
  ct: TI18N
  t: TI18N
  lang: ValidLocale 
}) {
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
          <p>{ct('market_research')}</p>
          <li>
            <Link href={`/${lang}/category/?name=market`}>
              {ct('market')}
            </Link>
          </li>
          <li>
            <Link href={`/${lang}/category/?name=corporate`}>
              {ct('corporate')}
            </Link>
          </li>
          <li>
            <Link href={`/${lang}/category/?name=consumer`}>
              {ct('consumer')}
            </Link>
          </li>
          <p>{ct('market_entry')}</p>
          <li>
            <Link href={`/${lang}/category/?name=marketing`}>
              {ct('marketing')}
            </Link>
          </li>
          <li>
            <Link href={`/${lang}/category/?name=partnership`}>
              {ct('partnership')}
            </Link>
          </li>
          <li>
            <Link href={`/${lang}/category/?name=channel`}>
              {ct('channel')}
            </Link>
          </li>
          <li>
            <Link href={`/${lang}/category/?name=payment`}>
              {ct('payment')}
            </Link>
          </li>
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