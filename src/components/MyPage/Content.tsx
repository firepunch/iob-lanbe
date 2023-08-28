'use client'
 
import { TI18N } from '@/types'
import Link from 'next/link'
import Icons from '../Icons'
import { useEffect } from 'react'
import useContentState from '@/stores/contentStore'
import { getPostBySaved } from '@/api_gql'
import { getUserId } from '@/utils/lib'
import useUserState from '@/stores/userStore'

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
            <button>{t('saved')}(0)</button>
          </div>
        </div>
      </div>

      {posts?.length ? (
        posts?.map(({ node }) => {
          console.log(node)
        })
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