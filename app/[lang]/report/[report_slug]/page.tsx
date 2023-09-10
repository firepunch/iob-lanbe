'use client'

import { getReportBySlug } from '@/api_gql'
import { updateCountDownload, updateCountView } from '@/api_wp'
import { Bookmark, DownloadWall, ShareLinks, Tags } from '@/components'
import useStore from '@/hooks/useStore'
import { useTranslation } from '@/i18n/client'
import { ValidLocale } from '@/i18n/settings'
import ShareImg from '@/imgs/share.png'
import useContentState from '@/stores/contentStore'
import useUserState, { INIT_USER_STATE } from '@/stores/userStore'
import { dateFormat, getAuthorInfo } from '@/utils/lib'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Report({
  params: { lang, report_slug },
}: {
  params: { lang: ValidLocale; report_slug: string; },
}) {
  const { _hasHydrated, user } = useStore(useUserState, state => state, INIT_USER_STATE)
  const { report, updateReport } = useContentState(state => state)
  const { t } = useTranslation(lang, 'report-detail')
  const [isOpenShare, setIsOpenShare] = useState(false)

  useEffect(() => {
    getReportBySlug({
      reportSlug: decodeURI(report_slug), 
      userId: user.databaseId,
      email: user.email,
      lang,
    }).then(result => {
      updateReport(result)
      updateCountView({
        user_id: user.databaseId,
        content_id: result?.databaseId,
        lang,
      })
    })
  }, [user])

  const handleReload = async () => {
    const result = await getReportBySlug({
      reportSlug: decodeURI(report_slug), 
      userId: user.databaseId,
      email: user.email,
    })
    updateReport(result)
  }

  const handleUpdateCount = async () => {
    await updateCountDownload({
      user_id: user.databaseId,
      content_id: report?.databaseId,
      lang,
    })
  }

  if (!_hasHydrated || !report) {
    return <div></div>
  }

  return (
    <>
      <div className="iob-single-report">
        <section id="report-firstpage">
          <div id="report-firstpage-left">
            <div className="save-share">
              <Bookmark 
                isSaved={report.lanbeContent.is_save}
                metaKey={`report_${lang}`}
                contentId={report.databaseId}
                onFetchData={handleReload}
              />

              <div className="share-button">
                <Image src={ShareImg} alt="Share" onClick={() => setIsOpenShare(!isOpenShare)} />
                {isOpenShare && (
                  <ShareLinks onClose={() => setIsOpenShare(!isOpenShare)} />
                )}
              </div>
            </div>

            <h2>{report.title}</h2>

            {report.reportCategories?.edges && (
              <div className="content-tags">
                {report.reportCategories?.edges?.map(({ node }) => (
                  node.parentId && node.parent.node.name !== 'Country' && (
                    <div className="ct" key={node.id}>
                      <p>{node.parent.node.name}</p>
                      <p>{node.name}</p>
                    </div>
                  ))
                )}
              </div>
            )}

            <div className="report-details">
              <ul>
                <li>{t('writer')}</li>
                <li>{t('date')}</li>
                <li>{t('category')}</li>
                <li>{t('pages')}</li>
              </ul>

              <ul>
                <li>{getAuthorInfo(report.author)}</li>
                <li>{dateFormat(report.date, true)}</li>
                <li>
                  {report.reportCategories?.edges?.length ?
                    report.reportCategories?.edges?.filter(({ node }) => (
                      node.parent.node.name !== 'Country'
                    ))?.map(({ node }) => node.name).join(', ') : 
                    '-'}
                </li>
                <li>
                  {report.lanbeContent?.pages}
                </li>
              </ul>
            </div>
          </div>
          <div id="report-firstpage-right">
            <h4>Why it matters?</h4>
            <p>{report.lanbeContent?.whyItMatters}</p>
          </div>
        </section>

        {user.databaseId ? (
          <DownloadWall 
            t={t}
            bgImage={report.lanbeContent?.thirdImage || report.featuredImage?.node?.sourceUrl || ''}
            downloadLink={report.lanbeContent?.downloadFile}
            onDownload={handleUpdateCount}
          />
        ) : (
          <section id="report-price-cta">
            <div id="report-price-cta-wrap">
              <div className="report-title">
                <h4>{report.title}</h4>
              </div>
              <div className="report-cta">
                <p>{t('sign_in_cta')}</p>
                <Link href={`/${lang}/sign-in`}>
                  {t('sign_in')}
                </Link>
              </div>
            </div>
          </section>
        )}
       
      </div>
    </>
  )
}
