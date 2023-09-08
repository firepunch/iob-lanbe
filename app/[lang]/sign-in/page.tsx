'use client'

import { loginUser } from '@/api_gql'
import { InputField } from '@/components'
import withNoAuth from '@/hocs/withNoAuth'
import { useTranslation } from '@/i18n/client'
import { TStringObj, ValidLocale } from '@/types'
import { AUTH_TOKEN, setStorageData } from '@/utils/lib'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import paperLogoImg from '@/imgs/paper_logo_white.png'
import useUserState from '@/stores/userStore'

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
  const updateUser = useUserState(state => state.updateUser)
  const [errorMessages, setErrorMessages] = useState<TStringObj>()
  const [isProcessing, setIsProcessing] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsProcessing(true)
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

      const result = await loginUser({ username, password })
  
      if ( result?.error ) {
        console.log(result?.error)
       
        if (result?.error === 'invalid_email') {
          setErrorMessages({
            username: t('email_incorrect'),
            password: '',
          })
        } else if (result?.error === 'incorrect_password') {
          setErrorMessages({
            password: t('password_incorrect'),
          })
        } else if (result?.error === 'alg_wc_ev_email_verified_error') {
          alert(t('email_verified'))
        }
      } else {
        updateUser(result?.user)
        setStorageData(AUTH_TOKEN, result, isRemember)
        router.back()
      }
    } catch (err) {
      console.error(err)
    }

    setIsProcessing(false)
  }

  return (
    <section id="main-signin-wrap">
      <div id="signin-info">
        <h2>{t('sign_in_h2')}</h2>

        <form className="email-pw-wrap" onSubmit={handleSubmit}>
          <InputField 
            isRequired
            type="email"
            name="username"
            label={t('email')}
            placeholder={t('email_placeholder')}
            errorMessage={errorMessages?.username}
            onResetError={() => (
              setErrorMessages(prev => ({
                ...prev,
                username: undefined,
              }))
            )}
          />

          <InputField 
            isRequired
            type="password"
            name="password"
            label={t('password')}
            placeholder={t('password_placeholder')}
            errorMessage={errorMessages?.password}
            onResetError={() => (
              setErrorMessages(prev => ({
                ...prev,
                password: undefined,
              }))
            )}
          />

          <div className="rmb-forgot">
            <div className="rmb-checkbox">
              <label htmlFor="rmb_me">{t('remember')}</label>
              <input type="checkbox" id="rmb_me" name="rmb_me"/>
            </div>

            <Link href={`/${lang}/sign-in/password`} className="forgot-link">
              {t('forgot')}
            </Link>
          </div>

          <button type="submit" className="signin-button" disabled={isProcessing}>
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
