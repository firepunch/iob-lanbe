'use client'

import { loginUser } from '@/api_gql'
import { SignInForm } from '@/components'
import { useTranslation } from '@/i18n/client'
import { ValidLocale } from '@/types'
import { AUTH_TOKEN, setStorageData, generateRandomString } from '@/utils/lib'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SignIn({
  params: { lang },
}: {
  params: { lang: ValidLocale; },
}) {
  const { push } = useRouter()
  const { t } = useTranslation(lang, 'sign-in')
  const [errorCode, setErrorCode] = useState()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const tokens = await loginUser({
        username: 'test 2user',
        password: 'zhJyk$N2p0PbBr74S8Ig@)Wu',
      })

      // TODO remember ? sessionStorage : localStorage
      setStorageData(AUTH_TOKEN, tokens)

      // push(`/${lang}`)
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
