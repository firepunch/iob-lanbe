'use client'
 
import { TI18N, ValidLocale } from '@/types'
import Link from 'next/link'
import Icons from '../Icons'
import { useEffect } from 'react'
import { getProductBySaved } from '@/api_gql'
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

  useEffect(() => {
    fetchWatchList({
      user_id: userId,
      type: 'report',
    }).then(result => (
      updateBookmarkReport(result)
    ))
  }, [])

  const handleToggleBookmark = async (contentId: number) => {
    try {
      await removeWatchList({
        type: 'report',
        content_id: contentId,
        user_id: userId,
      })

      const result = await fetchWatchList({
        user_id: userId,
        type: 'report',
      })
      updateBookmarkReport(result)
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
            <button>{t('saved')} {`(${bookmark?.report?.length || 0})`}</button>
          </div>
        </div>
      </div>
      
      {bookmark?.report?.length ? (
        <div id="saved-content">
          {bookmark?.report?.map(node => (
            <ReportCard
              {...node}
              key={node.id}
              featuredImageUrl={node?.featured_image_url}
              lanbeContent={{
                is_save: true,
              } as ILanbeContent}
              onToggleBookmark={() => handleToggleBookmark(node.id)}
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