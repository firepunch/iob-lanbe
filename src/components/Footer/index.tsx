import Link from 'next/link'
import { ValidLocale } from '@/i18n/settings'
import { useTranslation } from '@/i18n/client'
import { EmailForm } from '@/components'
import { IEmailForm } from '@/types/api'
import { sendEmailForm } from 'src/api_wp'
import { useState } from 'react'
import { TI18N } from '@/types'

export default function Footer({
  t,
  lang,
}: {
  t: TI18N
  lang: ValidLocale
}) {

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData: IEmailForm = {
      email: 'example@gmail.com',
    }

    try {
      const response = await sendEmailForm(formData)
      console.log('서버 응답:', response)
      alert('이메일 폼 전송에 성공했습니다!')
    } catch (error) {
      console.error('이메일 폼 전송 에러:', error.message)
      alert('이메일 폼 전송에 실패했습니다.')
    }
  }

  return (
    <footer>
      Footer
      <Link href="/">
        <h1>
          IOB
        </h1>
      </Link>
      <EmailForm 
        t={t}
        onSubmit={handleSubmit}
      />

      <nav>
        <Link href={`/${lang}/content`}>
          {t('content')}
        </Link>
        <Link href={`/${lang}/report`}>
          {t('report')}
        </Link>
        <Link href={`https://www.linkedin.com/`}>
          {t('linkedin')}
        </Link>
        <Link href={`/${lang}/privacy-policy`}>
          {t('privacy-policy')}
        </Link>
        <Link href={`/${lang}/terms-conditions`}>
          {t('terms-conditions')}
        </Link>
        <Link href={`/${lang}/cookie-policy`}>
          {t('cookie-policy')}
        </Link>
      </nav>
    </footer>
  )
}
