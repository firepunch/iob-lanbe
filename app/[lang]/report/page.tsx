'use client'

import { getAllProducts, getAllReports } from '@/api_gql'
import { createWatchList, removeWatchList } from '@/api_wp'
import { Pagination, ReportCard, Select } from '@/components'
import { useTranslation } from '@/i18n/client'
import { ValidLocale } from '@/i18n/settings'
import useContentState from '@/stores/contentStore'
import { getUserId, sort2variables } from '@/utils/lib'
import { useEffect, useState } from 'react'

// export async function generateMetadata({ params: { lang } }) {
const GRID_CARD_NUMBER = 6
const initPagination = {
  last: null, 
  before: null, 
  first: GRID_CARD_NUMBER, 
  after: null, 
}

export default function Reports({
  params: { lang },
}: {
  params: { lang: ValidLocale; },
}) {
  const { reports, updateReports } = useContentState(state => state)
  const { t: ct } = useTranslation(lang, 'common')
  const { t } = useTranslation(lang, 'report')
  const userId = getUserId()
  const [fetchParams, setFetchParams] = useState({
    language: lang.toUpperCase(), 
    userId,
    ...initPagination,
    ...sort2variables('newest'),
  })

  useEffect(() => {
    getAllReports(fetchParams).then(result => (
      updateReports({
        edges: result.edges,
        pageInfo: {
          ...result.pageInfo,
          initTotal: reports.pageInfo?.initTotal || result.pageInfo.total,
        },        
      })
    ))
  }, [fetchParams, updateReports])

  const handleSorter = (sorter) => {
    setFetchParams(prev => ({
      ...prev,
      ...initPagination,
      ...sort2variables(sorter),
    }))
  }

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

      setFetchParams(prev => ({
        ...prev,
      }))
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
          <p>{t('report_intro-1')}<br/>{t('report_intro-2')}</p>
        </div>

        <div className="sort">
          <label htmlFor="sortby">{ct('sort_by')}</label>
          <Select
            name="sortby" 
            id="sortby"
            options={ct('sort_options', { returnObjects: true }) }
            onChange={handleSorter}
          />
        </div>
      </section>

      <section id="reports-grid">
        <div id="all-reports-wrap">
          {reports?.edges?.map(({ node }) => (
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
          pageInfo={reports?.pageInfo}
          size={GRID_CARD_NUMBER}
          first={fetchParams?.first}
          last={fetchParams?.last}
          onClickPrev={() => {
            setFetchParams(prev => ({
              ...prev,
              last: GRID_CARD_NUMBER, 
              before: reports?.pageInfo.startCursor, 
              first: null, 
              after: null, 
            }))
          }}
          onClickNext={() => {
            setFetchParams(prev => ({
              ...prev,
              after: reports?.pageInfo?.endCursor,
              first: GRID_CARD_NUMBER, 
              last: null, 
              before: null, 
            }))
          }}
        />
      </section>
    </>
  )
}
