'use client'

import { useTranslation } from '@/i18n/client'
import { ValidLocale } from '@/i18n/settings'
import { isValidUser } from '@/utils/lib'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Icons from '../Icons'
import SearchWall from '../SearchWall'

import HamburgerWhiteImg from '@/imgs/hamburger_white.png'
import SearchBlackIcon from '@/imgs/search_black.png'
import userIcon from '@/imgs/user.png'
import useUserState from '@/stores/userStore'

export default function MobileMenu({
  lang,
}: {
  lang: ValidLocale
}) {
  const { t: ct } = useTranslation(lang, 'category-page')
  const { t } = useTranslation(lang, 'layout')
  const { user, updateUser } = useUserState(state => state)
  const { isValid, user: storageUser } = isValidUser()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openSearchWall, setOpenSearchWall] = useState<boolean>(false)
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [isUser, setIsUser] = useState<boolean>(false)

  useEffect(() => {
    if (storageUser) updateUser(storageUser)
  }, [])

  useEffect(() => {
    setIsUser(Boolean(isValid || user))
  }, [isValid, user])

  const handleCloseMenu = () => setIsMenuOpen(false)

  return (
    <>
      <a className="hamburger-mobile" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <Image src={HamburgerWhiteImg} alt="Hamburger menu" />
      </a>
      
      {isMenuOpen && (
        <section id="mobile-menu" className="show" onClick={handleCloseMenu}>
          {/* about us */}
          <div id="mm-about-us">
            <Link href="/about">
              <h2>{t('about')}</h2>
              <Icons type="arrowBlack" />
            </Link>
          </div>

          {/* content */}
          <div id="mm-content">
            <div 
              className={`menu-categ mm-content-top ${isCategoryOpen && 'down'}`} 
              onClick={(e) => {
                e.stopPropagation()
                setIsCategoryOpen(!isCategoryOpen)
              }}
            >
              <h2>{t('content')}</h2>
              <Icons type="arrowBlackDown" />
            </div>

            {isCategoryOpen && (
              <div className="other-content-pages">
                <ul>
                  <li className="main-categ">{ct('market_research')}</li>
                  <li className="sub-categ">
                    <Link href={`/${lang}/category/?name=market`}>
                      <Icons type="arrowBlack" />
                      {ct('market')}
                    </Link>
                  </li>
                  <li className="sub-categ">
                    <Link href={`/${lang}/category/?name=corporate`}>
                      <Icons type="arrowBlack" />
                      {ct('corporate')}
                    </Link>
                  </li>
                  <li className="sub-categ">
                    <Link href={`/${lang}/category/?name=consumer`}>
                      <Icons type="arrowBlack" />
                      {ct('consumer')}
                    </Link>
                  </li>
                </ul>

                <ul>
                  <li className="main-categ">{ct('market_entry')}</li>
                  <li className="sub-categ">
                    <Link href={`/${lang}/category/?name=marketing`}>
                      <Icons type="arrowBlack" />
                      {ct('marketing')}
                    </Link>
                  </li>
                  <li className="sub-categ">
                    <Link href={`/${lang}/category/?name=partnership`}>
                      <Icons type="arrowBlack" />
                      {ct('partnership')}
                    </Link>
                  </li>
                  <li className="sub-categ">
                    <Link href={`/${lang}/category/?name=channel`}>
                      <Icons type="arrowBlack" />
                      {ct('channel')}
                    </Link>
                  </li>
                  <li className="sub-categ">
                    <Link href={`/${lang}/category/?name=payment`}>
                      <Icons type="arrowBlack" />
                      {ct('payment')}
                    </Link>
                  </li>
                </ul>

                <Link href={`/${lang}/category`} className="see-all">
                  {t('content_see_all')}
                </Link>
              </div>
            )}
          </div>

          {/* report */}
          <div id="mm-report">
            <Link href={`/${lang}/report`}>
              <h2>{t('report')}</h2>
              <Icons type="arrowBlack" />
            </Link>
          </div>

          {/* project */}
          <div id="mm-project">
            <Link href={`/${lang}/project`}>
              <h2>{t('project')}</h2>
              <Icons type="arrowBlack" />
            </Link>
          </div>

          {/* search */}
          <div id="mm-search">
            <span 
              className="search-link"
              onClick={() => setOpenSearchWall(true)}
            >
              <h2>{t('search')}</h2>
              <Image src={SearchBlackIcon} alt="Search" />
            </span>
          </div>

          {/* signin */}
          <div id="mm-signin" onClick={handleCloseMenu}> 
            {isUser ? (
              <Link href={`/${lang}/my-page/content`}>
                <h2>{t('my_page')}</h2>
              </Link>
            ) : (
              <Link href="/sign-in">
                <h2>{t('sign_in')}</h2>
                <Image src={userIcon} alt="User icon" />
              </Link>
            )}
          </div>
        </section>
      )}

      {openSearchWall && (
        <SearchWall lang={lang} onClose={() => setOpenSearchWall(false)} />
      )}
    </>
  )
}
