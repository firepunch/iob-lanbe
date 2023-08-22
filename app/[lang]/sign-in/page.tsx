'use client'

import { loginUser } from '@/api_gql'
import { useTranslation } from '@/i18n/client'
import Link from 'next/link'
import Image from 'next/image'
import { ValidLocale } from '@/types'
import { AUTH_TOKEN, setStorageData, generateRandomString, isValidToken } from '@/utils/lib'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import paperLogoImg from '@/imgs/paper_logo_white.png'
import mainImg from '@/imgs/signin_main.jpg'

type ILoginForm = {
  username?: { value: string }
  password?: { value: string }
  rmb_me?: { value: boolean }
}

export default function SignIn({
  params: { lang },
}: {
  params: { lang: ValidLocale; },
}) {
  const router = useRouter()
  const { t } = useTranslation(lang, 'sign-in')
  const [errorMessages, setErrorMessages] = useState<{username?: string; password?: string}>({})

  useEffect(() => {
    const isValid = isValidToken()
    if (isValid) router.back()
  }, [])

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
          ...!password && { password: t('password_requried') },
        })
        
        return
      }

      const userData = await loginUser({ username, password })
  
      setStorageData(AUTH_TOKEN, userData, isRemember)

      push(`/${lang}`)
    } catch (err) {
      console.error('login error', err)
    }
  }

  return (
    <section id="main-signin-wrap">
      <div id="signin-info">
        <h2>{t('sign_in_h2')}</h2>

        <form className="email-pw-wrap" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="username">{t('email')}</label>
            <input 
              required
              type="email"
              id="username"
              name="username"
              defaultValue="email@email.com"
              placeholder={errorMessages.username || t('email_placeholder')} 
            />
          </div>

          <div className="field">
            <label htmlFor="password">{t('password')}</label>
            <input 
              required
              type="password"
              id="password"
              name="password"
              defaultValue="zhJyk$N2p0PbBr74S8Ig@)Wu"
              placeholder={errorMessages.password || t('password_placeholder')} 
            />
          </div>

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

      <div id="signin-wrapper">
        <Image src={mainImg} alt="Login Background" className="signin-img" />
        
        <div className="mobile-signin-title">
          <h2>{t('sign_in_h2')}</h2>
        </div>

        <Image src={paperLogoImg} alt="I.O.B logo" className="signin-logo" />
      </div>
    </section>
  )
}
