'use client'

import { getAllPosts, getContentBySlug, getContents } from '@/api_gql'
import { createNote, createWatchList, deleteNote, fetchNotes, removeWatchList, updateCountView, updateNote } from '@/api_wp'
import { Bookmark, ContentWall, Icons, IdeaNote, PostCard, PostOptions, Tags } from '@/components'
import { useTranslation } from '@/i18n/client'
import { ValidLocale } from '@/i18n/settings'
import useContentState from '@/stores/contentStore'
import useUserState, { INIT_USER_STATE } from '@/stores/userStore'
import { dateEnFormat, getAuthorInfo, getCountry } from '@/utils/lib'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import useStore from '@/hooks/useStore'
import { MetaKey } from '@/types/api'

export default function Category({
  params: { lang, content_slug },
}: {
  params: { lang: ValidLocale; content_slug: string; },
}) {
  const { _hasHydrated, user } = useStore(useUserState, state => state, INIT_USER_STATE)
  const { post, recommend, notes, updatePost, updateRecommend, updateNotes } = useContentState(state => state)
  const { t } = useTranslation(lang, 'content-page')
  const [isZoomed, setIsZoomed] = useState(false)
  const [fetchParams, setFetchParams] = useState({
    lang,
    language: lang.toUpperCase(),
    postSlug: decodeURIComponent(content_slug), 
    userId: user?.databaseId,
  })
  const contentId = post?.databaseId || 0
  const META_KEY = `post_${lang}`

  useEffect(() => {
    getContentBySlug(fetchParams).then(result => (
      updatePost(result)
    ))

    getAllPosts({
      ...fetchParams,
      first: 3,
    }).then(result => (
      updateRecommend(result)
    ))
  }, [])

  useEffect(() => {
    if (user?.databaseId !== 0) {
      setFetchParams(prev => ({
        ...prev,
        userId: user.databaseId,
      }))

      fetchNotes({
        user_id: user?.databaseId,
        post_id: contentId,
      }).then(result => {
        updateNotes(result)
      })
    }
  }, [user])

  useEffect(() => {
    if (contentId) {
      updateCountView({
        user_id: user?.databaseId,
        content_id: contentId,
        type: META_KEY as MetaKey,
      })
    }
  }, [contentId])

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
      post_id: contentId,
    })
    updateNotes(result) 
  }

  const handleFontSize = () => {
    setIsZoomed(() => !isZoomed)
  }

  const handleCreateNote = async (content: string) => {
    if (!contentId) return

    try {
      await createNote({
        user_id: user?.databaseId,
        post_id: contentId,
        content,
      })
      const result = await fetchNotes({
        user_id: user?.databaseId,
        post_id: contentId,
      })
      updateNotes(result)
    } catch (err) {
      console.error(err)
    }
  }

  const handleUpdateNote = async (noteId: number, content: string) => {
    try {
      await updateNote({
        note_id: noteId,
        content,
      })
      const result = await fetchNotes({
        user_id: user?.databaseId,
        post_id: contentId,
      })
      updateNotes(result)
    } catch (err) {
      console.error(err)
    }
  }

  const handleDeleteNote = async (noteId: number) => {
    try {
      await deleteNote({ 
        note_id: noteId,
      })
      const result = await fetchNotes({
        user_id: user?.databaseId,
        post_id: contentId,
      })
      updateNotes(result)
    } catch (err) {
      console.error(err)
    }
  }

  if (!_hasHydrated) {
    return <div></div>
  }

  return (
    <div className={`iob-single-content ${user?.databaseId ? '' : 'guest-user'}`}>
      {post ? (
        <>
          <section id="content-title-page">
            <div id="top-title">
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

              <h2>{post.lanbeContent.subTitle || post.title}</h2>

              <div className="content-location">
                <Icons type="location" />
                <p>{getCountry(post.categories)?.toUpperCase()}</p>
              </div>
            </div>
            {post?.featuredImage && (
              <Image 
                id="content-thumbnail-img"
                src={post.featuredImage?.node.sourceUrl} 
                alt={post.featuredImage?.node.altText} 
                width={0}
                height={0}
                sizes="100vw"
              />
            )}
          </section>
          <section id="main-content">
            <PostOptions
              isSaved={post.lanbeContent.is_save}
              metaKey={META_KEY}
              contentId={contentId}
              onFontSize={handleFontSize}
              onFetchData={handleReload}
            />

            {/* content details: title, author, tags, date, etc. */}
            <div id="content-details">
              {post.tags?.edges && (
                <Tags lang={lang} tags={post.tags} />
              )}

              <div className="title-save">
                <h3>{post?.title}</h3>
                <Bookmark 
                  isBlack
                  isSaved={post?.lanbeContent?.is_save}
                  metaKey={META_KEY}
                  contentId={contentId}
                  onFetchData={handleReload}
                />
              </div>

              <div className="author-date">
                <p>By {getAuthorInfo(post.author)}</p>
                <p>{dateEnFormat(post?.date)}</p>
              </div>
            </div>

            {!user?.databaseId && (
              <ContentWall lang={lang} t={t} />
            )}
            <div
              className={`content-article ${isZoomed ? 'zoomed' : ''}`}
              dangerouslySetInnerHTML={{ __html: post.content }} 
            />
          </section>

          {user?.databaseId ? (
            <section id="idea-notes">
              <h5>{t('idea_h5')}</h5>
              <div className="idea-note-wrap">
                {notes?.length < 4 && (
                  <IdeaNote 
                    type="edit" 
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
        <div id="idea-notes">
          <h2>Loading</h2>
        </div>
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
