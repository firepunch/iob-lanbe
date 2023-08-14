import { ValidLocale } from '@/i18n/settings'
import { TI18N } from '@/types'
import Link from 'next/link'
import LanguageSwitcher from '../LanguageSwitcher'

export default async function Header({
  ct,
  t,
  lang,
}: {
  ct: TI18N
  t: TI18N
  lang: ValidLocale
}) {
  const handleToggle = () => {}

  return (
    <>
      <header>
        {/* mobile version change language */}
        <a href="#" className="language-mobile">
          <img src="./imgs/lang_white.png" alt="Language" />
        </a>
        {/* //mobile version change language */}

        {/* web version nav */}
        <h1>
          <Link href="/">I.O.B</Link>
        </h1>

        <nav className="center-nav">
          <ul>
            <li>
              <Link href={`/${lang}/about`}>{t('about')}</Link>
            </li>

            <li className="content" tabIndex={0}>
              <span>{t('content')}</span>

              {/* hover */}
              <div className="submenu">
                <div className="submenu-left">
                  <p>{t('content_intro')}</p>

                  <Link href={`/${lang}/category`}>
                    <img src="./imgs/arrow_white.png" alt="Arrow" />
                    {t('content_see_all')}
                  </Link>
                </div>

                <div className="submenu-right">
                  <ul>
                    <li>{ct('market_research')}</li>
                    <li>
                      <Link href={`/${lang}/category/?name=market`}>
                        <img src="./imgs/arrow_white.png" alt="Arrow" />
                        {ct('market')}
                      </Link>
                    </li>
                    <li>
                      <Link href={`/${lang}/category/?name=corporate`}>
                        <img src="./imgs/arrow_white.png" alt="Arrow" />
                        {ct('corporate')}
                      </Link>
                    </li>
                    <li>
                      <Link href={`/${lang}/category/?name=consumer`}>
                        <img src="./imgs/arrow_white.png" alt="Arrow" />
                        {ct('consumer')}
                      </Link>
                    </li>
                  </ul>

                  <ul>
                    <li>{ct('market_entry')}</li>
                    <li>
                      <Link href={`/${lang}/category/?name=marketing`}>
                        <img src="./imgs/arrow_white.png" alt="Arrow" />
                        {ct('marketing')}
                      </Link>
                    </li>
                    <li>
                      <Link href={`/${lang}/category/?name=partnership`}>
                        <img src="./imgs/arrow_white.png" alt="Arrow" />
                        {ct('partnership')}
                      </Link>
                    </li>
                    <li>
                      <Link href={`/${lang}/category/?name=channel`}>
                        <img src="./imgs/arrow_white.png" alt="Arrow" />
                        {ct('channel')}
                      </Link>
                    </li>
                    <li>
                      <Link href={`/${lang}/category/?name=payment`}>
                        <img src="./imgs/arrow_white.png" alt="Arrow" />
                        {ct('payment')}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              {/* //hover */}
            </li>

            <li>
              <Link href={`/${lang}/report`}>{t('report')}</Link>
            </li>
            <li>
              <Link href={`/${lang}/project`}>{t('project')}</Link>
            </li>
          </ul>
        </nav>

        <nav className="right-nav">
          <ul>
            <li>
              <Link href={`/${lang}/search`}>
                <img src="./imgs/search_black.png" alt="Search" />
                {t('search')}
              </Link>
            </li>
            <li>
              <Link href={`/${lang}/sign-in`}>
                <img src="./imgs/arrow_black.png" alt="Sign in" />
                {t('sign_in')}
              </Link>
            </li>
            <li>
              <LanguageSwitcher lang={lang} />
            </li>
          </ul>
        </nav>
        {/* //web version nav */}

        {/* mobile version hamburger menu */}
        <a href="#" className="hamburger-mobile">
          <img src="./imgs/hamburger_white.png" alt="Hamburger menu" />
        </a>
        {/* //mobile version hamburger menu */}
      </header>
    </>
  )
}
