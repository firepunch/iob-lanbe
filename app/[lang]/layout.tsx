'use client'

import { Footer, Header } from '@/components'
import { getTranslation } from '@/i18n/index'
import { useTranslation } from '@/i18n/client'
import { ValidLocale, languages } from '@/i18n/settings'
import { sendEmailForm } from '@/api_wp'
import { useState } from 'react'
import { EmailForm } from '@/components'

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }))
}

const NO_HEADER_MAP = [
  'sign-in',
]

export default function LocaleLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode,
  params: { lang: ValidLocale }
}) {
  const { t: ct } = useTranslation(lang, 'category-page')
  const { t } = useTranslation(lang, 'layout')
  // const [errorCode, setErrorCode] = useState()

  const handleSubmit = async (email: string) => {
    try {
      const formData = new FormData()
      formData.append('user-email', 'ex@gmail.com')
      const { code } = await sendEmailForm(formData)
      // setErrorCode(code)
      alert('이메일 폼 전송에 성공했습니다!')
    } catch (error) {
      console.error('이메일 폼 전송 에러:', error)
    }
  }

  return (
    <html lang={lang}>
      <head />
      <body>
        <Header lang={lang} ct={ct} t={t} />
        <main>
          {children}
        </main>
        <Footer lang={lang} t={t} />
        {/* <EmailForm 
          t={t}
          errorCode={errorCode}
          onSubmit={handleSubmit} 
        /> */}
      </body>
    </html>
  )
}
