'use client'

import { SignInForm } from '@/components'
import { useTranslation } from '@/i18n/client'
import { ValidLocale } from '@/types'
import { loginUser } from '@/api_gql'
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
      const { authToken, refreshToken, sessionToken } = await loginUser({
        username: 'test user',
        password: 'zhJyk$N2p0PbBr74S8Ig@)Wu',
      })

      push(`/${lang}`)
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
