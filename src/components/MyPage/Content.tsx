'use client'
 
import { getPosts } from '@/api_gql'
import { createWatchList, fetchCountContent, fetchWatchList, removeWatchList } from '@/api_wp'
import useOutsideClick from '@/hooks/useOutsideClick'
import { useTranslation } from '@/i18n/client'
import useUserState, { INIT_USER_STATE, IUserState } from '@/stores/userStore'
import { TI18N, ValidLocale } from '@/types'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import CategoryFilter from '../CategoryFilter'
import CountryFilter from '../CountryFilter'
import Icons from '../Icons'
import { PostCard } from '../PostCard'
import { formatPostTaxQuery } from '@/utils/lib'
import useStore from '@/hooks/useStore'

interface IFetchParams {
  language: string
  lang: string
  userId: number
  savedIn?: string[]
  readIn?: string[]
  categories: string[]
  countries: string[]
}

export default function Content({
  t,
  lang,
  userId,
}: {
  t: TI18N
  lang: ValidLocale
  userId:number
}) {
  const { t: ct } = useTranslation(lang, 'common')
  const { bookmark, read, updateBookmarkPost, updateReadPost } = useStore(useUserState, state => state, INIT_USER_STATE)
  const [isClickedOutside] = useOutsideClick(['filters'])
  const [clickedType, setClickedType] = useState<'saved'|'read'>('saved')
  const [openCountry, setOpenCountry] = useState<boolean>(false)
  const [openCategory, setOpenCategory] = useState<boolean>(false)
  const [fetchParams, setFetchParams] = useState<IFetchParams>({
    language: lang.toUpperCase(),
    lang: lang,
    savedIn: undefined,
    readIn: undefined,
    categories: [],
    countries: [],
    userId: userId,
  })

  useEffect(() => {
    fetchWatchList({
      type: `post_${lang}`,
      user_id: userId,
    }).then(result => {
      setFetchParams(prev => ({
        ...prev,
        savedIn: result?.ids,
      }))
    })
    
    fetchCountContent({
      type: `post_${lang}`,
      user_id: userId,
    }).then(result => {
      setFetchParams(prev => ({
        ...prev,
        readIn: result?.ids,
      }))
    })
  }, [])

  useEffect(() => {
    const taxQuery = formatPostTaxQuery(
      {
        terms: fetchParams.categories,
        field: 'SLUG',
      },
      fetchParams.countries,
    )

    if (fetchParams.savedIn !== undefined) {
      getPosts({
        ...fetchParams,
        taxQuery,
        in: fetchParams.savedIn,
      }).then(result => (
        updateBookmarkPost(result?.edges)
      ))
    }
    if (fetchParams.readIn !== undefined) {
      getPosts({
        ...fetchParams,
        taxQuery,
        in: fetchParams.readIn,
      }).then(result => (
        updateReadPost(result?.edges)
      ))
    }
  }, [fetchParams])

  useEffect(() => {
    if (isClickedOutside) {
      setOpenCountry(false)
      setOpenCategory(false)
    }
  }, [isClickedOutside])

  const handleFetchData = async (ids?: string[]) => {
    setFetchParams(prev => ({
      ...prev,
      savedIn: ids,
    }))
  }
  
  const handleCategory = (categories) => {
    setFetchParams(prev => ({
      ...prev,
      categories,
    }))
  }
  
  const handleCountry = (countries) => {
    setFetchParams(prev => ({ 
      ...prev, 
      countries,
    }))
  }

  const handleClickedType = (clicked) => {
    setClickedType(clicked)
  }

  const handleToggleCountry = () => {
    setOpenCountry(!openCountry)
    setOpenCategory(false)
  }

  const handleToggleCategory = () => {
    setOpenCountry(false)
    setOpenCategory(!openCategory)
  }

  return (
    <>
      <div id="default-title">
        <h2>{t('content').toUpperCase()}</h2>

        <div className="filters-wrap">
          <section id="filters" className="country-category">
            <button 
              className={`${(openCountry || fetchParams.countries?.length) ? 'black-button' : ''}`}
              onClick={handleToggleCountry}
            >
              {t('country')}
            </button>
            <button 
              className={`${(openCategory || fetchParams.categories?.length) ? 'black-button' : ''}`}
              onClick={handleToggleCategory}
            >
              {t('category')}
            </button>
            {openCountry && (
              <CountryFilter 
                lang={lang}
                ct={ct}
                value={fetchParams?.countries}
                onChange={handleCountry}
              />
            )}
            {openCategory && (
              <CategoryFilter
                lang={lang}
                ct={ct}
                value={fetchParams?.categories}
                onChange={handleCategory}
              />
            )}
          </section>

          <div className="saved-read">
            <button 
              className={`${clickedType === 'saved' ? 'black-button' : '' }`}
              onClick={() => handleClickedType('saved')}
            >
              {t('saved')} {`(${fetchParams?.savedIn?.length || 0})`}
            </button>
            <button 
              className={`${clickedType === 'read' ? 'black-button' : '' }`}
              onClick={() => handleClickedType('read')}
            >
              {t('read')} {`(${fetchParams?.readIn?.length || 0})`}
            </button>
          </div>
        </div>
      </div>

      {fetchParams?.[clickedType === 'saved' ? 'savedIn' : 'readIn']?.length ? (
        <div id="saved-content">
          {(clickedType === 'saved' ? bookmark : read)?.post?.map(({ node }) => (
            <PostCard
              {...node}
              key={node.id}
              onFetchData={handleFetchData}
            />
          ))}
        </div>
      ) : (
        <div id="default-text">
          <p className="none-saved-text">{t(`content_none_${clickedType}`)}</p>
          <p className="explore-text">{t('content_explore')}</p>

          <Link href={{ pathname: `/${lang}/category` }}>
            <Icons type="arrowBlack" />
            <p>{t('see-all')}</p>
          </Link>
        </div>
      )}
    </>
  )
}