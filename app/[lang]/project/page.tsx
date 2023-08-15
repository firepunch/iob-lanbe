'use client'

import { ProjectForm } from '@/components'
import { ValidLocale } from '@/i18n/settings'
import { useTranslation } from '@/i18n/client'
import { useState } from 'react'
import { ProjectInquiry } from '@/api_wp'

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
      formData.append('organization', 'iob')
      formData.append('job-title', 'job')
      formData.append('user-email', 'ex@gmail.com')
      formData.append('contact-no', '010-1111-1111')
      formData.append('message', 'hello')
      console.log(e.target)

      const { code } = await ProjectInquiry(formData)
      setErrorCode(code)
    } catch (error) {
      console.error('이메일 폼 전송 에러:', error)
    }
  }

  return (
    <>
      <h1>project page</h1>
      <ProjectForm
        t={t} 
        errorCode={errorCode}
        onSubmit={handleSubmit} 
      />
    </>
  )
}
