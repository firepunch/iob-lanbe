'use client'

import { ContentArea,PostOptions } from '@/components'
import { getTranslation } from '@/i18n/index'
import { ValidLocale } from '@/i18n/settings'
import { getContents, getContentBySlug } from '@/api_gql'
import Link from 'next/link'
import Image from 'next/image'
import useContentState from '@/stores/contentStore'
import { useTranslation } from '@/i18n/client'

import LocationImg from '@/imgs/locationicon_black.png'
import { useEffect } from 'react'
import Bookmark from '@/components/Bookmark'
import { dateEnFormat } from '@/utils/lib'

export default function Category({
  params: { lang, content_slug },
}: {
  params: { lang: ValidLocale; content_slug: string; },
}) {
  const { post, recommend, updatePost, updateRecommend } = useContentState(state => state)
  const { t } = useTranslation(lang, 'content-page')

  useEffect(() => {
    getContents(lang.toUpperCase()).then(result => (
      updatePost(result)
    ))

    getContentBySlug(content_slug).then(result => (
      updateRecommend(result)
    ))
  }, [])

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
            <Image src={LocationImg} alt="Location" />
            <p>{post?.lanbeContent?.country}</p>
          </div>
        </div>

        {post?.featuredImage && (
          <div id="content-thumbnail-img">
            <Image 
              src={post.featuredImage?.node.sourceUrl} 
              alt={post.featuredImage?.node.altText} 
            />
          </div>
        )}
      </section>

      <section id="main-content">

        <PostOptions onChangeFont={()=> {}} />

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
              isSaved={post?.lanbeContent?.is_save || false}
              onToggle={() => {}}
            />
          </div>

          <div className="author-date">
            <p>By {post?.author?.node?.name} | {post?.author?.node?.roles?.edges?.node.id}</p>
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
        <h5>GOT AN IDEA?</h5>

        <div className="idea-note-wrap">

          {/* idea note design */}
          <div className="idea-note-1">
            <input type="text" id="ideanote" name="ideanote" placeholder="Write down your ideas here."/>
            <button>Save</button>
          </div>

          <div className="add-idea-note">
            {/* add new idea design image will be put here as background */}
          </div>
          {/* idea note design */}
        </div>
      </section>
      {/* idea notes wrap */}

      {/* recommended content */}
      <section id="recommended-content">
        <div className="recommended-title">
          <h5>RECOMMENDED</h5>

          <a href="allcontents.html" className="recommended-web-cta">
            <img src="./imgs/arrow_black.png" alt="Arrow"/>
            <p>See all</p>
          </a>
        </div>

        {/* content wrap */}
        <div className="recommended-content-wrap">
                
          {/* 1 */}
          <div className="indiv-content i-c-1">
            <div className="thumbnail">
              <div className="save">
                <img src="./imgs/save.png" alt="Save"/>
              </div>
            </div>

            <div className="location-date">
              <div className="country">
                <img src="./imgs/locationicon_black.png" alt="Location icon"/>
                <p>COUNTRY</p>
              </div>

              <p className="date">23.07.25</p>
            </div>

            <a href="#" className="indiv-content-title">
                        Title sample: Product Placement Strategy Revived a 35 year-old Shoe Brand
            </a>

            <div className="tags">
              <div className="indiv-tag">Tag</div>
              <div className="indiv-tag">Long Tag</div>
            </div>
          </div>

          {/* 2 */}
          <div className="indiv-content i-c-2">
            <div className="thumbnail">
              <div className="save">
                <img src="./imgs/save.png" alt="Save"/>
              </div>
            </div>

            <div className="location-date">
              <div className="country">
                <img src="./imgs/locationicon_black.png" alt="Location icon"/>
                <p>COUNTRY</p>
              </div>

              <p className="date">23.07.25</p>
            </div>

            <a href="#" className="indiv-content-title">
                        Title sample: Product Placement Strategy Revived a 35 year-old Shoe Brand
            </a>

            <div className="tags">
              <div className="indiv-tag">Tag</div>
              <div className="indiv-tag">Long Tag</div>
              <div className="indiv-tag">Long Long Tag</div>
            </div>
          </div>

          {/* 3 */}
          <div className="indiv-content i-c-3">
            <div className="thumbnail">
              <div className="save">
                <img src="./imgs/save.png" alt="Save"/>
              </div>
            </div>

            <div className="location-date">
              <div className="country">
                <img src="./imgs/locationicon_black.png" alt="Location icon"/>
                <p>COUNTRY</p>
              </div>

              <p className="date">23.07.25</p>
            </div>

            <a href="#" className="indiv-content-title">
                        Title sample: Product Placement Strategy Revived a 35 year-old Shoe Brand
            </a>

            <div className="tags">
              <div className="indiv-tag">Tag</div>
              <div className="indiv-tag">Long Tag</div>
            </div>
          </div>

        </div>
        {/* content wrap */}

        <a href="allcontents.html" className="recommended-mobile-cta">
          <img src="./imgs/arrow_black.png" alt="Arrow"/>
          <p>See all</p>
        </a>

      </section>
      {/* recommended content */}

      <p>{t('login_wall')}</p>

      <h2>Recommended</h2>     
      {/* {recommend?.map(({ node }) => (
        <Link 
          key={node.id} 
          href={`/${encodeURIComponent(node.slug)}`}>
        </Link>
      ))} */}
    </>
  )
}
