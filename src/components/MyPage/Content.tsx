'use client'
 
import { getPosts } from '@/api_gql'
import { fetchCountContent, fetchWatchList, removeWatchList } from '@/api_wp'
import { useTranslation } from '@/i18n/client'
import useUserState from '@/stores/userStore'
import { TI18N, ValidLocale } from '@/types'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import CategoryFilter from '../CategoryFilter'
import CountryFilter from '../CountryFilter'
import Icons from '../Icons'
import { PostCard } from '../PostCard'
import { IPost } from '@/types/store'

export default function Content({
  t,
  lang,
  userId,
}: {
  t: TI18N
  lang: ValidLocale
  userId: number
}) {
  const { t: ct } = useTranslation(lang, 'common')
  const { bookmark, read, updateBookmarkPost, updateReadPost } = useUserState(state => state)
  const [clickedType, setClickedType] = useState<'saved'|'read'>('saved')
  const [openCountry, setOpenCountry] = useState<boolean>(false)
  const [openCategory, setOpenCategory] = useState<boolean>(false)
  const [fetchParams, setFetchParams] = useState({
    language: lang.toUpperCase(),
    savedIn: undefined,
    readIn: undefined,
    categories: [],
    countries: [],
    userId,
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

  const handleToggleBookmark = async (contentId: number) => {
    try {
      await removeWatchList({
        type: 'post',
        content_id: contentId,
        user_id: userId,
      })

      const result = await fetchWatchList({
        type: 'post',
        user_id: userId,
      })

      if (result?.ids) {
        setFetchParams(prev => ({
          ...prev,
          in: result.ids,
        }))
      } else {
        setFetchParams(prev => ({
          ...prev,
        }))
      }
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

  return (
    <>
      <div id="default-title">
        <h2>{t('content').toUpperCase()}</h2>

        <div className="filters-wrap">
          <div className="country-category">
            <button 
              className={`${fetchParams.countries?.length ? 'black-button' : ''}`}
              onClick={() => setOpenCountry(!openCountry)}
            >
              {t('country')}
            </button>
            <button 
              className={`${fetchParams.categories?.length ? 'black-button' : ''}`}
              onClick={() => setOpenCategory(!openCategory)}
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
              onToggleBookmark={() => handleToggleBookmark(node.databaseId)}
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