'use client'

import { getPosts } from '@/api_gql'
import { CountryFilter, Icons, Pagination, PostCard, Select } from '@/components'
import useIsMobile from '@/hooks/useMobile'
import useOutsideClick from '@/hooks/useOutsideClick'
import useStore from '@/hooks/useStore'
import { useTranslation } from '@/i18n/client'
import useContentState from '@/stores/contentStore'
import useUserState, { INIT_USER_STATE } from '@/stores/userStore'
import { ValidLocale } from '@/types'
import { formatPostTaxQuery, sort2variables } from '@/utils/lib'
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
  const isMobile = useIsMobile()
  const [isClickedOutside] = useOutsideClick(['filters'])
  const { _hasHydrated, user } = useStore(useUserState, state => state, INIT_USER_STATE)
  const { posts, updatePosts } = useContentState(state => state)
  const { t: ct } = useTranslation(lang, 'common')
  const { t } = useTranslation(lang, 'category-page')
  const [isOpenCategory, setIsOpenCategory] = useState(false)
  const [isOpenFilter, setIsOpenFilter] = useState(false)
  const [fetchParams, setFetchParams] = useState({
    cateName: searchParams.get('name') || '',
    countries: [],
    lang,
    language: lang.toUpperCase(), 
    userId: user.databaseId,
    ...initPagination,
    ...sort2variables('newest'),
  })

  useEffect(() => {
    const taxQuery = formatPostTaxQuery(
      {
        terms: fetchParams.cateName === '' ? [] : [`${fetchParams.cateName.toLowerCase()}-${lang}`],
        field: 'SLUG',
      },
      fetchParams.countries,
    )

    getPosts({
      ...fetchParams,
      taxQuery,
    }).then(result => {
      const isFirstPage = fetchParams.first === GRID_CARD_NUMBER && fetchParams.after === null
      updatePosts({
        edges: isMobile && !isFirstPage ? [...posts.edges, ...result.edges] : result.edges,
        pageInfo: {
          ...result.pageInfo,
          initTotal: isFirstPage ? result.pageInfo.total : posts.pageInfo?.initTotal,
        },
      })
    })
  }, [fetchParams])

  useEffect(() => {
    const newCateName = searchParams.get('name') || ''

    if (newCateName !== fetchParams.cateName) {
      setFetchParams(prev => ({
        ...prev,
        cateName: newCateName,
      }))
    }
  }, [searchParams])

  useEffect(() => {
    if (user.databaseId !== fetchParams.userId) {
      setFetchParams(prev => ({
        ...prev,
        userId: user.databaseId,
      }))
    }
  }, [user])

  useEffect(() => {
    
  }, [])

  useEffect(() => {
    if (isClickedOutside) {
      setIsOpenFilter(false)
    }
  }, [isClickedOutside])

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
      cateName: categoryName,
    }))
  }
  
  const handleCountry = (countries) => {
    setFetchParams(prev => ({ 
      ...prev,
      ...initPagination,
      countries,
    }))
  }

  const handleOpenCategory = () => {
    setIsOpenCategory(!isOpenCategory)
    setIsOpenFilter(false)
  }

  const handleClickAll = () => {
    handleCategory('')
    handleCountry([])
    setIsOpenFilter(false)
  }
  
  const handleReload = () => {
    setFetchParams(prev => ({
      ...prev,
    }))
  }

  if (!_hasHydrated){
    return <div></div>
  }

  return (
    <>
      <section id="subcateg-content-title">
        <div id="title-top">
          <div className="title-arrow">
            <div className="title-categ-subcateg">
              <p>{t(categoryTranslationKeys[fetchParams.cateName])}</p>
              <h2>{t(`category_${fetchParams.cateName}`).toUpperCase()}</h2>
            </div>

            <Icons 
              type="arrowBlackDown" 
              className={isOpenCategory ? 'show' : ''}
              onClick={handleOpenCategory} 
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

            {fetchParams.cateName !== '' && (
              <span className="see-all" onClick={() => handleCategory('')}>
                {t('see_all')}
              </span>
            )}
          </div>

          {fetchParams.cateName !== '' && (
            <div id="categ-description">
              <p>{t(`category_desc_${fetchParams?.cateName}`)}</p>
            </div>
          )}

          <div id="filters-sorting">
            <section id="filters" className="filters">
              <span 
                className={
                  `all-button ${
                    (fetchParams.cateName === '' && fetchParams.countries?.length === 0) && 'black-button'
                  }`} 
                onClick={handleClickAll}
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
                  lang={lang}
                  ct={ct}
                  value={fetchParams?.countries}
                  onChange={handleCountry}
                />
              )}
            </section>

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
              {...node}
              key={node.databaseId}
              onFetchData={handleReload}
            />
          ))}
        </div>

        {posts?.pageInfo?.initTotal ? (
          <Pagination
            pageInfo={posts.pageInfo}
            size={GRID_CARD_NUMBER}
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
        ) : null}
      </section>
    </>
  )
}
