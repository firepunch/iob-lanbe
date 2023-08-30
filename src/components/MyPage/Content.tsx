'use client'
 
import { fetchWatchList, createWatchList, removeWatchList } from '@/api_wp'
import useUserState from '@/stores/userStore'
import { TI18N } from '@/types'
import Link from 'next/link'
import { useEffect } from 'react'
import Icons from '../Icons'
import { PostCard } from '../PostCard'
import { ILanbeContent } from '@/types/store'

export default function Content({
  t,
  params,
}: {
  t: TI18N
  params: {
    userId: number,
    language: string
  }
}) {
  const { bookmark, updateBookmarkPost } = useUserState(state => state)
  const lang = params.language.toLowerCase()

  useEffect(() => {
    fetchWatchList({
      user_id: params.userId,
      type: 'post',
    }).then(result => (
      updateBookmarkPost(result)
    ))
  }, [])

  const handleToggleBookmark = async (contentId: number) => {
    try {
      await removeWatchList({
        type: 'post',
        content_id: contentId,
        user_id: params.userId,
      })

      const result = await fetchWatchList({
        user_id: params.userId,
        type: 'post',
      })
      updateBookmarkPost(result)
    } catch (err) {
      console.log(err)
      alert('저장 실패')
    }
  }
  
  return (
    <>
      <div id="default-title">
        <h2>{t('content').toUpperCase()}</h2>

        <div className="filters-wrap">
          <div className="country-category">
            <button>{t('country')}</button>
            <button>{t('category')}</button>
          </div>

          <div className="saved-read">
            <button>{t('saved')} {`(${bookmark.post?.length || 0})`}</button>
          </div>
        </div>
      </div>

      {bookmark?.post?.length ? (
        bookmark.post?.map(node => (
          <PostCard
            {...node}
            key={node.id}
            featuredImageUrl={node?.featured_image_url}
            lanbeContent={{
              is_save: true,
            } as ILanbeContent}
            onToggleBookmark={() => handleToggleBookmark(node.id)}
          />
        ))
      ) : (
        <div id="default-text">
          <p className="none-saved-text">{t('content_none')}</p>
          <p className="explore-text">{t('content_explore')}</p>

          <Link href={{ pathname: `/${lang}/category` }}>
            <Icons type="arrowBlack" />
            <p>{t('see-all')}</p>
          </Link>
        </div>
      )}
    </>
  )
}