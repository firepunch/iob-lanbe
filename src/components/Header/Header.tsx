import { ValidLocale } from '@/i18n/settings'
import { TI18N } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import HamburgerMenu from './HamburgerMenu'
import LanguageSwitcher from './LanguageSwitcher'

import ArrowBlackImg from '@/imgs/arrow_black.png'
import ArrowWhiteImg from '@/imgs/arrow_white.png'
import SearchImg from '@/imgs/search_black.png'

export default function Header({
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
      {/* mobile version change language */}
      <LanguageSwitcher isSimple lang={lang} />
      {/* //mobile version change language */}

      {/* web version nav */}
      <h1>
        <Link href="/">I.O.B</Link>
      </h1>

      <nav className="center-nav">
        <ul>
          <li>
            <Link href={`/${lang}/about`}>
              {t('about')}
            </Link>
          </li>

          <li className="content" tabIndex={0}>
            <span>{t('content')}</span>

            {/* hover */}
            <div className="submenu">
              <div className="submenu-left">
                <p>{t('content_intro')}</p>

                <Link href={`/${lang}/category`}>
                  <Image src={ArrowWhiteImg} alt="Arrow" />
                  {t('content_see_all')}
                </Link>
              </div>

              <div className="submenu-right">
                <ul>
                  <li>{ct('market_research')}</li>
                  <li>
                    <Link href={`/${lang}/category/?name=market`}>
                      <Image src={ArrowWhiteImg} alt="Arrow" />
                      {ct('market')}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${lang}/category/?name=corporate`}>
                      <Image src={ArrowWhiteImg} alt="Arrow" />
                      {ct('corporate')}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${lang}/category/?name=consumer`}>
                      <Image src={ArrowWhiteImg} alt="Arrow" />
                      {ct('consumer')}
                    </Link>
                  </li>
                </ul>

                <ul>
                  <li>{ct('market_entry')}</li>
                  <li>
                    <Link href={`/${lang}/category/?name=marketing`}>
                      <Image src={ArrowWhiteImg} alt="Arrow" />
                      {ct('marketing')}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${lang}/category/?name=partnership`}>
                      <Image src={ArrowWhiteImg} alt="Arrow" />
                      {ct('partnership')}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${lang}/category/?name=channel`}>
                      <Image src={ArrowWhiteImg} alt="Arrow" />
                      {ct('channel')}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${lang}/category/?name=payment`}>
                      <Image src={ArrowWhiteImg} alt="Arrow" />
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
              <Image src={SearchImg} alt="Search" />
              {t('search')}
            </Link>
          </li>
          <li>
            <Link href={`/${lang}/sign-in`}>
              <Image src={ArrowBlackImg} alt="Arrow" />
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
      <HamburgerMenu lang={lang} />
      {/* //mobile version hamburger menu */}
    </header>
  )
}
