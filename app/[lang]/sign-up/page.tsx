'use client'

import { loginUser } from '@/api_gql'
import { createUser } from '@/api_wp'
import { InputField, SelectField, Spinner } from '@/components'
import withNoAuth from '@/hocs/withNoAuth'
import { useTranslation } from '@/i18n/client'
import { TStringObj, ValidLocale } from '@/types'
import { AUTH_TOKEN, setStorageData } from '@/utils/lib'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import React from 'react'
import useUserState, { INIT_USER_STATE } from '@/stores/userStore'
import useStore from '@/hooks/useStore'

const SignUp = ({
  params: { lang },
}: {
  params: { lang: ValidLocale; },
}) => {
  const { replace } = useRouter()
  const { t: ct } = useTranslation(lang, 'common')
  const { t } = useTranslation(lang, 'sign-up')
  const { user, updateUser } = useStore(useUserState, state => state, INIT_USER_STATE)
  const [isProcess, setIsProcess] = useState<boolean>(false)
  const [errorMessages, setErrorMessages] = useState<TStringObj>()
  const recaptchaRef = React.useRef<any>()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()

    let isValid = true
    const formData = new FormData(e.currentTarget)
    const formProps = Object.fromEntries(formData) as TStringObj
    const regex = /(?=.*?[a-z])(?=.*?[0-9])(?=.*?[$-/:-?{-~!"^_`\[\]]).{8}/gi
    const pwFound = (formProps?.password as string)?.match(regex)

    if (!pwFound) {
      isValid = false
      setErrorMessages(prev => ({
        ...prev,
        password: t('password_rule_error'),
      }))
    }

    if (formProps?.userFunction === 'Default') {
      isValid = false
      setErrorMessages(prev => ({
        ...prev,
        userFunction: t('function_required'),
      }))
    }

    if (formProps?.country === 'Default') {
      isValid = false
      setErrorMessages(prev => ({
        ...prev,
        country: t('country_required'),
      }))
    }

    if (!isValid) {
      return
    }

    setIsProcess(true)

    try {
      recaptchaRef?.current?.execute()

      const result = await createUser({
        ...formProps,
        username: formProps.email,
      })

      if (result?.status !== 200 && result?.message) {
        setIsProcess(false)
        setErrorMessages({
          common: t(result.message),
        })
        return
      }

      // const loginData = await loginUser({
      //   username: formProps.email as string,
      //   password: formProps.password as string,
      // })

      // updateUser(loginData?.user)
      // setStorageData(AUTH_TOKEN, loginData)
      replace(`/${lang}/welcome`)
    } catch (err) {
      console.error(err)
    }

    setIsProcess(false)
  }

  const onReCAPTCHAChange = (captchaCode) => {
    if (!captchaCode) {
      return
    }
    recaptchaRef?.current?.reset()
  }

  if (user?.databaseId) {
    replace('/')
  }

  return (
    <>
      <section id="signup-wrap">
        <h2>{t('sign_up_h2')}</h2>

        <form onSubmit={handleSubmit}>
          <div id="signup-inputs-wrap">
            {/* row1 */}
            <div className="signup-inputs-row">
              <InputField
                isRequired
                name="firstName"
                label={t('first_name')}
                errorMessage={errorMessages?.firstName}
              />

              <InputField
                isRequired
                name="lastName"
                label={t('last_name')}
                errorMessage={errorMessages?.lastName}
              />
            </div>

            {/* row2 */}
            <div className="signup-inputs-row">
              <InputField
                isRequired
                name="organization"
                label={t('org')}
                placeholder={t('org_placeholder')}
                errorMessage={errorMessages?.organization}
              />

              <InputField
                isRequired
                name="jobTitle"
                label={t('jobtitle')}
                placeholder={t('jobtitle_placeholder')}
                errorMessage={errorMessages?.jobTitle}
              />
            </div>

            {/* row3 */}
            <div className="signup-inputs-row">
              <SelectField 
                isRequired
                className="sortby-country"
                name="country"
                label={t('country')}
                placeholder={t('country_placeholder')}
                options={ct('country_options', { returnObjects: true })}
                errorMessage={errorMessages?.country}
                onResetError={() => (
                  setErrorMessages(prev => ({
                    ...prev,
                    country: undefined,
                  }))
                )}
              />

              <SelectField 
                isRequired
                className="sortby-function"
                name="userFunction"
                label={t('function')}
                placeholder={t('function_placeholder')}
                options={ct('function_options', { returnObjects: true }) }
                errorMessage={errorMessages?.userFunction}
                onResetError={() => (
                  setErrorMessages(prev => ({
                    ...prev,
                    userFunction: undefined,
                  }))
                )}
              />
            </div>

            {/* row4 */}
            <div className="signup-inputs-row">
              <InputField
                isRequired
                type="email"
                name="email"
                label={t('email')}
                placeholder={t('email_placeholder')}
                errorMessage={errorMessages?.email}
              />

              <InputField
                isRequired
                className="pw-field"
                type="password"
                name="password"
                label={t('password')}
                placeholder={t('password_placeholder')}
                description={t('password_rule')}
                errorMessage={errorMessages?.password}
                onResetError={() => (
                  setErrorMessages(prev => ({
                    ...prev,
                    password: undefined,
                  }))
                )}
              />
            </div>
          </div>

          <div id="signup-checkboxes">
            <div className="newsletter-checkbox">
              <input type="checkbox" id="newsletter" name="newsletterChk" defaultChecked />
              <label htmlFor="newsletter">{t('newsletter')}</label>
            </div>

            <div className="marketing-checkbox">
              <input type="checkbox" id="marketing" name="marketingChk" defaultChecked />
              <label htmlFor="marketing">{t('marketing')}</label>
            </div>

            <div className="required-checkbox">
              <input required type="checkbox" id="privacy" name="privacyChk" defaultChecked />
              <label htmlFor="privacy">{t('privacy')}</label>
            </div>

            <div className="required-checkbox">
              <input required type="checkbox" id="terms" name="termsChk" defaultChecked />
              <label htmlFor="terms">{t('terms')}</label>
            </div>
          </div>

          {/* recaptcha */}
          <ReCAPTCHA
	          ref={recaptchaRef}
	          size="invisible"
	          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            onChange={onReCAPTCHAChange}
          />

          <p>{errorMessages?.common}</p>
          <button type="submit" className="signup-button" disabled={isProcess}>
            <Spinner loading={isProcess} />
            {t('sign_up')}
          </button>
        </form>
      </section>
    </>
  )
}

export default SignUp
