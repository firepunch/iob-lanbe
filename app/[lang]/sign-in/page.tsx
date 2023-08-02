'use client'

import { SignInForm } from '@/components'
import { useTranslation } from '@/i18n/client'
import { ValidLocale } from '@/types'
import { login } from '@/api_wp'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SignIn({
  params: { lang },
}: {
  params: { lang: ValidLocale; },
}) {
  const { push } = useRouter()
  const [errorCode, setErrorCode] = useState()
  const { t } = useTranslation(lang, 'sign-in')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const { status, code } = await login({
        id: 'test user',
      })

      if (status === 200) {
        push(`/${lang}`)
      } else {
        setErrorCode(code)
      }
    } catch (err) {
      console.error('login error', err)
    }
  }

  return (
    <SignInForm 
      t={t} 
      errorCode={errorCode}
      onSubmit={handleSubmit} 
    />
  )
}
