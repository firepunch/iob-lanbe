'use client'

import { getAllPosts, getContents, getSearchResults } from '@/api_gql'
import { createWatchList, removeWatchList, sendSearchRequestForm } from '@/api_wp'
import { PostCard, ReportCard, SearchRequestForm } from '@/components'
import useStore from '@/hooks/useStore'
import { useTranslation } from '@/i18n/client'
import { ValidLocale } from '@/i18n/settings'
import useContentState from '@/stores/contentStore'
import useUserState, { INIT_USER_STATE } from '@/stores/userStore'
import { formatSearchTaxQuery } from '@/utils/lib'
import { useEffect, useState } from 'react'

export default function Search({
  params: { lang, keyword },
}: {
  params: { lang: ValidLocale; keyword: string },
}) {
  const { _hasHydrated, user } = useStore(useUserState, state => state, INIT_USER_STATE)
  const { searchResult, recommend, mergeSearchResult, updateRecommend } = useContentState(state => state)
  const { t } = useTranslation(lang, 'search')
  const totalLength = (searchResult?.posts?.edges?.length || 0) + (searchResult?.reports?.edges?.length || 0)
  const [fetchParams, setFetchParams] = useState({
    lang,
    language: lang.toUpperCase(),
    userId: user.databaseId,
    keyword: decodeURIComponent(keyword),
  })

  useEffect(() => {
    getAllPosts({
      lang,
      language: lang.toUpperCase(),
      userId: user?.databaseId,
      first: 3,
    }).then(result => (
      updateRecommend(result)
    ))
  }, [])

  useEffect(() => {
    getSearchResults({
      ...fetchParams,
      taxQuery: formatSearchTaxQuery(fetchParams.keyword),
      keyword: '',
    }).then(taxResult => {
      console.log(taxResult)
      mergeSearchResult(taxResult)
    })

    getSearchResults({
      ...fetchParams,
    }).then(keyResult => {
      console.log(keyResult)
      mergeSearchResult(keyResult)
    })
  }, [fetchParams.keyword])
  
  useEffect(() => {
    if (user?.databaseId !== 0) {
      setFetchParams(prev => ({
        ...prev,
        userId: user.databaseId,
      }))
    }
  }, [user])

  const handleReload = async () => {
    setFetchParams(prev => ({
      ...prev,
    }))
  }
  
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    
    try {
      const formData = new FormData(e.currentTarget)
      await sendSearchRequestForm(formData)
    } catch (error) {
      console.error(error)
    }
  }

  if (!_hasHydrated) {
    return <div></div>
  }

  return (
    <>
      <section className={`search-result-text ${Boolean(totalLength) ? '' : 'search-noresult-text'}`}>
        {lang === 'en' ? (
          <p>{totalLength}{t('results_for')}&apos;{fetchParams.keyword}&lsquo;</p>
        ) : (
          <p>&apos;{fetchParams.keyword}&lsquo;{t('results_for')}{totalLength}{t('results_len')}</p>
        )}

        {totalLength === 0 && (
          <p className="no-result-notice">
            {t('try_again_1')}
            <span>{t('try_again_2')}</span>,<br />
            {t('try_again_3')}
          </p>
        )}
      </section>

      {totalLength === 0  ? (
        <>
          <section id="search-recommended-contents">
            <div className="sr-recommended-title">
              <h3>{t('recommend')}</h3>
            </div>

            <div id="search-recommended-contents-wrap">
              {recommend?.edges?.map(({ node }) => (
                <PostCard 
                  {...node}
                  key={node.id}
                  onFetchData={handleReload}
                />
              ))}
            </div>
          </section>

          <section id="send-us-message">
            <SearchRequestForm t={t} onSubmit={handleFormSubmit} />
          </section>
        </>
      ) : (
        <>
          <section id="search-result-contents">
            <div className="sr-content-title">
              <h3>{t('content')}</h3>
            </div>

            <div id="search-result-contents-wrap">
              {searchResult?.posts?.edges?.map(({ node }) => (
                <PostCard
                  {...node}
                  key={node.id}
                  onFetchData={handleReload}
                />
              ))}
            </div>
          </section>

          <section id="search-result-reports">
            <div className="sr-report-title">
              <h3>{t('report')}</h3>
            </div>

            <div id="search-result-reports-wrap">
              {searchResult?.reports?.edges?.map(({ node }) => (
                <ReportCard
                  {...node}
                  key={node.id}
                  onFetchData={handleReload}
                />
              ))}
            </div>
          </section>
        </>
      )}
    </>
  )
}