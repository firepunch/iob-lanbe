'use client'

import { getAllPosts, getContentBySlug, getContents } from '@/api_gql'
import { createNote, createWatchList, deleteNote, fetchNotes, removeWatchList, updateCountView, updateNote } from '@/api_wp'
import { Bookmark, ContentWall, Icons, IdeaNote, PostCard, PostOptions, Tags } from '@/components'
import { useTranslation } from '@/i18n/client'
import { ValidLocale } from '@/i18n/settings'
import useContentState, { INIT_CONTENT_STATE } from '@/stores/contentStore'
import useUserState, { INIT_USER_STATE } from '@/stores/userStore'
import { dateEnFormat, getAuthorInfo, getCountry } from '@/utils/lib'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import useStore from '@/hooks/useStore'
import { MetaKey } from '@/types/api'

const FIRST_IMAGE = '<h4 class=\"wp-block-heading\"><strong>'
export default function Category({
  params,
}: {
  params: { lang: ValidLocale; content_slug: string; },
}) {
  const { lang, content_slug } = params
  const { _hasHydrated, user } = useStore(useUserState, state => state, INIT_USER_STATE)
  const { post, recommend, notes, updatePost, updateRecommend, updateNotes } = useContentState(state => state)
  const { t } = useTranslation(lang, 'content-page')
  const [isZoomed, setIsZoomed] = useState(false)
  const [META_KEY, set_META_KEY] = useState(`post_${lang}`)
  const [fetchParams, setFetchParams] = useState({
    lang,
    language: lang.toUpperCase(),
    postSlug: decodeURIComponent(content_slug), 
    userId: user?.databaseId,
  })

  useEffect(() => {
    if (fetchParams.userId ===  user?.databaseId)  {
      getContentBySlug({
        ...fetchParams,
      }).then(result => {
        const contentId = result?.databaseId
        updatePost(result)

        updateCountView({
          user_id: user?.databaseId,
          content_id: contentId,
          type: META_KEY as MetaKey,
        })
      
        if (user?.databaseId !== 0) {
          fetchNotes({
            user_id: user?.databaseId,
            post_id: contentId,
          }).then(result => {
            updateNotes(result)
          })
        }
      })

      getAllPosts({
        ...fetchParams,
        first: 3,
      }).then(result => (
        updateRecommend(result)
      ))
    }
  }, [fetchParams])

  useEffect(() => {
    set_META_KEY(`post_${params.lang}`)
    setFetchParams(prev => ({
      ...prev,
      lang: params.lang,
      language: params.lang.toUpperCase(),
      postSlug: decodeURIComponent(params.content_slug), 
    }))
  }, [params.lang, params.content_slug])

  useEffect(() => {
    setFetchParams(prev => ({
      ...prev,
      userId: user?.databaseId,
    }))
  }, [user])

  const handleReload = async () => {
    const postRes = await getContentBySlug(fetchParams)
    const recommendRes = await getAllPosts({
      ...fetchParams,
      first: 3,
    })

    updatePost(postRes)
    updateRecommend(recommendRes)
  }
  
  const handleReloadNotes = async () => {
    const result = await fetchNotes({
      user_id: user?.databaseId,
      post_id: post?.databaseId,
    })
    updateNotes(result) 
  }

  const handleFontSize = () => {
    setIsZoomed(() => !isZoomed)
  }

  if ((post?.slug !== fetchParams.postSlug) || !_hasHydrated) {
    return <div></div>
  }

  return (
    <div className={`iob-single-content ${user?.databaseId ? '' : 'guest-user'}`}>
      {post ? (
        <>
          <section id="top" className="content-title-page">
            <div className="top-title">
              <div className="content-tags">
                {post.categories?.edges?.map(({ node }) => (
                  node.parentId && node.parent.node.name !== 'Country' && (
                    <div className="ct" key={node.id}>
                      <p>{node.parent.node.name}</p>
                      <p>{node.name}</p>
                    </div>
                  ))
                )}
              </div>

              <h2 className="title">
                {post.lanbeContent.subTitle || post.title}
              </h2>

              <div className="content-location">
                <Icons type="location" />
                <p>{getCountry(post.categories)?.toUpperCase()}</p>
              </div>
            </div>
            {post?.featuredImage && (
              <Image 
                className="content-thumbnail-img"
                src={post.featuredImage?.node.sourceUrl} 
                alt={post.featuredImage?.node.altText} 
                width={0}
                height={0}
                sizes="100vw"
              />
            )}
          </section>
          <section id="main-content">
            {/* content details: title, author, tags, date, etc. */}
            <div id="content-details" className="content-details">
              {post.tags?.edges && (
                <Tags lang={lang} tags={post.tags} />
              )}

              <div className="content-title">
                <h3 className="h3">{post?.title}</h3>
                <Bookmark 
                  isBlack
                  isSaved={post?.lanbeContent?.is_save}
                  metaKey={META_KEY}
                  contentId={post?.databaseId}
                  onFetchData={handleReload}
                />
              </div>

              <div className="author-date">
                <p className="author">By {getAuthorInfo(post.author)}</p>
                <p className="date">{dateEnFormat(post?.date)}</p>
              </div>
            </div>

            <div className={`content-article ${isZoomed ? 'zoomed' : ''}`}>
              {user?.databaseId && (
                <PostOptions
                  isSaved={post.lanbeContent.is_save}
                  metaKey={META_KEY}
                  contentId={post?.databaseId}
                  onFontSize={handleFontSize}
                  onFetchData={handleReload}
                />
              )}
              <div
                className="wordpress-content"
                dangerouslySetInnerHTML={{ 
                  __html: user?.databaseId === 0 ? 
                    post.content.split(FIRST_IMAGE)?.[0] + FIRST_IMAGE + 
                  post.content.split(FIRST_IMAGE)?.[1] + FIRST_IMAGE :
                    post.content,
                }} 
              />
            </div>

            {user?.databaseId === 0 && (
              <ContentWall lang={lang} t={t} />
            )}
          </section>

          {user?.databaseId ? (
            <section id="idea-notes">
              <h5>{t('idea_h5')}</h5>
              <div className="idea-note-wrap">
                {notes?.length < 4 && (
                  <IdeaNote 
                    key="create-note"
                    type="edit" 
                    content={undefined}
                    userId={user?.databaseId}
                    postId={post?.databaseId}
                    onReload={handleReloadNotes}
                  />
                )}
                {notes?.map(item => (
                  <IdeaNote
                    key={item.id}
                    noteId={item.id}
                    type="view"
                    onReload={handleReloadNotes}
                    {...item}
                  />
                ))}
              </div>
            </section>
          ) : null}
        </>
      ) : (
        null
      )}

      {/* recommended content */}
      <section id="recommended-content">
        <div className="recommended-title">
          <h5>{t('recommend_h2')}</h5>

          <Link href={`/category`} className="recommended-web-cta">
            <Icons type="arrowBlack" />
            <p>{t('see_all')}</p>
          </Link>
        </div>

        <div className="recommended-content-wrap">
          {recommend?.edges?.map(({ node }) => (
            <PostCard 
              {...node}
              key={node.id}
              onFetchData={handleReload}
            />
          ))}
        </div>

        <Link href={`/category`} className="recommended-mobile-cta">
          <Icons type="arrowBlack" />
          <p>{t('see_all')}</p>
        </Link>
      </section>
    </div>
  )
}
