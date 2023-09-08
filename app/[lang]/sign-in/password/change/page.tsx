'use client'

import { updatePassword } from '@/api_wp'
import { InputField } from '@/components'
import withNoAuth from '@/hocs/withNoAuth'
import { useTranslation } from '@/i18n/client'
import { TStringObj, ValidLocale } from '@/types'
import Link from 'next/link'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

const SignInPasswordChange = ({
  params: { lang },
}: {
  params: { lang: ValidLocale; },
}) => {
  const params = useSearchParams()
  const { t } = useTranslation(lang, 'password')
  const [message, setMessage] = useState<TStringObj>()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const formData = new FormData(e.currentTarget)
    const formProps = Object.fromEntries(formData) as TStringObj
    const regex = /(?=.*?[a-z])(?=.*?[0-9])(?=.*?[$-/:-?{-~!"^_`\[\]]).{8}/gi
    const pwFound = (formProps?.newPassword as string)?.match(regex)

    if (!formProps?.newPassword) {
      setMessage({ error: t('password_required') })
      return
    }

    if (!pwFound) {
      setMessage({ error: t('password_rule_error') })
      return
    } 

    const result = await updatePassword({
      ...formProps,
      key: params.get('key'),
      email: params.get('email'),
    })
    setMessage({ info: t(result?.message) })
  }

  return (
    <section id="main-signin-wrap" className="password-wrap">
      <div id="signin-info">
        <h2>{t('h2_change')}</h2>

        <form className="email-pw-wrap" onSubmit={handleSubmit}>
          <InputField
            readOnly
            type="email"
            name="email"
            defaultValue={params.get('email') || ''}
            label={t('email')}
          />

          <InputField
            isRequired
            className="pw-field"
            type="password"
            name="newPassword"
            label={t('newPassword')}
            placeholder={t('password_required')}
            description={t('password_rule')}
            errorMessage={message?.error}
            onResetError={() => (
              setMessage({ error: undefined })
            )}
          />
          <button type="submit" className="signin-button">
            {t('update_password')}
          </button>
          <p className="info">
            {message?.info || ''}
          </p>

          <Link href={`/${lang}/sign-in`} className="back_link">
            {t('to_login')}
          </Link>
        </form>
      </div>

    </section>
  )
}

export default withNoAuth(SignInPasswordChange)
