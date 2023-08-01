import Link from 'next/link'
import LanguageSwitcher from '../LanguageSwitcher'
import { getTranslation } from '@/i18n/index'
import { ValidLocale } from '@/i18n/settings'

export default async function Header({ lang }: { lang: ValidLocale }) {
  const { t } = await getTranslation(lang, 'header')
<<<<<<< Updated upstream
=======
  // const { k } = await getTranslation(lang, 'category-page')
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
=======
        <input className={styles['dropdown']} type="checkbox"/>
        <ul className={styles['sub-menu']}>
          <p>Market Research</p>
          <li>
            <Link href={`/${lang}/category/?name=market`}>
              {t('market')}
            </Link>
          </li>
          <li><Link href={`/${lang}/category/?name=corporate`}>
            {t('corporate')}
          </Link></li>
          <li><Link href={`/${lang}/category/?name=consumer`}>
            {t('consumer')}
          </Link></li>
          <p>Market Entry</p>
          <li><Link href={`/${lang}/category/?name=marketing`}>
            {t('marketing')}
          </Link></li>
          <li><Link href={`/${lang}/category/?name=partnership`}>
            {t('partnership')}
          </Link></li>
          <li><Link href={`/${lang}/category/?name=channel`}>
            {t('channel')}
          </Link></li>
          <li><Link href={`/${lang}/category/?name=payment`}>
            {t('payment')}
          </Link></li>
        </ul>
>>>>>>> Stashed changes
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