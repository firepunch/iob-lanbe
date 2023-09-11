'use client'
 
import { getAllReports } from '@/api_gql'
import { fetchCountDownload, fetchWatchList } from '@/api_wp'
import useUserState from '@/stores/userStore'
import { TI18N, ValidLocale } from '@/types'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Icons from '../Icons'
import { ReportCard } from '../ReportCard'

interface IFetchParams {
  language: string
  lang: string
  userId: number
  savedIn?: string[]
  downloadIn?: string[]
}

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
  const [fetchParams, setFetchParams] = useState<IFetchParams>({
    language: lang.toUpperCase(),
    lang: lang,
    userId: userId,
    savedIn: undefined,
    downloadIn: undefined,
  })

  useEffect(() => {
    fetchWatchList({
      type: `report_${lang}`,
      user_id: userId,
    }).then(result => {
      setFetchParams(prev => ({
        ...prev,
        savedIn: result?.ids,
      }))
    })
    
    fetchCountDownload({
      lang,
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
        in: fetchParams.savedIn.length ? fetchParams.savedIn :  ['0'],
      }).then(result => (
        updateBookmarkReport(result?.edges)
      ))
    }
    if (fetchParams.downloadIn !== undefined) {
      getAllReports({
        ...fetchParams,
        in: fetchParams.downloadIn.length ? fetchParams.downloadIn :  ['0'],
      }).then(result => (
        updateDownloadedReport(result?.edges)
      ))
    }
  }, [fetchParams])

  const handleFetchData = async (ids?: string[]) => {
    setFetchParams(prev => ({
      ...prev,
      [clickedType === 'saved' ? 'savedIn' : 'downloadIn']: ids,
    }))
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
              {...node}
              key={node.id}
              onFetchData={handleFetchData}
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