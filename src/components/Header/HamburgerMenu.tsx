'use client'

import { useState } from 'react'
import { ValidLocale } from '@/i18n/settings'
import Image from 'next/image'
import Link from 'next/link'
import Icons from '../Icons'

import HamburgerWhiteImg from '@/imgs/hamburger_white.png'
import SearchBlackIcon from '@/imgs/search_black.png'
import userIcon from '@/imgs/user.png'

export default function MobileMenu({
  lang,
}: {
  lang: ValidLocale
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)

  const handleCloseMenu = () => setIsMenuOpen(false)

  return (
    <>
      <a className="hamburger-mobile" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <Image src={HamburgerWhiteImg} alt="Hamburger menu" />
      </a>
      
      {isMenuOpen && (
        <section id="mobile-menu" className="show">
          {/* about us */}
          <div id="mm-about-us">
            <Link href="/about" onClick={handleCloseMenu}>
              <h2>About us</h2>
              <Icons type="arrowBlack" />
            </Link>
          </div>

          {/* content */}
          <div id="mm-content">
            <div 
              className={`menu-categ mm-content-top ${isCategoryOpen && 'down'}`} 
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            >
              <h2>Content</h2>
              <Icons type="arrowBlackDown" />
            </div>

            {isCategoryOpen && (
              <div className="other-content-pages">
                <ul>
                  <li className="main-categ">Market Research</li>
                  <li className="sub-categ"><a href="contents_market.html"><Icons type="arrowBlack" /><p>Market</p></a></li>
                  <li className="sub-categ"><a href="#"><Icons type="arrowBlack" /><p>Corporate</p></a></li>
                  <li className="sub-categ"><a href="#"><Icons type="arrowBlack" /><p>Consumer</p></a></li>
                </ul>

                <ul>
                  <li className="main-categ">Market Entry</li>
                  <li className="sub-categ"><a href="contents_marketing.html"><Icons type="arrowBlack" /><p>Marketing</p></a></li>
                  <li className="sub-categ"><a href="#"><Icons type="arrowBlack" /><p>Partnership</p></a></li>
                  <li className="sub-categ"><a href="#"><Icons type="arrowBlack" /><p>Channel</p></a></li>
                  <li className="sub-categ"><a href="#"><Icons type="arrowBlack" /><p>Payment</p></a></li>
                </ul>

                <a href="allcontents.html" className="see-all">See all</a>
              </div>
            )}
          </div>

          {/* report */}
          <div id="mm-report">
            <a href="allreports.html">
              <h2>Report</h2>
              <Icons type="arrowBlack" />
            </a>
          </div>

          {/* project */}
          <div id="mm-project">
            <a href="project_beforesignin.html">
              <h2>Project</h2>
              <Icons type="arrowBlack" />
            </a>
          </div>

          {/* search */}
          <div id="mm-search">
            <a href="search.html">
              <h2>Search</h2>
              <Image src={SearchBlackIcon} alt="Search" />
            </a>
          </div>

          {/* signin */}
          <div id="mm-signin">
            <a href="signin.html">
              <h2>Sign in</h2>
              <Image src={userIcon} alt="User icon" />
            </a>
          </div>
        </section>
      )}
    </>
  )
}
