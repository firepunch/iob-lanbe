'use client'

import { getProductBySlug } from '@/api_gql'
import { createWatchList, removeWatchList } from '@/api_wp'
import { Bookmark } from '@/components'
import { useTranslation } from '@/i18n/client'
import { ValidLocale } from '@/i18n/settings'
import useContentState from '@/stores/contentStore'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { dateFormat, getAuthorInfo, getUserId, isValidToken } from '@/utils/lib'

import ShareImg from '@/imgs/share.png'

export default function Report({
  params: { lang, report_slug },
}: {
  params: { lang: ValidLocale; report_slug: string; },
}) {
  const { report, updateReport } = useContentState(state => state)
  const { t } = useTranslation(lang, 'report-detail')
  const userId = getUserId()

  useEffect(() => {
    getProductBySlug(report_slug, userId).then(result => {
      updateReport(result)
    })
  }, [])

  const handleToggleBookmark = async ({ isSaved, databaseId }) => {
    try {
      if (isSaved) {
        await removeWatchList({
          type: 'report',
          content_id: databaseId,
          user_id: userId,
        })
      } else {
        await createWatchList({
          type: 'report',
          content_id: databaseId,
          user_id: userId,
        })
      }

      const result = await getProductBySlug(report_slug, userId)
      updateReport(result)
    } catch (err) {
      console.log(err)
      alert('저장 실패')
    }
  }

  if (!report) {
    return 'loading'
  }

  return (
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

          <h2>{report.name}</h2>

          {report.productTags?.nodes && (
            <div className="tags">
              {report.productTags.nodes.map(item => (
                <div key={item.id} className="indiv-tag">
                  <p>{item.name}</p>
                </div>
              ))}       
            </div>
          )}

          <div className="report-details">
            <ul>
              <li>{t('writer')}</li>
              <li>{t('date')}</li>
              <li>{t('category')}</li>
              <li>{t('pages')}</li>
              <li>{t('price')}</li>
            </ul>

            <ul>
              <li>{getAuthorInfo(report.author)}</li>
              <li>{dateFormat(report.date, true)}</li>
              <li>
                {report.productTags.nodes?.map(
                  item => item.name
                ).join(', ')}
              </li>
              <li>
                {report.attributes.edges.find(item => 
                  item.node.name === 'Pages'
                )?.node.options[0]}
              </li>
              <li>{report.price}</li>
            </ul>
          </div>
        </div>
      </section>

      <div dangerouslySetInnerHTML={{ __html: report.description }} />

      {/* section 3: report price and cta */}
      <section id="report-price-cta">
        <div id="report-price-cta-wrap">
          <div className="report-title">
            <h4>{report.name}</h4>
          </div>

          <div className="report-total-price">
            <p>{t('total')}</p>
            <p>{report.price}</p>
          </div>

          <div className="report-cta">
            {isValidToken() ? (
              <>
                <p>{t('pay_now_cta')}</p>
                <Link href={`/${lang}/checkout`}>
                  {t('pay_now')}
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
  )
}
