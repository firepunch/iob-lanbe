'use client'

import { useTranslation } from '@/i18n/client'
import { ValidLocale } from '@/i18n/settings'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Icons from '../Icons'
import SearchWall from '../SearchWall'
import HamburgerMenu from './HamburgerMenu'
import LanguageSwitcher from './LanguageSwitcher'

import SearchImg from '@/imgs/search_black.png'
import useUserState from '@/stores/userStore'

export default function Header({
  lang,
  openMenu,
  onOpenMenu,
}: {
  lang: ValidLocale
  openMenu?: string
  onOpenMenu: (menu?: string) => void
}) {
  const { t: ct } =  useTranslation(lang, 'category-page')
  const { t } = useTranslation(lang, 'layout')
  const { user } = useUserState(state => state)
  const [isUser, setIsUser] = useState(false)

  useEffect(() => {
    setIsUser(Boolean(user.databaseId))
  }, [user.databaseId])

  return (
    <header>
      {/* mobile version change language */}
      <LanguageSwitcher isSimple lang={lang} />

      {/* web version nav */}
      <h1 onClick={() => onOpenMenu()}>
        <Link href="/">I.O.B</Link>
      </h1>

      <nav className="center-nav">
        <ul>
          <li>
            <Link href={`/${lang}/about`}>
              {t('h_about')}
            </Link>
          </li>

          <li className="content" tabIndex={0}>
            <Link href={`/${lang}/category`}>
              <span>{t('h_content')}</span>
            </Link>

            <div className={`submenu`}>
              <div className="submenu-left">
                <p>{t('content_intro')}</p>

                <Link href={`/${lang}/category`}>
                  <Icons type="arrowWhite" />
                  {t('content_see_all')}
                </Link>
              </div>

              <div className="submenu-right">
                <ul>
                  <li>{ct('market_research')}</li>
                  <li>
                    <Link href={`/${lang}/category/?name=market`}>
                      <Icons type="arrowWhite" />
                      {ct('market')}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${lang}/category/?name=corporate`}>
                      <Icons type="arrowWhite" />
                      {ct('corporate')}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${lang}/category/?name=consumer`}>
                      <Icons type="arrowWhite" />
                      {ct('consumer')}
                    </Link>
                  </li>
                </ul>

                <ul>
                  <li>{ct('market_entry')}</li>
                  <li>
                    <Link href={`/${lang}/category/?name=marketing`}>
                      <Icons type="arrowWhite" />
                      {ct('marketing')}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${lang}/category/?name=partnership`}>
                      <Icons type="arrowWhite" />
                      {ct('partnership')}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${lang}/category/?name=channel`}>
                      <Icons type="arrowWhite" />
                      {ct('channel')}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${lang}/category/?name=payment`}>
                      <Icons type="arrowWhite" />
                      {ct('payment')}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            {/* //hover */}
          </li>

          <li>
            <Link href={`/${lang}/report`}>
              {t('h_report')}
            </Link>
          </li>
          <li>
            <Link href={`/${lang}/project`}>
              {t('h_project')}
            </Link>
          </li>
        </ul>
      </nav>

      <nav className="right-nav">
        <ul>
          <li>
            <span className="search-link" onClick={() => onOpenMenu('search')}>
              <Image src={SearchImg} alt="Search" />
              {t('h_search')}
            </span>
          </li>
          <li>
            {isUser ? (
              <Link href={`/${lang}/my-page/content`}>
                {t('h_my_page')}
              </Link>
            ) : (
              <Link href={`/${lang}/sign-in`}>
                <Icons type="arrowBlack" />
                {t('h_sign_in')}
              </Link>
            )}
          </li>
          <li>
            <LanguageSwitcher lang={lang} />
          </li>
        </ul>
      </nav>
      {/* //web version nav */}

      <HamburgerMenu lang={lang} openMenu={openMenu} onOpenMenu={onOpenMenu} />

      {openMenu === 'search' && (
        <SearchWall lang={lang} onClose={() => onOpenMenu()} />
      )}
    </header>
  )
}
