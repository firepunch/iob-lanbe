'use client'

import { getContentBySlug, getContents } from '@/api_gql'
import { createNote, createWatchList, deleteNote, fetchNotes, removeWatchList, updateNote } from '@/api_wp'
import { Bookmark, Icons, IdeaNote, PostCard, PostOptions, Tags } from '@/components'
import { useTranslation } from '@/i18n/client'
import { ValidLocale } from '@/i18n/settings'
import useContentState from '@/stores/contentStore'
import { dateEnFormat, getAuthorInfo, getCountry, getUserId } from '@/utils/lib'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Category({
  params: { lang, content_slug },
}: {
  params: { lang: ValidLocale; content_slug: string; },
}) {
  const { post, recommend, notes, updatePost, updateRecommend, updateNotes } = useContentState(state => state)
  const { t } = useTranslation(lang, 'content-page')
  const [isZoomed, setIsZoomed] = useState(false)
  const userId = getUserId()
  const contentId = post?.databaseId

  useEffect(() => {
    getContentBySlug(decodeURIComponent(content_slug), userId).then(result => (
      updatePost(result)
    ))

    getContents(lang.toUpperCase(), 3).then(result => (
      updateRecommend(result)
    ))
  }, [])

  useEffect(() => {
    if (contentId) {
      fetchNotes({
        user_id: userId,
        post_id: contentId,
      }).then(result => {
        updateNotes(result)
      })
    }
  }, [post?.id])

  const handleToggleBookmark = async ({ isSaved, type }) => {
    if (!contentId) return

    try {
      if (isSaved) {
        await removeWatchList({
          type: 'report',
          content_id: contentId,
          user_id: userId,
        })
      } else {
        await createWatchList({
          type: 'report',
          content_id: contentId,
          user_id: userId,
        })
      }

      if (type === 'post') {
        const result = await getContentBySlug(decodeURIComponent(content_slug), userId)
        updatePost(result)
      } else if (type === 'recommend') {
        const result = await getContents(lang.toUpperCase(), 3)
        updateRecommend(result)
      }
    } catch (err) {
      console.log(err)
      alert('저장 실패')
    }
  }
  
  const handleFontSize = () => {
    setIsZoomed(() => !isZoomed)
  }

  const handleCreateNote = async (content: string) => {
    if (!contentId) return

    try {
      await createNote({
        user_id: userId,
        post_id: contentId,
        content,
      })
      const result = await fetchNotes({
        user_id: userId,
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
        user_id: userId,
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
        user_id: userId,
        post_id: contentId,
      })
      updateNotes(result)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="iob-single-content">
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
              onFontSize={handleFontSize} 
              onToggleBookmark={() => (
                handleToggleBookmark({
                  isSaved: post?.lanbeContent.is_save,
                  type: 'post',
                })
              )}
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
                  onToggle={() => (
                    handleToggleBookmark({
                      isSaved: post?.lanbeContent.is_save,
                      type: 'post',
                    })
                  )}
                />
              </div>

              <div className="author-date">
                <p>By {getAuthorInfo(post.author)}</p>
                <p>{dateEnFormat(post?.date)}</p>
              </div>
            </div>
            {/* content details: title, author, tags, date, etc. */}

            {/* className={cls(styles.content, { [styles.large]: isZoomed })} */}
            <div
              className={`content-article ${isZoomed ? 'zoomed' : ''}`}
              dangerouslySetInnerHTML={{ __html: post.content }} 
            />
          </section>

          {/* idea notes wrap */}
          <section id="idea-notes">
            <h5>{t('idea_h5')}</h5>
            <div className="idea-note-wrap">
              {notes?.map(item => (
                <IdeaNote
                  key={item.id}
                  type="view"
                  lang={lang}
                  onSubmit={value => handleUpdateNote(item.id, value)}
                  onDelete={() => handleDeleteNote(item.id)}
                  {...item}
                />
              ))}
              {notes?.length < 4 && (
                <IdeaNote type="add" lang={lang} onSubmit={handleCreateNote} />
              )}
            </div>
          </section>
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
          {recommend?.map(({ node }) => (
            <PostCard 
              {...node}
              key={node.id}
              onToggleBookmark={() => (
                handleToggleBookmark({
                  isSaved: node.lanbeContent.is_save,
                  type:'recommend',
                })
              )}
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
