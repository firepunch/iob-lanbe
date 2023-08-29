'use client'

import { getContents, getSearchResults } from '@/api_gql'
import { createWatchList, removeWatchList, sendSearchRequestForm } from '@/api_wp'
import { PostCard, ReportCard, SearchRequestForm } from '@/components'
import { useTranslation } from '@/i18n/client'
import { ValidLocale } from '@/i18n/settings'
import useContentState from '@/stores/contentStore'
import { getUserId } from '@/utils/lib'
import { useEffect, useState } from 'react'

export default function Search({
  params: { lang, keyword },
}: {
  params: { lang: ValidLocale; keyword: string },
}) {
  const { searchResult, recommend, updateSearchResult , updateRecommend } = useContentState(state => state)
  const { t } = useTranslation(lang, 'search')
  const userId = getUserId()
  const totalLength = (searchResult?.posts?.length || 0) + (searchResult?.products?.length || 0)
  const [params] = useState({
    postLanguage: lang.toUpperCase(),
    reportLanguage: lang,
    userId,
    keyword,
  })

  useEffect(() => {
    getSearchResults(params).then(result => {
      updateSearchResult(result)
    })
  }, [params, updateSearchResult])

  useEffect(() => {
    if ( totalLength === 0 ) {
      getContents(lang.toUpperCase()).then(result => (
        updateRecommend(result)
      ))
    }
  }, [totalLength])

  const handleToggleBookmark = async ({ isSaved, databaseId }) => {
    try {
      if (isSaved) {
        await removeWatchList({
          type: 'post',
          content_id: databaseId,
          user_id: userId,
        })
      } else {
        await createWatchList({
          type: 'post',
          content_id: databaseId,
          user_id: userId,
        })
      }

      const result = await getSearchResults(params)
      updateSearchResult(result)
    } catch (err) {
      console.log(err)
      alert('저장 실패')
    }
  }
  
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()

    try {
      const formData = new FormData(e.currentTarget)
      await sendSearchRequestForm(formData)
      alert('요청 폼 전송에 성공했습니다!')
    } catch (error) {
      console.error('요청 폼 전송 에러:', error)
    }
  }

  return (
    <>
      <section className={`search-result-text ${Boolean(totalLength) ? '' : 'search-noresult-text'}`}>
        <p>
          {totalLength}{t('results_for')}&apos;{decodeURIComponent(keyword)}&lsquo;
        </p>

        {!Boolean(totalLength) && (
          <p className="no-result-notice">
            {t('try_again_1')}
            <span>{t('try_again_2')}</span>,<br />
            {t('try_again_3')}
          </p>
        )}
      </section>

      {Boolean(totalLength) ? (
        <>
          <section id="search-result-contents">
            <div className="sr-content-title">
              <h3>{t('content')}</h3>
            </div>

            <div id="search-result-contents-wrap">
              {searchResult?.posts?.map(({ node }) => (
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
          </section>

          <section id="search-result-reports">
            <div className="sr-report-title">
              <h3>{t('report')}</h3>
            </div>

            <div id="search-result-reports-wrap">
              {searchResult?.products?.map(({ node }) => (
                <ReportCard
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
          </section>
        </>
      ) : (
        <>
          <section id="search-recommended-contents">
            <div className="sr-recommended-title">
              <h3>{t('recommend')}</h3>
            </div>

            <div id="search-recommended-contents-wrap">
              {recommend?.map(({ node }) => (
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
          </section>

          <section id="send-us-message">
            <SearchRequestForm t={t} onSubmit={handleFormSubmit} />
          </section>
        </>
      )}
    </>
  )
}