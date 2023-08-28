'use client'
 
import { TI18N } from '@/types'
import Link from 'next/link'
import Icons from '../Icons'
import { useEffect } from 'react'
import useContentState from '@/stores/contentStore'
import { getPostBySaved } from '@/api_gql'
import { getUserId } from '@/utils/lib'
import useUserState from '@/stores/userStore'
import { PostCard } from '../PostCard'
import { createWatchList, removeWatchList } from '@/api_wp'

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
  const { posts, updatePosts } = useUserState(state => state)
  const userId = getUserId()

  useEffect(() => {
    getPostBySaved(params).then(result => (
      updatePosts(result)
    ))
  }, [])

  const handleToggleBookmark = async ({ isSaved, databaseId }) => {
    try {
      if (isSaved) {
        await removeWatchList({
          type: 'post',
          content_id: databaseId,
          user_id: params.userId,
        })
      } else {
        await createWatchList({
          type: 'post',
          content_id: databaseId,
          user_id: params.userId,
        })
      }

      const result = await getPostBySaved(params)
      updatePosts(result)
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
            <button>{t('saved')} {posts?.length || 0}</button>
          </div>
        </div>
      </div>

      {posts?.length ? (
        posts?.map(({ node }) => (
          <PostCard
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
          <p className="none-saved-text">{t('content_none')}</p>
          <p className="explore-text">{t('content_explore')}</p>

          <Link href="/category">
            <Icons type="arrowBlack" />
            <p>{t('see-all')}</p>
          </Link>
        </div>
      )}

    </>
  )
}