'use client'

import { loginUser } from '@/api_gql'
import { useTranslation } from '@/i18n/client'
import Link from 'next/link'
import Image from 'next/image'
import { TStringObj, ValidLocale } from '@/types'
import { AUTH_TOKEN, setStorageData, generateRandomString, isValidToken } from '@/utils/lib'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import withNoAuth from '@/hocs/withNoAuth'
import { Field } from '@/components'

import paperLogoImg from '@/imgs/paper_logo_white.png'

type ILoginForm = {
  username?: { value: string }
  password?: { value: string }
  rmb_me?: { value: boolean }
}

const SignIn = ({
  params: { lang },
}: {
  params: { lang: ValidLocale; },
}) => {
  const router = useRouter()
  const { t } = useTranslation(lang, 'sign-in')
  const [errorMessages, setErrorMessages] = useState<TStringObj>()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const target = e.currentTarget.elements as ILoginForm

    try {
      const username = target.username?.value
      const password = target.password?.value
      const isRemember = target.rmb_me?.value

      if (!username || !password) {
        setErrorMessages({
          ...!username && { username: t('email_required') },
          ...!password && { password: t('password_required') },
        })
        
        return
      }

      const userData = await loginUser({ username, password })
  
      setStorageData(AUTH_TOKEN, userData, isRemember)

      router.push(`/${lang}`)
    } catch (err) {
      console.error('login error', err)
    }
  }

  return (
    <section id="main-signin-wrap">
      <div id="signin-info">
        <h2>{t('sign_in_h2')}</h2>

        <form className="email-pw-wrap" onSubmit={handleSubmit}>
          <Field 
            isRequired
            type="email"
            name="username"
            label={t('email')}
            placeholder={t('email_placeholder')}
            errorMessage={errorMessages?.username}
          />

          <Field 
            isRequired
            type="password"
            name="password"
            label={t('password')}
            placeholder={t('password_placeholder')}
            errorMessage={errorMessages?.password}
          />

          <div className="rmb-forgot">
            <div className="rmb-checkbox">
              <label htmlFor="rmb_me">{t('remember')}</label>
              <input type="checkbox" id="rmb_me" name="rmb_me"/>
            </div>

            <a href="#">{t('forgot')}</a>
          </div>

          <button type="submit" className="signin-button">
            {t('sign_in')}
          </button>
        </form>

        <div className="noaccount-signup">
          {t('no_account')}{' '}
          <span>
            <Link href={`/${lang}/sign-up`}>
              {t('sign_up')}
            </Link>
          </span>
        </div>
      </div>

      <div id="signin-img">
        <div className="mobile-signin-title">
          <h2>{t('sign_in_h2')}</h2>
        </div>

        <Image src={paperLogoImg} alt="I.O.B logo" className="signin-logo" />
      </div>
    </section>
  )
}

export default withNoAuth(SignIn)
