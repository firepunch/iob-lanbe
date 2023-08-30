'use client'
 
import { getPosts } from '@/api_gql'
import { fetchWatchList, removeWatchList } from '@/api_wp'
import { useTranslation } from '@/i18n/client'
import useUserState from '@/stores/userStore'
import { TI18N, ValidLocale } from '@/types'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import CategoryFilter from '../CategoryFilter'
import CountryFilter from '../CountryFilter'
import Icons from '../Icons'
import { PostCard } from '../PostCard'

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
  const { bookmark, updateBookmarkPost } = useUserState(state => state)
  const [openCountry, setOpenCountry] = useState<boolean>(false)
  const [openCategory, setOpenCategory] = useState<boolean>(false)
  const [fetchParams, setFetchParams] = useState({
    language: lang.toUpperCase(),
    categories: [],
    countries: [],
    userId,
  })

  useEffect(() => {
    fetchWatchList({
      type: 'post',
      user_id: userId,
    }).then(result => {
      if (result?.ids) {
        setFetchParams(prev => ({
          ...prev,
          in: result.ids,
        }))
      } else {
        updateBookmarkPost([])
      }
    })
  }, [])

  useEffect(() => {
    getPosts({
      ...fetchParams,
      categoryName: [...fetchParams.categories, ...fetchParams.countries].join(','),
    }).then(result => (
      updateBookmarkPost(result?.edges)
    ))
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
            <button className="black-button">
              {t('saved')} {`(${bookmark?.post?.length || 0})`}
            </button>
          </div>
        </div>
      </div>

      {bookmark?.post?.length ? (
        <div id="saved-content">
          {bookmark.post?.map(({ node }) => (
            <PostCard
              {...node}
              key={node.id}
              onToggleBookmark={() => handleToggleBookmark(node.id)}
            />
          ))}
        </div>
      ) : (
        <div id="default-text">
          <p className="none-saved-text">{t('content_none')}</p>
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