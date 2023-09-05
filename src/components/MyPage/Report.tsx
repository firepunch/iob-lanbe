'use client'
 
import { TI18N, ValidLocale } from '@/types'
import Link from 'next/link'
import Icons from '../Icons'
import { useEffect, useState } from 'react'
import { getAllReports, getProductBySaved } from '@/api_gql'
import useUserState from '@/stores/userStore'
import { getUserId } from '@/utils/lib'
import { ReportCard } from '../ReportCard'
import { createWatchList, fetchCountDownload, fetchWatchList, removeWatchList } from '@/api_wp'
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
  const { bookmark, read, updateBookmarkReport, updateDownloadedReport } = useUserState(state => state)
  const [clickedType, setClickedType] = useState<'saved'|'download'>('saved')
  const [fetchParams, setFetchParams] = useState({
    language: lang.toUpperCase(),
    userId,
    savedIn: undefined,
    downloadIn: undefined,
  })

  useEffect(() => {
    fetchWatchList({
      type: 'report',
      user_id: userId,
    }).then(result => {
      setFetchParams(prev => ({
        ...prev,
        savedIn: result?.ids,
      }))
    })
    
    fetchCountDownload({
      user_id: userId,
    }).then(result => {
      setFetchParams(prev => ({
        ...prev,
        downloadIn: result?.ids,
      }))
    })
  }, [])

  useEffect(() => {
    if (fetchParams.savedIn !== undefined) {
      getAllReports({
        ...fetchParams,
        in: fetchParams.savedIn,
      }).then(result => (
        updateBookmarkReport(result?.edges)
      ))
    }
    if (fetchParams.downloadIn !== undefined) {
      getAllReports({
        ...fetchParams,
        in: fetchParams.downloadIn,
      }).then(result => (
        updateDownloadedReport(result?.edges)
      ))
    }
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

  const handleClickedType = (clicked) => {
    setClickedType(clicked)
  }
  
  return (
    <>
      <div id="default-title">
        <h2>{t('report').toUpperCase()}</h2>

        <div className="filters-wrap">
          <div className="country-category">
          </div>

          <div className="saved-read">
            <button 
              className={`${clickedType === 'saved' ? 'black-button' : ''}`}
              onClick={() => handleClickedType('saved')}
            >
              {t('saved')} {`(${bookmark?.report?.length || 0})`}
            </button>
            <button
              className={`${clickedType === 'download' ? 'black-button' : ''}`}
              onClick={() => handleClickedType('download')}
            >
              {t('download')} {`(${read?.report?.length || 0})`}
            </button>
          </div>
        </div>
      </div>
      
      {(clickedType === 'saved' ? bookmark : read)?.report?.length ? (
        <div id="saved-content">
          {(clickedType === 'saved' ? bookmark : read)?.report?.map(({ node }) => (
            <ReportCard
              key={node.id}
              onToggleBookmark={() => handleToggleBookmark(node.databaseId)}
              {...node}
            />
          ))}
        </div>
      ) : (
        <div id="default-text">
          <p className="none-saved-text">{t(`report_none_${clickedType}`)}</p>
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