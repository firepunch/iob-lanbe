'use client'

import { SignUpForm } from '@/components'
import { getTranslation } from '@/i18n'
import { ValidLocale } from '@/types'
import { AUTH_TOKEN, setStorageData, generateRandomString } from '@/utils/lib'
import { useTranslation } from '@/i18n/client'
import { createUser } from '@/api_wp'

export default function SignUp({
  params: { lang },
}: {
  params: { lang: ValidLocale; },
}) {
  const { t } = useTranslation(lang, 'sign-up')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const { clientMutationId, user } = await createUser({
        clientMutationId: generateRandomString(),
        username: 'test 2user',
        email: 'email@email.com',
        password: 'zhJyk$N2p0PbBr74S8Ig@)Wu',
      })

      setStorageData(AUTH_TOKEN, {
        clientMutationId,
        authToken: user.jwtAuthToken,
        refreshToken: user.jwtRefreshToken,
      })
    } catch (err) {
      console.error('login error', err)
    }
  }

  return (
    <SignUpForm
      t={t} 
      onSubmit={handleSubmit} 
    />
  )
}
