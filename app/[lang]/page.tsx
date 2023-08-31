'use client'

import { getAllPosts, getAllReports } from '@/api_gql'
import { createWatchList, removeWatchList } from '@/api_wp'
import { Icons, NavigationWidget, PostCard, ReportCard } from '@/components'
import { useTranslation } from '@/i18n/client'
import { ValidLocale } from '@/i18n/settings'
import useContentState from '@/stores/contentStore'
import { getUserId } from '@/utils/lib'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

import BrandDesignIcon from '@/imgs/branddesign.jpg'
import CrmIcon from '@/imgs/crm.jpg'
import DataTrackingIcon from '@/imgs/datatracking.jpg'
import DigitalIcon from '@/imgs/digitalmarketing.jpg'
import EcommerceIcon from '@/imgs/ecommerce.jpg'
import MarketIcon from '@/imgs/marketanalysis.jpg'
import SocialmediaIcon from '@/imgs/socialmedia.jpg'
import StrategyIcon from '@/imgs/strategy.jpg'
import UiUxIcon from '@/imgs/uiux.jpg'

const SECTION_IDS = {
  welcome: 'firstpage',
  content: 'iob-content',
  report: 'iob-report',
  project: 'iob-project',
}

export default function Home({
  params: { lang },
}: {
  params: { lang: ValidLocale; },
}) {
  const { t } = useTranslation(lang, 'home')
  const { posts, reports, updatePosts, updateReports } = useContentState(state => state)
  const sectionRefs = useRef({})
  const userId = getUserId()

  useEffect(() => {
    getAllPosts({
      language: lang.toUpperCase(), 
      userId,
      first: 4,
    }).then(result => {
      updatePosts(result)
    })

    getAllReports({
      language: lang.toUpperCase(), 
      userId,
      first: 3,
    }).then(result => (
      updateReports(result)
    ))
  }, [])

  const handleToggleBookmark = async ({ isSaved, databaseId, type }) => {
    try {
      if (isSaved) {
        await removeWatchList({
          type,
          content_id: databaseId,
          user_id: userId,
        })
      } else {
        await createWatchList({
          type,
          content_id: databaseId,
          user_id: userId,
        })
      }

      if (type === 'post') {
        const result = await getAllPosts({
          language: lang.toUpperCase(), 
          userId,
          first: 4,
        })
        updatePosts(result)
      } else if (type === 'report') {
        const result = await getAllReports({
          language: lang.toUpperCase(), 
          userId,
          first: 3,
        })
        updateReports(result)
      }
    } catch (err) {
      console.log(err)
      alert('저장 실패')
    }
  }

  return (
    <>
      {/* section 1: Welcome */}
      <section 
        id={SECTION_IDS.welcome}
        ref={(el) => (sectionRefs.current[SECTION_IDS.welcome] = el)}
      >

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
            <Link href={{ pathname: `/${lang}/category` }} className="fp-cta" >
              <Icons type="arrowWhite" />
              <p>{t('iob-content')}</p>
            </Link>

            <Link href={{ pathname: `/${lang}/report` }} className="fp-cta">
              <Icons type="arrowWhite" />
              <p>{t('iob-report')}</p>
            </Link>

            <Link href={{ pathname: `/${lang}/project` }} className="fp-cta">
              <Icons type="arrowWhite" />
              <p>{t('iob-project')}</p>
            </Link>
          </div>
        </div>
      </section>

      <NavigationWidget
        t={t}
        sectionIds={SECTION_IDS}
        sectionRefs={sectionRefs}
      />

      {/* section 2: I.O.B content */}
      <section 
        id={SECTION_IDS.content} 
        className="fp-main"
        ref={(el) => (sectionRefs.current[SECTION_IDS.content] = el)}
      >
        <div id="iob-content-title-wrap" className="firstpage-title">
          <h2>{t('iob-content')}</h2>

          <div className="iob-content-info">
            <p className="description">{t('content-desc')}</p>

            <Link href={{ pathname: `/${lang}/category` }} className="cta-web">
              <Icons type="arrowBlack" />
              <p>{t('see-all')}</p>
            </Link>
          </div>
        </div>

        <div id="section-wrap">
          <h3>{t('latest')}</h3>

          <div className="iob-latest-content">
            {posts?.edges?.map(({ node }) => (
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

          <Link href={{ pathname: `/${lang}/category` }} className="content-cta-mobile">
            <Icons type="arrowBlack" />
            <p>{t('see-all')}</p>
          </Link>

        </div>
      </section>


      {/* section 3: I.O.B report */}
      <section 
        id={SECTION_IDS.report}
        className="fp-main"
        ref={(el) => (sectionRefs.current[SECTION_IDS.report] = el)}
      >
        <div id="iob-report-title-wrap" className="firstpage-title">
          <h2>{t('iob-report')}</h2>

          <div className="iob-report-info">
            <p className="description">{t('report-desc')}</p>
            <Link href={{ pathname: `/${lang}/report` }} className="cta-web">
              <Icons type="arrowBlack" />
              <p>{t('see-all')}</p>
            </Link>
          </div>
        </div>

        <div id="section-wrap">
          <h3>{t('latest')}</h3>

          <div className="iob-latest-report">
            {reports?.edges?.map(({ node }) => (
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
          </div>

          <Link href={{ pathname: `/${lang}/report` }} className="report-cta-mobile">
            <Icons type="arrowBlack" />
            <p>{t('see-all')}</p>
          </Link>

        </div>
      </section>


      {/* section 4: I.O.B project */}
      <section 
        id={SECTION_IDS.project} 
        className="fp-main"
        ref={(el) => (sectionRefs.current[SECTION_IDS.project] = el)}
      >
        <div id="iob-project-title-wrap" className="firstpage-title">
          <h2>{t('iob-project')}</h2>

          <div className="iob-project-info">
            <p className="description">
              {t('project-desc')}
            </p>

            <Link href={{ pathname: `/${lang}/project` }} className="cta-web-proj">
              <Icons type="arrowBlack" />
              <p>{t('see-details')}</p>
            </Link>
          </div>
        </div>

        <div id="project-diagram" className="project-diagram">
          <div className="pd-flex-wrap">

            {/* market entry side */}
            <div className="market-entry">
              <div className="pd-title">
                <p>{t('market')}<br/> {t('entry')}</p>
              </div>

              <div className="pd-wrap">
                <div className="solution">
                  <Image src={MarketIcon} alt="Market Analysis" />
                  <p>{t('market')}<br/> {t('analysis')}</p>
                </div>

                <div className="solution">
                  <Image src={StrategyIcon}  alt="Strategy" />
                  <p>{t('strategy')}</p>
                </div>

                <div className="solution">
                  <Image src={BrandDesignIcon}  alt="Brand Design" />
                  <p>{t('brand')}<br/> {t('design')}</p>
                </div>

                <div className="solution">
                  <Image src={UiUxIcon} alt="UI/UX Design & Web/App Development" />
                  <p>{t('uiux')}<br/> {t('wepapp')}</p>
                </div>
              </div>
            </div>

            {/* digital marketing side */}
            <div className="digital-marketing">
              <div className="pd-title">
                <p>{t('digital-marketing')}<br/> {t('operations')}</p>
              </div>

              <div className="pd-wrap">
                <div className="solution">
                  <Image src={EcommerceIcon} alt="E-commerce" />
                  <p>{t('e-commerce')}</p>
                </div>

                <div className="solution">
                  <Image src={SocialmediaIcon} alt="Social Media" />
                  <p>{t('social')}<br/> {t('media')}</p>
                </div>

                <div className="solution">
                  <Image src={DigitalIcon} alt="Digital Marketing" />
                  <p>{t('digital')}<br/> {t('marketing')}</p>
                </div>

                <div className="solution">
                  <Image src={CrmIcon} alt="CRM" />
                  <p>{t('crm')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* data tracking */}
          <div className="data-tracking">
            <div className="dt-line"></div>

            <div className="solution">
              <Image src={DataTrackingIcon} alt="Data Tracking & Analysis" />
              <p>{t('data-tracking')}{t('andAnalysis')}</p>
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
