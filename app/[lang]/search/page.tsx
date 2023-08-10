'use client'

import { SearchRequestForm } from '@/components'
import { ValidLocale } from '@/i18n/settings'
import { useTranslation } from '@/i18n/client'
import { useState } from 'react'
import { SearchRequest } from '@/api_wp'

export default function Search({
  params: { lang },
}: {
  params: { lang: ValidLocale; },
}) {
  const { t } = useTranslation(lang, 'search')
  const [errorCode, setErrorCode] = useState()

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

  return (
    <>
      {/* <div>
        Search
        <input
          type="text"
          onChange={(e) => handleSearchSubmit()}
        />
        <button>OK</button>
      </div>
      {data &&
        data.feed.links.map((link, index) => (
          <Link key={link.id} link={link} index={index} />
        ))} */}
      <SearchRequestForm
        t={t} 
        errorCode={'errorCode'}
        onSubmit={handleSubmit} 
      />
    </>
  )
}
