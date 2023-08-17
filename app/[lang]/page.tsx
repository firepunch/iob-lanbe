'use client'

import { getAllPosts, getAllProducts } from '@/api_gql'
import { Icons, PostCard, ReportCard } from '@/components'
import { useTranslation } from '@/i18n/client'
import { ValidLocale } from '@/i18n/settings'
import useContentState from '@/stores/contentStore'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { createWatchList, removeWatchList } from '@/api_wp'

import BrandDesignIcon from '@/imgs/branddesign.jpg'
import CrmIcon from '@/imgs/crm.jpg'
import DataTrackingIcon from '@/imgs/datatracking.jpg'
import DigitalIcon from '@/imgs/digitalmarketing.jpg'
import EcommerceIcon from '@/imgs/ecommerce.jpg'
import MarketIcon from '@/imgs/marketanalysis.jpg'
import SocialmediaIcon from '@/imgs/socialmedia.jpg'
import StrategyIcon from '@/imgs/strategy.jpg'
import UiUxIcon from '@/imgs/uiux.jpg'

// export async function generateMetadata({ params: { lang } }) {

export default function Home({
  params: { lang },
}: {
  params: { lang: ValidLocale; },
}) {
  const { t } = useTranslation(lang, 'second-page')
  const { posts, reports, updatePosts, updateReports } = useContentState(state => state)

  useEffect(() => {
    getAllPosts(lang.toUpperCase(), 231936698).then(result => {
      updatePosts(result)
    })

    getAllProducts(lang, 231936698).then(result => (
      updateReports(result)
    ))
  }, [])

  const handleToggleBookmark = async ({ isSaved, databaseId, type }) => {
    try {
      if (isSaved) {
        await removeWatchList({
          content_id: databaseId,
          type,
        })
      } else {
        await createWatchList({
          content_id: databaseId,
          type,
        })
      }

      if (type === 'post') {
        const result = await getAllPosts(lang.toUpperCase(), 231936698)
        updatePosts(result)
      } else if (type === 'report') {
        const result = await getAllProducts(lang, 231936698)
        updateReports(result)
      }
    } catch (err) {
      console.log(err)
      alert('저장 실패')
    }
  }

  return (
    <>
      <section id="firstpage">

        <div id="firstpage-toptext">
          <p className="toptext-left">
            {t('ideas-from')}<span>{t('southeast-asia')}</span>
          </p>

          <p className="toptext-center">
            {t('find-your')}<span>{t('business-opportunity')}</span>
          </p>

          <p className="toptext-right">
            <span>I</span>deas <span>O</span>n <span>B</span>oard.
          </p>
        </div>

        <div id="firstpage-img">
          <p className="intro-slogan">{t('intro-slogan')}</p>

          <p className="intro-text">
            {t('intro-text')}
          </p>
          <div className="firstpage-cta">
            <Link href={{ pathname: `/content` }} className="fp-cta" >
              <Icons type="arrowWhite" />
              <p>{t('iob-content')}</p>
            </Link>

            <Link href={{ pathname: `/report` }} className="fp-cta">
              <Icons type="arrowWhite" />
              <p>{t('iob-report')}</p>
            </Link>

            <Link href={{ pathname: `/project` }} className="fp-cta">
              <Icons type="arrowWhite" />
              <p>{t('iob-project')}</p>
            </Link>
          </div>
        </div>

      </section>
      {/* //section 1: first page */}


      {/* aside: fixed widget */}
      <aside>

        <div id="widget">
          <div className="line"></div>

          <div className="widget-detail">
            <div className="square sq1"></div>
            <p>{t('welcome')}</p>
          </div>

          <div className="widget-detail">
            <div className="square sq2"></div>
            <p>{t('content')}</p>
          </div>

          <div className="widget-detail">
            <div className="square sq3"></div>
            <p>{t('report')}</p>
          </div>

          <div className="widget-detail">
            <div className="square sq4"></div>
            <p>{t('project')}</p>
          </div>
        </div>

      </aside>
      {/* //aside: fixed widget */}


      {/* section 2: I.O.B content */}
      <section id="iob-content" className="fp-main">
        <div id="iob-content-title-wrap" className="firstpage-title">
          <h2>{t('iob-content')}</h2>

          <div className="iob-content-info">
            <p className="description">We provide meaningful and comprehensive content that matters and inspires.</p>

            <Link href={{ pathname: `/category` }} className="cta-web">
              <Icons type="arrowBlack" />
              <p>{t('see-all')}</p>
            </Link>
          </div>
        </div>

        <div id="section-wrap">
          <h3>{t('latest')}</h3>

          {/* iob latest content grid */}
          <div className="iob-latest-content">

            {/* individual thumbnails */}
            {posts?.map(({ node }) => (
              <PostCard
                key={node.id}
                onToggleBookmark={() => (
                  handleToggleBookmark({
                    type: 'post',
                    isSaved: node.lanbeContent.is_save,
                    databaseId: node.databaseId,
                  })
                )}
                {...node}
              />
            ))}
          </div>
          {/* //iob latest content grid */}

          <Link href={{ pathname: `/content` }} className="content-cta-mobile">
            <Icons type="arrowBlack" />
            <p>{t('see-all')}</p>
          </Link>

        </div>
      </section>
      {/* //section 2: I.O.B content */}


      {/* section 3: I.O.B report */}
      <section id="iob-report" className="fp-main">
        <div id="iob-report-title-wrap" className="firstpage-title">
          <h2>{t('iob-report')}</h2>

          <div className="iob-report-info">
            <p className="description">{t('report-description')}</p>
            <Link href={{ pathname: `/report` }} className="cta-web">
              <Icons type="arrowBlack" />
              <p>{t('see-all')}</p>
            </Link>
          </div>
        </div>

        <div id="section-wrap">
          <h3>{t('latest')}</h3>

          {/* iob latest report grid */}
          <div className="iob-latest-report">

            {/* individual thumbnails */}
            {reports?.map(({ node }) => (
              <ReportCard
                key={node.id}
                onToggleBookmark={() => (
                  handleToggleBookmark({
                    type: 'report',
                    isSaved: node.lanbeContent.is_save,
                    databaseId: node.databaseId,
                  })
                )}
                {...node}
              />
            ))}
            {/* //individual thumbnails */}

          </div>
          {/* //iob latest report grid */}

          <Link href={{ pathname: `/report` }} className="report-cta-mobile">
            <Icons type="arrowBlack" />
            <p>{t('see-all')}</p>
          </Link>

        </div>
      </section>
      {/* //section 3: I.O.B report */}


      {/* section 4: I.O.B project */}
      <section id="iob-project" className="fp-main">
        <div id="iob-project-title-wrap" className="firstpage-title">
          <h2>{t('iob-project')}</h2>

          <div className="iob-project-info">
            <p className="description">
              {t('project-description')}
            </p>

            <Link href={{ pathname: `/project` }} className="cta-web-proj">
              <Icons type="arrowBlack" />
              <p>{t('see-details')}</p>
            </Link>
          </div>
        </div>

        <div id="project-diagram" className="project-diagram">
          <div className="pd-flex-wrap">

            {/* market entry side */}
            <div className="market-entry">
              <div className="pd-title"><p>Market<br /> Entry</p></div>

              <div className="pd-wrap">
                <div className="solution">
                  <Image src={MarketIcon} alt="Market Analysis" />
                  <p>Market<br /> Analysis</p>
                </div>

                <div className="solution">
                  <Image src={StrategyIcon}  alt="Strategy" />
                  <p>Strategy</p>
                </div>

                <div className="solution">
                  <Image src={BrandDesignIcon}  alt="Brand Design" />
                  <p>Brand<br /> Design</p>
                </div>

                <div className="solution">
                  <Image src={UiUxIcon} alt="UI/UX Design & Web/App Development" />
                  <p>UI/UX Design &<br /> Web/App Development</p>
                </div>
              </div>
            </div>

            {/* digital marketing side */}
            <div className="digital-marketing">
              <div className="pd-title"><p>Digital Marketing<br /> & Operations</p></div>

              <div className="pd-wrap">
                <div className="solution">
                  <Image src={EcommerceIcon} alt="E-commerce" />
                  <p>E-Commerce</p>
                </div>

                <div className="solution">
                  <Image src={SocialmediaIcon} alt="Social Media" />
                  <p>Social<br /> Media</p>
                </div>

                <div className="solution">
                  <Image src={DigitalIcon} alt="Digital Marketing" />
                  <p>Digital<br /> Marketing</p>
                </div>

                <div className="solution">
                  <Image src={CrmIcon} alt="CRM" />
                  <p>CRM</p>
                </div>
              </div>
            </div>

          </div>

          {/* data tracking */}
          <div className="data-tracking">
            <div className="dt-line"></div>

            <div className="solution">
              <Image src={DataTrackingIcon} alt="Data Tracking & Analysis" />
              <p>Data Tracking & Analysis</p>
            </div>
          </div>
        </div>

        <Link href={{ pathname: `/project` }} className="project-cta-mobile">
          <Icons type="arrowBlack" />
          <p>{t('see-details')}</p>
        </Link>
      </section>
    </>
  )
}
