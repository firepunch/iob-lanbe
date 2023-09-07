'use client'

import { getReportBySlug } from '@/api_gql'
import { createWatchList, removeWatchList, updateCountDownload, updateCountView } from '@/api_wp'
import { Bookmark, PostOptions, Tags } from '@/components'
import { useTranslation } from '@/i18n/client'
import { ValidLocale } from '@/i18n/settings'
import ShareImg from '@/imgs/share.png'
import useContentState from '@/stores/contentStore'
import useUserState from '@/stores/userStore'
import { dateFormat, getAuthorInfo } from '@/utils/lib'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Report({
  params: { lang, report_slug },
}: {
  params: { lang: ValidLocale; report_slug: string; },
}) {
  const user = useUserState(state => state.user)
  const { report, updateReport } = useContentState(state => state)
  const { t } = useTranslation(lang, 'report-detail')

  useEffect(() => {
    getReportBySlug({
      reportSlug: decodeURI(report_slug), 
      userId: user.databaseId,
      email: user.email,
    }).then(result => {
      updateReport(result)
      updateCountView({
        user_id: user.databaseId,
        content_id: result?.databaseId,
        type: 'report',
      })
    })
  }, [user])

  const handleToggleBookmark = async ({ isSaved, databaseId }) => {
    try {
      if (isSaved) {
        await removeWatchList({
          type: 'report',
          content_id: databaseId,
          user_id: user.databaseId,
        })
      } else {
        await createWatchList({
          type: 'report',
          content_id: databaseId,
          user_id: user.databaseId,
        })
      }

      const result = await getReportBySlug({
        reportSlug: decodeURI(report_slug), 
        userId: user.databaseId,
        email: user.email,
      })
      updateReport(result)
    } catch (err) {
      console.log(err)
      alert('저장 실패')
    }
  }

  const handleUpdateCount = async () => {
    await updateCountDownload({
      user_id: user.databaseId,
      content_id: report?.databaseId,
      lang,
    })
  }

  if (!report) {
    return ''
  }

  return (
    <>
      <PostOptions
        isSaved={report.lanbeContent.is_save}
        onFontSize={() => {}} 
        onToggleBookmark={() => (
          handleToggleBookmark({
            isSaved: report?.lanbeContent.is_save,
            databaseId: report.databaseId,
          })
        )}
      />
      <div className="iob-single-report">
        <section id="report-firstpage">
          <div id="report-firstpage-left">
            <div className="save-share">
              <Bookmark 
                isSaved={report.lanbeContent.is_save}
                onToggle={() => (
                  handleToggleBookmark({ 
                    isSaved: report.lanbeContent.is_save,
                    databaseId: report.databaseId,
                  })
                )}
              />
              <Image src={ShareImg} alt="Share" />
            </div>

            <h2>{report.title}</h2>

            {report.reportTags?.edges && (
              <Tags lang={lang} tags={report.reportTags} />
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
                  {report.reportCategories.edges?.length ?
                    report.reportCategories.edges?.map(({ node }) => node.name).join(', ') : 
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

        <section id="report-snippets">
          {report.lanbeContent?.firstImage && (
            <Image 
              src={report.lanbeContent.firstImage} 
              alt="Report Image"
              fill
              sizes="100vw"
            />
          )}

          <div id="report-image-text1">
            {report.lanbeContent?.secondImage && (
              <Image 
                src={report.lanbeContent.secondImage} 
                alt="Report Image"
                fill
                sizes="100vw"
              />
            )}   
            <div className="rit-text">
              <p>{report.lanbeContent?.secondText}</p>
            </div>
          </div>

          <div id="report-image-text2">
            <div className="rit-text">
              <p>{report.lanbeContent?.thirdText}</p>
            </div>
            {report.lanbeContent?.thirdImage && (
              <Image 
                src={report.lanbeContent.thirdImage} 
                alt="Report Image"
                fill
                sizes="100vw"
              />
            )}   
          </div>
        </section>

        {/* section 3: report price and cta */}
        <section id="report-price-cta">
          <div id="report-price-cta-wrap">
            <div className="report-title">
              <h4>{report.title}</h4>
            </div>

            <div className="report-cta">
              {user.databaseId ? (
                <>
                  <p>{t('download_cta')}</p>
                  <Link 
                    href={report.lanbeContent?.downloadFile || ''} 
                    className="cta-link" 
                    target="_blank"
                    onClick={handleUpdateCount}
                  >
                    {t('download')}
                  </Link>
                </>
              ) : (
                <>
                  <p>{t('sign_in_cta')}</p>
                  <Link href={`/${lang}/sign-in`}>
                    {t('sign_in')}
                  </Link>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
