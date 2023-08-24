'use client'

import { getAllProducts } from '@/api_gql'
import { createWatchList, removeWatchList } from '@/api_wp'
import { Pagination, ReportCard, Select } from '@/components'
import { useTranslation } from '@/i18n/client'
import { ValidLocale } from '@/i18n/settings'
import useContentState from '@/stores/contentStore'
import { getUserId } from '@/utils/lib'
import { useEffect } from 'react'

// export async function generateMetadata({ params: { lang } }) {
const GRID_CARD_NUMBER = 6

export default function Reports({
  params: { lang },
}: {
  params: { lang: ValidLocale; },
}) {
  const { reports, updateReports } = useContentState(state => state)
  const { t: ct } = useTranslation(lang, 'common')
  const { t } = useTranslation(lang, 'report')
  const userId = getUserId()

  useEffect(() => {
    getAllProducts(lang, userId).then(result => (
      updateReports(result)
    ))
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

      const result = await getAllProducts(lang, userId)
      updateReports(result)
    } catch (err) {
      console.log(err)
      alert('저장 실패')
    }
  }

  return (
    <>
      <section id="all-report-title">
        <div id="report-title-description">
          <h2>{t('report_h2')}</h2>
          <p>{t('report_intro')}</p>
        </div>

        <div className="sort">
          <label htmlFor="sortby">{ct('sort_by')}</label>
          <Select
            name="sortby" 
            id="sortby"
            options={ct('sort_options', { returnObjects: true }) }
          />
        </div>
      </section>

      <section id="reports-grid">
        <div id="all-reports-wrap">
          {reports?.map(({ node }) => (
            <ReportCard
              key={node.id}
              onToggleBookmark={() => (
                handleToggleBookmark({
                  isSaved: node.lanbeContent.is_save,
                  databaseId: node.databaseId,
                })
              )}
              {...node}
            />
          ))}
        </div>

        <Pagination 
          size={GRID_CARD_NUMBER}
          onClickPrev={() => {}}
          onClickNext={() => {}}
        />
      </section>
    </>
  )
}
