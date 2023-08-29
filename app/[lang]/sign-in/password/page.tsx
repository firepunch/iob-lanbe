'use client'

import { sendPWLink } from '@/api_wp'
import { useState } from 'react'
import { InputField } from '@/components'
import { TStringObj, ValidLocale } from '@/types'
import withNoAuth from '@/hocs/withNoAuth'
import { useTranslation } from '@/i18n/client'
import Link from 'next/link'

const SignInPassword = ({
  lang,
}: {
  lang: ValidLocale
}) => {
  const { t } = useTranslation(lang, 'password')
  const [message, setMessage] = useState<TStringObj>()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const formData = new FormData(e.currentTarget)
    const formProps = Object.fromEntries(formData) as TStringObj
    
    if (!formProps?.email) {
      setMessage({ error: t('email_require') })
      return
    }

    const result = await sendPWLink(formProps.email)
    setMessage({ info: t(result) })
  }

  return (
    <section id="main-signin-wrap" className="password-wrap">
      <div id="signin-info">
        <h2>{t('h2')}</h2>

        <form className="email-pw-wrap" onSubmit={handleSubmit}>
          <p>{t('desc')}</p>

          <InputField
            isRequired
            type="email"
            name="email"
            label={t('email')}
            placeholder={t('email_placeholder')}
            errorMessage={message?.error}
            onResetError={() => (
              setMessage({ error: undefined })
            )}
          />
          <button type="submit" className="signin-button">
            {t('send')}
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

export default withNoAuth(SignInPassword)
