'use client'

import { SearchRequestForm, SearchBar } from '@/components'
import { ValidLocale } from '@/i18n/settings'
import { useTranslation } from '@/i18n/client'
import { useState } from 'react'
import { SearchRequest, searchContent } from '@/api_wp'
import { getContentByDatabaseID } from '@/api_gql'
import { ContentCard } from '@/components'
import Link from 'next/link'

export default  function Search({
  params: { lang },
}: {
  params: { lang: ValidLocale; },
}) {
  const { t } = useTranslation(lang, 'search')
  const [errorCode, setErrorCode] = useState()
  const contents = {}
  // const [contents, setContentsCode] = useState()

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

      const { code } = await SearchRequest(formData)
      setErrorCode(code)
    } catch (error) {
      console.error('이메일 폼 전송 에러:', error)
    }
  }

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const searchText = 'vietnam'
    // window.location.href = `?search=${searchText}`
    try {
      const res = await searchContent({
        search: searchText,
      })
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
  {contents && Object.keys(contents).map((id) => {
    const post = contents[id]
    return (
      <Link key={post.id} href={`/${encodeURIComponent(post.slug)}`}>
        <ContentCard
          thumbnail_url={post.featuredImage?.node.sourceUrl}
          {...post}
        />
      </Link>
    )
  })}

  return (
    <>
      <SearchBar
        t={t} 
        errorCode={errorCode}
        onSubmit={handleSearchSubmit} 
      />
      <SearchRequestForm
        t={t} 
        errorCode={errorCode}
        onSubmit={handleSubmit} 
      />idont know
    </>
  )
}
