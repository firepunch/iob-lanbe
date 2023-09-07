'use client'

import { useTranslation } from '@/i18n/client'
import { ValidLocale } from '@/i18n/settings'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Icons from '../Icons'
import SearchWall from '../SearchWall'

import HamburgerWhiteImg from '@/imgs/hamburger_white.png'
import HamburgerBlackImg from '@/imgs/hamburger_black.png'
import SearchBlackIcon from '@/imgs/search_black.png'
import userIcon from '@/imgs/user.png'
import useUserState from '@/stores/userStore'
import { usePathname } from 'next/navigation'

const WHITE_ICONS = [
  'about',
  'project',
]

export default function HamburgerMenu({
  lang,
  openMenu,
  onOpenMenu,
}: {
  lang: ValidLocale
  openMenu?: string
  onOpenMenu: (menu?: string) => void
}) {
  const pathName = usePathname()
  const { t: ct } = useTranslation(lang, 'category-page')
  const { t } = useTranslation(lang, 'layout')
  const { user } = useUserState(state => state)
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [isUser, setIsUser] = useState(false)

  useEffect(() => {
    setIsUser(Boolean(user?.databaseId))
  }, [user?.databaseId])
  
  const handleCloseHamburger = () => onOpenMenu()

  return (
    <>
      <a 
        className="hamburger-mobile" 
        onClick={() => onOpenMenu(openMenu === 'hamburger' ? undefined : 'hamburger')}
      >
        <Image 
          src={
            WHITE_ICONS.find(item => pathName.includes(item)) ?
              HamburgerWhiteImg :
              HamburgerBlackImg
          } 
          alt="Hamburger menu" 
        />
      </a>
      
      {openMenu === 'hamburger' && (
        <section id="mobile-menu" className="show" onClick={handleCloseHamburger}>
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
                  <li className="sub-categ" onClick={handleCloseHamburger}>
                    <Link href={`/${lang}/category/?name=market`}>
                      <Icons type="arrowBlack" />
                      {ct('market')}
                    </Link>
                  </li>
                  <li className="sub-categ" onClick={handleCloseHamburger}>
                    <Link href={`/${lang}/category/?name=corporate`}>
                      <Icons type="arrowBlack" />
                      {ct('corporate')}
                    </Link>
                  </li>
                  <li className="sub-categ" onClick={handleCloseHamburger}>
                    <Link href={`/${lang}/category/?name=consumer`}>
                      <Icons type="arrowBlack" />
                      {ct('consumer')}
                    </Link>
                  </li>
                </ul>

                <ul>
                  <li className="main-categ">{ct('market_entry')}</li>
                  <li className="sub-categ" onClick={handleCloseHamburger}>
                    <Link href={`/${lang}/category/?name=marketing`}>
                      <Icons type="arrowBlack" />
                      {ct('marketing')}
                    </Link>
                  </li>
                  <li className="sub-categ" onClick={handleCloseHamburger}>
                    <Link href={`/${lang}/category/?name=partnership`}>
                      <Icons type="arrowBlack" />
                      {ct('partnership')}
                    </Link>
                  </li>
                  <li className="sub-categ" onClick={handleCloseHamburger}>
                    <Link href={`/${lang}/category/?name=channel`}>
                      <Icons type="arrowBlack" />
                      {ct('channel')}
                    </Link>
                  </li>
                  <li className="sub-categ" onClick={handleCloseHamburger}>
                    <Link href={`/${lang}/category/?name=payment`}>
                      <Icons type="arrowBlack" />
                      {ct('payment')}
                    </Link>
                  </li>
                </ul>

                <Link href={`/${lang}/category`} className="see-all" onClick={handleCloseHamburger}>
                  {t('content_see_all')}
                </Link>
              </div>
            )}
          </div>

          {/* report */}
          <div id="mm-report" onClick={handleCloseHamburger}>
            <Link href={`/${lang}/report`}>
              <h2>{t('report')}</h2>
              <Icons type="arrowBlack" />
            </Link>
          </div>

          {/* project */}
          <div id="mm-project" onClick={handleCloseHamburger}>
            <Link href={`/${lang}/project`}>
              <h2>{t('project')}</h2>
              <Icons type="arrowBlack" />
            </Link>
          </div>

          {/* search */}
          <div id="mm-search" onClick={handleCloseHamburger}>
            <span 
              className="search-link"
              onClick={() => onOpenMenu('search')}
            >
              <h2>{t('search')}</h2>
              <Image src={SearchBlackIcon} alt="Search" />
            </span>
          </div>

          {/* signin */}
          <div id="mm-signin" onClick={handleCloseHamburger}> 
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

      {openMenu === 'search' && (
        <SearchWall lang={lang} onClose={handleCloseHamburger} />
      )}
    </>
  )
}
