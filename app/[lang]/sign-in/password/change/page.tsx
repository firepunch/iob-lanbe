'use client'

import { updatePassword } from '@/api_wp'
import { InputField } from '@/components'
import withNoAuth from '@/hocs/withNoAuth'
import { useTranslation } from '@/i18n/client'
import { TStringObj, ValidLocale } from '@/types'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'

const SignInPasswordChange = ({
  lang,
}: {
  lang: ValidLocale
}) => {
  const params = useParams()
  const { t } = useTranslation(lang, 'password')
  const [message, setMessage] = useState<TStringObj>()

  console.log(params)

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
      key: params.key,
      email: params.login,
    })
    setMessage({ info: t(result) })
  }

  return (
    <section id="main-signin-wrap" className="password-wrap">
      <div id="signin-info">
        <h2>{t('h2_change')}</h2>

        <form className="email-pw-wrap" onSubmit={handleSubmit}>
          {params.login && (
            <p>{params.login}</p>
          )}

          <InputField
            isRequired
            type="password"
            name="newPassword"
            label={t('newPassword')}
            placeholder={t('password_required')}
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
