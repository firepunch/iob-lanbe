'use client'
 
import { getPosts } from '@/api_gql'
import { createWatchList, fetchCountContent, fetchWatchList, removeWatchList } from '@/api_wp'
import { useTranslation } from '@/i18n/client'
import useUserState from '@/stores/userStore'
import { TI18N, ValidLocale } from '@/types'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import CategoryFilter from '../CategoryFilter'
import CountryFilter from '../CountryFilter'
import Icons from '../Icons'
import { PostCard } from '../PostCard'

interface IFetchParams {
  language: string
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
  const {  bookmark, read, updateBookmarkPost, updateReadPost } = useUserState(state => state)
  const [clickedType, setClickedType] = useState<'saved'|'read'>('saved')
  const [openCountry, setOpenCountry] = useState<boolean>(false)
  const [openCategory, setOpenCategory] = useState<boolean>(false)
  const [fetchParams, setFetchParams] = useState<IFetchParams>({
    language: lang.toUpperCase(),
    savedIn: undefined,
    readIn: undefined,
    categories: [],
    countries: [],
    userId: userId,
  })

  useEffect(() => {
    fetchWatchList({
      type: 'post',
      user_id: userId,
    }).then(result => {
      setFetchParams(prev => ({
        ...prev,
        savedIn: result?.ids,
      }))
    })
    
    fetchCountContent({
      type: 'post',
      user_id: userId,
    }).then(result => {
      setFetchParams(prev => ({
        ...prev,
        readIn: result?.ids,
      }))
    })
  }, [])

  useEffect(() => {
    if (fetchParams.savedIn !== undefined) {
      getPosts({
        ...fetchParams,
        categoryName: [...fetchParams.categories, ...fetchParams.countries].join(','),
        in: fetchParams.savedIn,
      }).then(result => (
        updateBookmarkPost(result?.edges)
      ))
    }
    if (fetchParams.readIn !== undefined) {
      getPosts({
        ...fetchParams,
        categoryName: [...fetchParams.categories, ...fetchParams.countries].join(','),
        in: fetchParams.readIn,
      }).then(result => (
        updateReadPost(result?.edges)
      ))
    }
  }, [fetchParams])

  const handleToggleBookmark = async ({ isSaved, databaseId }) => {
    try {
      let result = { ids: [] }
      if (isSaved) {
        result = await removeWatchList({
          type: 'post',
          content_id: databaseId,
          user_id: userId,
        }) 
      } else {
        result = await createWatchList({
          type: 'post',
          content_id: databaseId,
          user_id: userId,
        }) 
      }

      setFetchParams(prev => ({
        ...prev,
        savedIn: result?.ids,
      }))
    } catch (err) {
      console.log(err)
      alert('저장 실패')
    }
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
          <div className="country-category">
            <button 
              className={`${(openCountry || fetchParams.countries?.length) ? 'black-button' : ''}`}
              onClick={handleToggleCountry}
            >
              {t('country')}
            </button>
            <button 
              className={`${(openCategory || fetchParams.countries?.length) ? 'black-button' : ''}`}
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
          </div>

          <div className="saved-read">
            <button 
              className={`${clickedType === 'saved' ? 'black-button' : '' }`}
              onClick={() => handleClickedType('saved')}
            >
              {t('saved')} {`(${bookmark?.post?.length || 0})`}
            </button>
            <button 
              className={`${clickedType === 'read' ? 'black-button' : '' }`}
              onClick={() => handleClickedType('read')}
            >
              {t('read')} {`(${read?.post?.length || 0})`}
            </button>
          </div>
        </div>
      </div>

      {(clickedType === 'saved' ? bookmark : read)?.post?.length ? (
        <div id="saved-content">
          {(clickedType === 'saved' ? bookmark : read)?.post?.map(({ node }) => (
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