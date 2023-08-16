'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from '@/i18n/client'
import { getAllPosts, getContentsByCategory } from '@/api_gql'
import { createWatchList, removeWatchList } from '@/api_wp'
import { Icons, Pagination, PostCard, Select } from '@/components'
import useContentState from '@/stores/contentStore'
import { ValidLocale } from '@/types'
import ArrowBlackDown from '@/imgs/arrow_black_down.png'
import { useSearchParams } from 'next/navigation'

export default function Category({
  params: { lang },
}: {
  params: { lang: ValidLocale }
}) {
  const searchParams = useSearchParams()
  const { posts, updatePosts } = useContentState(state => state)
  const { t: ct } = useTranslation(lang, 'common')
  const { t } = useTranslation(lang, 'category-page')

  const categoryName = searchParams.get('name') || 'all'

  useEffect(() => {
    if (categoryName === 'all') {
      getAllPosts(lang.toUpperCase(), 231936698).then(result => {
        updatePosts(result)
      })
    } else {
      getContentsByCategory(categoryName, 231936698).then(result => {
        updatePosts(result)
      })
    }
  }, [categoryName, updatePosts])
  
  const handleToggleBookmark = async ({ isSaved, databaseId }) => {
    try {
      if (isSaved) {
        await removeWatchList({
          content_id: databaseId,
          type: 'post',
        })
      } else {
        await createWatchList({
          content_id: databaseId,
          type: 'post',
        })
      }

      const result = await getContentsByCategory(categoryName, 231936698)
      updatePosts(result)
    } catch (err) {
      console.log(err)
      alert('저장 실패')
    }
  }

  return (
    <>
      <section id="subcateg-content-title">
        <div id="title-top">
          <div className="title-arrow">
            <div className="title-categ-subcateg">
              <p>{t('market_research')}</p>
              <h2>{t(categoryName).toUpperCase()}</h2>
            </div>

            <Image src={ArrowBlackDown} alt="Arrow" />
          </div>

          <div className="other-content-pages">
            <ul>
              <li className="main-categ">
                {t('market_research')}
              </li>
              <li className="sub-categ">
                <Link href={{ query: { name: 'market' } }}>
                  <Icons type="arrowBlack" />
                  <p>{t('market')}</p>
                </Link>
              </li>
              <li className="sub-categ">
                <Link href={{ query: { name: 'corporate' } }}>
                  <Icons type="arrowBlack" />
                  <p>{t('corporate')}</p>
                </Link>
              </li>
              <li className="sub-categ">
                <Link href={{ query: { name: 'consumer' } }}>
                  <Icons type="arrowBlack" />
                  <p>{t('consumer')}</p>
                </Link>
              </li>
            </ul>

            <ul>
              <li className="main-categ">                
                {t('market_entry')}
              </li>
              <li className="sub-categ">
                <Link href={{ query: { name: 'marketing' } }}>
                  <Icons type="arrowBlack" />
                  <p>{t('marketing')}</p>
                </Link>
              </li>
              <li className="sub-categ">
                <Link href={{ query: { name: 'partnership' } }}>
                  <Icons type="arrowBlack" />
                  <p>{t('partnership')}</p>
                </Link>
              </li>
              <li className="sub-categ">
                <Link href={{ query: { name: 'channel' } }}>
                  <Icons type="arrowBlack" />
                  <p>{t('channel')}</p>
                </Link>
              </li>
              <li className="sub-categ">
                <Link href={{ query: { name: 'payment' } }}>
                  <Icons type="arrowBlack" />
                  <p>{t('payment')}</p>
                </Link>
              </li>
            </ul>

            <Link href={{ pathname: '/category' }} className="see-all">
              {t('see_all')}
            </Link>
          </div>

          {categoryName !== 'all' && (
            <div id="categ-description">
              <p>
                {t(`${categoryName}_desc`)}
              </p>
            </div>
          )}

          <div id="filters-sorting">
            <div className="filters">
              <button type="button" className="all-button">
                {ct('all')}
              </button>
              <button type="button" className="country-button">
                {ct('country')}
              </button>
            </div>

            <div className="sort">
              <label htmlFor="sortby">
                {ct('sort_by')}
              </label>
              <Select
                name="sortby" 
                id="sortby"
                options={ct('sort_options', { returnObjects: true }) }
              />
            </div>
          </div>
        </div>
      </section>

      <section id="contents-grid">
        <div id="all-contents-wrap">
          {posts?.map(({ node }) => (
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
          ))}
        </div>

        <Pagination />

      </section>
    </>
  )
}
