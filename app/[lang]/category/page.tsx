'use client'

import { getPosts } from '@/api_gql'
import { createWatchList, removeWatchList } from '@/api_wp'
import { CountryFilter, Icons, Pagination, PostCard, Select } from '@/components'
import { useTranslation } from '@/i18n/client'
import useContentState from '@/stores/contentStore'
import { ValidLocale } from '@/types'
import { getUserId, sort2variables } from '@/utils/lib'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const GRID_CARD_NUMBER = 9
const initPagination = {
  last: null, 
  before: null, 
  first: GRID_CARD_NUMBER, 
  after: null, 
}
const categoryTranslationKeys = {
  market: 'market_research',
  corporate: 'market_research',
  consumer: 'market_research',
  marketing: 'market_entry',
  partnership: 'market_entry',
  channel: 'market_entry',
  payment: 'market_entry',
}
  
export default function Category({
  params: { lang },
}: {
  params: { lang: ValidLocale }
}) {
  const searchParams = useSearchParams()
  const { posts, updatePosts } = useContentState(state => state)
  const { t: ct } = useTranslation(lang, 'common')
  const { t } = useTranslation(lang, 'category-page')
  const [isOpenCategory, setIsOpenCategory] = useState(false)
  const [isOpenFilter, setIsOpenFilter] = useState(false)
  const [fetchParams, setFetchParams] = useState({
    categoryName: searchParams.get('name') || '',
    countries: [],
    language: lang.toUpperCase(), 
    userId: getUserId(),
    ...initPagination,
    ...sort2variables('newest'),
  })
  
  useEffect(() => {
    getPosts({
      ...fetchParams,
      ...fetchParams?.countries?.length && {
        categoryName: fetchParams.categoryName === '' ? 
          fetchParams.countries.join(',') : 
          [fetchParams.categoryName, ...fetchParams.countries].join(','),
      },
    }).then(result => {
      updatePosts({
        edges: result.edges,
        pageInfo: {
          ...result.pageInfo,
          initTotal: posts.pageInfo?.initTotal || result.pageInfo.total,
        },
      })
    })
  }, [fetchParams])

  useEffect(() => {
    setFetchParams(prev => ({
      ...prev,
      categoryName: searchParams.get('name') || '',
    }))
  }, [searchParams])

  const handleSorter = (sorter) => {
    setFetchParams(prev => ({
      ...prev,
      ...initPagination,
      ...sort2variables(sorter),
    }))
  }

  const handleCategory = (categoryName: string) => {
    setFetchParams(prev => ({
      ...prev,
      ...initPagination,
      categoryName,
    }))
  }
  
  const handleCountry = (countries) => {
    setFetchParams(prev => ({ 
      ...prev, 
      ...initPagination,
      countries,
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
              <p>{t(categoryTranslationKeys[fetchParams.categoryName])}</p>
              <h2>{t(`category_${fetchParams.categoryName}`).toUpperCase()}</h2>
            </div>

            <Icons 
              type="arrowBlackDown" 
              className={isOpenCategory ? 'show' : ''}
              onClick={() => setIsOpenCategory(!isOpenCategory)} 
            />
          </div>

          <div className={`other-content-pages ${isOpenCategory && 'show'}`}>
            <ul>
              <li className="main-categ">
                {t('market_research')}
              </li>
              <li className="sub-categ">
                <span onClick={() => handleCategory('market')}>
                  <Icons type="arrowBlack" />
                  <p>{t('market')}</p>
                </span>
              </li>
              <li className="sub-categ">
                <span onClick={() => handleCategory('corporate')}>
                  <Icons type="arrowBlack" />
                  <p>{t('corporate')}</p>
                </span>
              </li>
              <li className="sub-categ">
                <span onClick={() => handleCategory('consumer')}>
                  <Icons type="arrowBlack" />
                  <p>{t('consumer')}</p>
                </span>
              </li>
            </ul>

            <ul>
              <li className="main-categ">                
                {t('market_entry')}
              </li>
              <li className="sub-categ">
                <span onClick={() => handleCategory('marketing')}>
                  <Icons type="arrowBlack" />
                  <p>{t('marketing')}</p>
                </span>
              </li>
              <li className="sub-categ">
                <span onClick={() => handleCategory('partnership')}>
                  <Icons type="arrowBlack" />
                  <p>{t('partnership')}</p>
                </span>
              </li>
              <li className="sub-categ">
                <span onClick={() => handleCategory('channel')}>
                  <Icons type="arrowBlack" />
                  <p>{t('channel')}</p>
                </span>
              </li>
              <li className="sub-categ">
                <span onClick={() => handleCategory('payment')}>
                  <Icons type="arrowBlack" />
                  <p>{t('payment')}</p>
                </span>
              </li>
            </ul>

            <span className="see-all" onClick={() => handleCategory('')}>
              {t('see_all')}
            </span>
          </div>

          {fetchParams.categoryName !== '' && (
            <div id="categ-description">
              <p>{t(`category_${fetchParams?.categoryName}_desc`)}</p>
            </div>
          )}

          <div id="filters-sorting">
            <div className="filters">
              <span 
                className={`all-button ${fetchParams.categoryName === '' && 'black-button'}`} 
                onClick={() => handleCategory('')}
              >
                {ct('all')}
              </span>
              <button
                type="button" 
                className={`country-button ${fetchParams.countries?.length && 'black-button'}`}
                onClick={() => setIsOpenFilter(!isOpenFilter)}
              >
                {ct('country')}
              </button>
              {isOpenFilter && (
                <CountryFilter 
                  ct={ct}
                  value={fetchParams?.countries}
                  onChange={handleCountry}
                />
              )}
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
          {posts?.edges?.map(({ node }) => (
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

        <Pagination
          pageInfo={posts?.pageInfo}
          size={GRID_CARD_NUMBER}
          first={fetchParams?.first}
          last={fetchParams?.last}
          onClickPrev={() => {
            setFetchParams(prev => ({
              ...prev,
              last: GRID_CARD_NUMBER, 
              before: posts?.pageInfo.startCursor, 
              first: null, 
              after: null, 
            }))
          }}
          onClickNext={() => {
            setFetchParams(prev => ({
              ...prev,
              after: posts?.pageInfo?.endCursor,
              first: GRID_CARD_NUMBER, 
              last: null, 
              before: null, 
            }))
          }}
        />

      </section>
    </>
  )
}
