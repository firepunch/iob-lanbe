'use client'
 
import { TI18N } from '@/types'
import Link from 'next/link'
import Icons from '../Icons'
import { useEffect } from 'react'
import { getProductBySaved } from '@/api_gql'
import useUserState from '@/stores/userStore'
import { getUserId } from '@/utils/lib'
import { ReportCard } from '../ReportCard'
import { createWatchList, removeWatchList } from '@/api_wp'

export default function Report({
  t,
  params,
}: {
  t: TI18N,
  params: {
    userId: number,
    language: string
  }
}) {
  const { reports, updateReports } = useUserState(state => state)
  const userId = getUserId()


  useEffect(() => {
    getProductBySaved(params).then(result => (
      updateReports(result)
    ))
  }, [])

  const handleToggleBookmark = async ({ isSaved, databaseId }) => {
    try {
      if (isSaved) {
        await removeWatchList({
          type: 'report',
          content_id: databaseId,
          user_id: params.userId,
        })
      } else {
        await createWatchList({
          type: 'report',
          content_id: databaseId,
          user_id: params.userId,
        })
      }

      const result = await getProductBySaved(params)
      updateReports(result)
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
            <button>{t('saved')} {reports?.length || 0}</button>
            <button>{t('purchased')} (0)</button>
          </div>
        </div>
      </div>
      
      {reports?.length ? (
        reports?.map(({ node }) => (
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
        ))
      ) : (
        <div id="default-text">
          <p className="none-saved-text">{t('report_none')}</p>
          <p className="explore-text">{t('report_explore')}</p>

          <Link href="/report">
            <Icons type="arrowBlack" />
            <p>{t('see-all')}</p>
          </Link>
        </div>
      )}

    </>
  )
}