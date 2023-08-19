'use client'

import { getContentBySlug, getContents } from '@/api_gql'
import { createWatchList, removeWatchList } from '@/api_wp'
import { Bookmark, Icons, IdeaNote, PostCard, PostOptions } from '@/components'
import { useTranslation } from '@/i18n/client'
import { ValidLocale } from '@/i18n/settings'
import useContentState from '@/stores/contentStore'
import { dateEnFormat } from '@/utils/lib'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Category({
  params: { lang, content_slug },
}: {
  params: { lang: ValidLocale; content_slug: string; },
}) {
  const { post, recommend, updatePost, updateRecommend } = useContentState(state => state)
  const { t } = useTranslation(lang, 'content-page')
  const authorRole = post?.author?.node?.roles?.edges?.node.id

  useEffect(() => {
    getContentBySlug(content_slug, 231936698).then(result => (
      updatePost(result)
    ))

    getContents(lang.toUpperCase()).then(result => (
      updateRecommend(result)
    ))
  }, [])

  const handleToggleBookmark = async ({ isSaved, databaseId }) => {
    try {
      if (isSaved) {
        await removeWatchList({
          content_id: databaseId,
          type: 'report',
        })
      } else {
        await createWatchList({
          content_id: databaseId,
          type: 'report',
        })
      }

      const result = await getContentBySlug(content_slug, 231936698)
      updatePost(result)
    } catch (err) {
      console.log(err)
      alert('저장 실패')
    }
  }

  const getParentCategory = (parentId: string) => (
    post?.categories?.edges.find(({ node }) => {
      return parentId === node.id
    })?.node.name
  )

  return (
    <>
      <section id="content-title-page">
        <div id="top-title">
          <div className="content-tags">
            {post?.categories?.edges?.map(({ node }) => node.parentId && (
              <div className="ct" key={node.id}>
                <p>{getParentCategory(node.parentId)}</p>
                <p>{node.name}</p>
              </div>
            ))}
          </div>

          <h2>{post?.title}</h2>

          <div className="content-location">
            <Icons type="location" />
            <p>{post?.lanbeContent?.country?.toUpperCase()}</p>
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
          isSaved={post?.lanbeContent.is_save}
          onToggleBookmark={handleToggleBookmark} 
          onToggleFontSize={()=> {}} 
        />

        {/* content details: title, author, tags, date, etc. */}
        <div id="content-details">
          {post?.tags?.nodes && (
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
                  databaseId: post?.databaseId,
                })
              )}
            />
          </div>

          <div className="author-date">
            <p>By {post?.author?.node?.name} {authorRole && `| ${authorRole}`}</p>
            <p>{dateEnFormat(post?.date)}</p>
          </div>
        </div>
        {/* content details: title, author, tags, date, etc. */}

        {post?.content && (
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        )}
      </section>

      {/* idea notes wrap */}
      <section id="idea-notes">
        <h5>{t('idea_h5')}</h5>
        <div className="idea-note-wrap">
          <IdeaNote />

          <div className="add-idea-note">
            {/* add new idea design image will be put here as background */}
          </div>
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
                  databaseId: node.databaseId,
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
    </>
  )
}
