'use client'

import { getContentBySlug, getContents } from '@/api_gql'
import { createNote, createWatchList, deleteNote, fetchNotes, removeWatchList, updateNote } from '@/api_wp'
import { Bookmark, Icons, IdeaNote, PostCard, PostOptions } from '@/components'
import { useTranslation } from '@/i18n/client'
import { ValidLocale } from '@/i18n/settings'
import useContentState from '@/stores/contentStore'
import { dateEnFormat, getAuthorInfo, getUserId } from '@/utils/lib'
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
    getContentBySlug(content_slug, userId).then(result => (
      updatePost(result)
    ))

    getContents(lang.toUpperCase()).then(result => (
      updateRecommend(result)
    ))
  }, [])

  useEffect(() => {
    if(contentId) {
      fetchNotes({
        user_id: userId,
        post_id: contentId
      }).then(result => {
        updateNotes(result)
      })
    }
  }, [post?.id])

  const handleToggleBookmark = async ({ isSaved }) => {
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

      const result = await getContentBySlug(content_slug, userId)
      updatePost(result)
    } catch (err) {
      console.log(err)
      alert('저장 실패')
    }
  }
  
  const handleFontSize = () => {
    setIsZoomed(prevZoomed => !prevZoomed)
  }

  const handleCreateNote = async (content: string) => {
    if(!contentId) return

    try {
      await createNote({
          user_id: userId,
          post_id: contentId,
          content
      })
      const result = await fetchNotes({
          user_id: userId,
          post_id: contentId
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
          content
      })
      const result = await fetchNotes({
          user_id: userId,
          post_id: contentId
      })
      updateNotes(result)
    } catch (err) {
      console.error(err)
    }
  }

  const handleDeleteNote = async (noteId: number) => {
    try {
      await deleteNote({ 
        note_id: noteId
      })
      const result = await fetchNotes({
          user_id: userId,
          post_id: contentId
      })
      updateNotes(result)
    } catch(err) {
      console.error(err)
    }
  }

  const getParentCategory = (parentId: string) => (
    post?.categories?.edges.find(({ node }) => (
      parentId === node.id
    ))?.node.name
  )

  if (!post) {
    return 'loading'
  }

  return (
    <div className="iob-single-content">
      <section id="content-title-page">
        <div id="top-title">
          <div className="content-tags">
            {post.categories?.edges?.map(({ node }) => node.parentId && (
              <div className="ct" key={node.id}>
                <p>{getParentCategory(node.parentId)}</p>
                <p>{node.name}</p>
              </div>
            ))}
          </div>

          <h2>{post.title}</h2>

          <div className="content-location">
            <Icons type="location" />
            <p>{post.lanbeContent.country?.toUpperCase()}</p>
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
          handleFontSize={handleFontSize} 
          onToggleBookmark={() => (
            handleToggleBookmark({
              isSaved: post?.lanbeContent.is_save,
            })
          )}
        />

        {/* content details: title, author, tags, date, etc. */}
        <div id="content-details">
          {post.tags?.nodes && (
            <div className="tags">
              {post.tags.nodes.map(item => (
                <div key={item.id} className="indiv-tag">
                  {item.name}
                </div>
              ))}
            </div>
          )}

          <div className="title-save">
            <h3>{post?.title}</h3>
            <Bookmark 
              isBlack
              isSaved={post?.lanbeContent?.is_save}
              onToggle={() => (
                handleToggleBookmark({
                  isSaved: post?.lanbeContent.is_save,
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
        <div className="content-article" dangerouslySetInnerHTML={{ __html: post.content }} />
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
