'use client'

import { SignInForm } from '@/components'
import { useTranslation } from '@/i18n/client'
import { ValidLocale } from '@/types'
import { login } from '@/api_wp'
import { useState } from 'react'

export default function SignIn({
  params: { lang },
}: {
  params: { lang: ValidLocale; },
}) {
  const [errorCode, setErrorCode] = useState()
  const { t } = useTranslation(lang, 'sign-in')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const { code } = await login({
        id: 'asdf',
        password: '1234',
      })

      setErrorCode(code)
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
