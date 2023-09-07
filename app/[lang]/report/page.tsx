'use client'

import { getAllReports } from '@/api_gql'
import { createWatchList, removeWatchList } from '@/api_wp'
import { Pagination, ReportCard, Select } from '@/components'
import useIsMobile from '@/hooks/useMobile'
import { useTranslation } from '@/i18n/client'
import { ValidLocale } from '@/i18n/settings'
import useContentState from '@/stores/contentStore'
import useUserState from '@/stores/userStore'
import { sort2variables } from '@/utils/lib'
import { useEffect, useState } from 'react'

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
  const { user } = useUserState(state => state)
  const { reports, updateReports } = useContentState(state => state)
  const { t: ct } = useTranslation(lang, 'common')
  const { t } = useTranslation(lang, 'report')
  const isMobile = useIsMobile()
  const [fetchParams, setFetchParams] = useState({
    language: lang.toUpperCase(), 
    userId: user.databaseId,
    ...initPagination,
    ...sort2variables('newest'),
  })

  useEffect(() => {
    getAllReports(fetchParams).then(result => {
      const isFirstPage = fetchParams.first === GRID_CARD_NUMBER && fetchParams.after === null
      updateReports({
        edges: isMobile && !isFirstPage ? [...reports.edges, ...result.edges] : result.edges,
        pageInfo: {
          ...result.pageInfo,
          initTotal: isFirstPage ? result.pageInfo.total : reports.pageInfo?.initTotal,
        },
      })
    })
  }, [fetchParams])

  const handleSorter = (sorter) => {
    setFetchParams(prev => ({
      ...prev,
      ...initPagination,
      ...sort2variables(sorter),
    }))
  }

  const handleReload = () => {
    setFetchParams(prev => ({
      ...prev,
    }))
  }

  return (
    <>
      <section id="all-report-title">
        <div id="report-title-description">
          <h2>{t('report_h2')}</h2>
          <p>{t('report_intro-1')}{t('report_intro-2')}</p>
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
              {...node}
              key={node.id}
              onFetchData={handleReload}
            />
          ))}
        </div>

        {reports?.pageInfo?.initTotal ? (
          <Pagination 
            pageInfo={reports.pageInfo}
            size={GRID_CARD_NUMBER}
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
        ) : null}
      </section>
    </>
  )
}
