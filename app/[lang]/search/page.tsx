'use client'

import { SearchRequestForm, SearchBarRequest } from '@/components'
import { ValidLocale } from '@/i18n/settings'
import { useTranslation } from '@/i18n/client'
import { useState } from 'react'
import { searchRequest, searchBar } from '@/api_wp'
import { getContentByDatabaseID } from '@/api_gql'
import Image from 'next/image'

import closeIcon from '@/imgs/close.png'

export default function Search({
  params: { lang },
}: {
  params: { lang: ValidLocale; },
}) {
  const { t } = useTranslation(lang, 'search')
  const [errorCode, setErrorCode] = useState()
  const contents = {}

  const handleSearchBar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const searchText = 'vietnam'
    // window.location.href = `?search=${searchText}`
    try {
      const res = await searchBar({
        search: searchText,
      })
      console.log('res', res)
      setErrorCode(res)
      res.map(async ({ id }) => {
        const contentData = await getContentByDatabaseID(id)
        const [content] = await Promise.all([contentData])

        contents[id] = content
      })
    } catch (error) {
      console.error('submit error:', error)
    }
  }
  // {contents && Object.keys(contents).map((id) => {
  //   const post = contents[id]
  //   return (
  //     <Link key={post.id} href={`/${encodeURIComponent(post.slug)}`}>
  //       <ContentCard
  //         thumbnail_url={post.featuredImage?.node.sourceUrl}
  //         {...post}
  //       />
  //     </Link>
  //   )
  // })}

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const formData = new FormData()
      // const { id, value } = e.target
      // formData.set(id, value)
      // setFormData(formData)
      formData.append('first-name', 'yu')
      formData.append('last-name', 'da')
      formData.append('user-email', 'ex@gmail.com')
      formData.append('message', 'hello')
      console.log(e.target)

      const { code } = await searchRequest(formData)
      setErrorCode(code)
    } catch (error) {
      console.error('이메일 폼 전송 에러:', error)
    }
  }

  return (
    <>
      <section id="search">
        <button type="button">
          <Image src={closeIcon} alt="Close" />
        </button>

        <div id="input-recommendations">
          <SearchBarRequest 
            t={t} 
            errorCode={errorCode}
            onSubmit={handleSearchBar}
          />

          <div className="recommendations">
            <h3>{t('recommended')}</h3>

            <div className="keywords-wrap">
              <div className="keywords-row">
                {/* no result page linked as example */}
                <a href="search_noresults.html" className="keyword"><p>Indonesia</p></a>
                <a href="search_results.html" className="keyword"><p>Vietnam</p></a>
                <a href="#" className="keyword"><p>Thailand</p></a>
                <a href="#" className="keyword"><p>Malaysia</p></a>
              </div>
              <div className="keywords-row">
                <a href="#" className="keyword"><p>Digitalization</p></a>
                <a href="#" className="keyword"><p>E-Commerce</p></a>
                <a href="#" className="keyword"><p>Social Media</p></a>
                <a href="#" className="keyword"><p>Culture</p></a>
              </div>
            </div>
          </div>
        
        </div>
      </section>
      <SearchRequestForm
        t={t} 
        errorCode={errorCode}
        onSubmit={handleSubmit} 
      />
    </>
  )
}