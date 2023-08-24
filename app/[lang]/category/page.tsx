'use client'

import { getAllPosts, getContentsByCategory } from '@/api_gql'
import { createWatchList, removeWatchList } from '@/api_wp'
import { Icons, Pagination, PostCard, Select } from '@/components'
import { useTranslation } from '@/i18n/client'
import useContentState from '@/stores/contentStore'
import { ValidLocale } from '@/types'
import { getUserId, sort2variables } from '@/utils/lib'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Category({
  params: { lang },
}: {
  params: { lang: ValidLocale }
}) {
  const searchParams = useSearchParams()
  const { posts, updatePosts } = useContentState(state => state)
  const { t: ct } = useTranslation(lang, 'common')
  const { t } = useTranslation(lang, 'category-page')

  const categoryTranslationKeys = {
    market: 'market_research',
    corporate: 'market_research',
    consumer: 'market_research',
    marketing: 'market_entry',
    partnership: 'market_entry',
    channel: 'market_entry',
    payment: 'market_entry',
  }

  const categoryName = searchParams.get('name') || 'all'
  const translatedCategoryName = categoryTranslationKeys[categoryName]
  const [fetchParams, setFetchParams] = useState({
    categorySlug: categoryName, 
    language: lang.toUpperCase(), 
    userId: getUserId(),
    first: 10,
    ...sort2variables('newest'),
  })
  
  useEffect(() => {
    if (categoryName === 'all') {
      getAllPosts(fetchParams).then(result => {
        updatePosts(result)
      })
    } else {
      getContentsByCategory(fetchParams).then(result => {
        updatePosts(result)
      })
    }
  }, [categoryName, fetchParams, updatePosts])

  const handleSorter = async (sorter) => {
    setFetchParams(prev => ({
      ...prev,
      ...sort2variables(sorter),
    }))
  }
  
  const handleToggleBookmark = async ({ isSaved, databaseId }) => {
    try {
      if (isSaved) {
        await removeWatchList({
          type: 'post',
          content_id: databaseId,
          user_id: fetchParams.userId,
        })
      } else {
        await createWatchList({
          type: 'post',
          content_id: databaseId,
          user_id: fetchParams.userId,
        })
      }

      setFetchParams(prev => ({
        ...prev,
      }))
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
              <p>{t(translatedCategoryName)}</p>
              <h2>{t(categoryName).toUpperCase()}</h2>
            </div>

            <Icons type="arrowBlackDown" />
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
                options={ct('sort_options', { returnObjects: true })}
                onChange={handleSorter}
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
