'use client'
 
import { TI18N, ValidLocale } from '@/types'
import Link from 'next/link'
import Icons from '../Icons'
import { useEffect, useState } from 'react'
import { getAllReports, getProductBySaved } from '@/api_gql'
import useUserState from '@/stores/userStore'
import { getUserId } from '@/utils/lib'
import { ReportCard } from '../ReportCard'
import { createWatchList, fetchWatchList, removeWatchList } from '@/api_wp'
import { ILanbeContent } from '@/types/store'

export default function Report({
  t,
  lang,
  userId,
}: {
  t: TI18N,
  lang: ValidLocale
  userId: number
}) {
  const { bookmark, updateBookmarkReport } = useUserState(state => state)
  const [fetchParams, setFetchParams] = useState({
    language: lang.toUpperCase(),
    userId,
  })

  useEffect(() => {
    fetchWatchList({
      type: 'report',
      user_id: userId,
    }).then(result => {
      if (result?.ids) {
        setFetchParams(prev => ({
          ...prev,
          in: result.ids,
        }))
      } else {
        updateBookmarkReport([])
      }
    })
  }, [])

  useEffect(() => {
    getAllReports(fetchParams).then(result => (
      updateBookmarkReport(result?.edges)
    ))
  }, [fetchParams])

  const handleToggleBookmark = async (contentId: number) => {
    try {
      await removeWatchList({
        type: 'report',
        content_id: contentId,
        user_id: userId,
      })

      const result = await fetchWatchList({
        type: 'report',
        user_id: userId,
      })

      if (result?.ids) {
        setFetchParams(prev => ({
          ...prev,
          in: result.ids,
        }))
      } else {
        setFetchParams(prev => ({
          ...prev,
        }))
      }
    } catch (err) {
      console.log(err)
      alert('저장 실패')
    }
  }
  
  return (
    <>
      <div id="default-title">
        <h2>{t('report').toUpperCase()}</h2>

        <div className="filters-wrap">
          <div className="country-category">
          </div>

          <div className="saved-read">
            <button className="black-button">
              {t('saved')} {`(${bookmark?.report?.length || 0})`}
            </button>
          </div>
        </div>
      </div>
      
      {bookmark?.report?.length ? (
        <div id="saved-content">
          {bookmark?.report?.map(({ node }) => (
            <ReportCard
              key={node.id}
              onToggleBookmark={() => handleToggleBookmark(node.id)}
              {...node}
            />
          ))}
        </div>
      ) : (
        <div id="default-text">
          <p className="none-saved-text">{t('report_none')}</p>
          <p className="explore-text">{t('report_explore')}</p>

          <Link href={{ pathname: `/${lang}/report` }}>
            <Icons type="arrowBlack" />
            <p>{t('see-all')}</p>
          </Link>
        </div>
      )}

    </>
  )
}