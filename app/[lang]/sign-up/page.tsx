'use client'

import { loginUser } from '@/api_gql'
import { createUser } from '@/api_wp'
import { Select } from '@/components'
import withNoAuth from '@/hocs/withNoAuth'
import { useTranslation } from '@/i18n/client'
import { TStringObj, ValidLocale } from '@/types'
import { useRouter } from 'next/navigation'
import { AUTH_TOKEN, generateRandomString, setStorageData } from '@/utils/lib'
import { useState } from 'react'

type ISignUpForm = {
  firstName?: { value: string }
  lastName?: { value: string }
  organization?: { value: string }
  jobTitle?: { value: string }
  country?: { value: string }
  userFunction?: { value: string }
  email?: { value: string }
  password?: { value: string }
  newsletterChk?: { value: boolean }
  marketingChk?: { value: boolean }
  privacyChk?: { value: boolean }
  termsChk?: { value: boolean }
}

const SignUp = ({
  params: { lang },
}: {
  params: { lang: ValidLocale; },
}) => {
  const { replace } = useRouter()
  const { t: ct } = useTranslation(lang, 'common')
  const { t } = useTranslation(lang, 'sign-up')
  const [errorMessages, setErrorMessages] = useState<TStringObj>()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()

    const formData = new FormData(e.currentTarget)
    const formProps = Object.fromEntries(formData)

    const regex = /(?=.*?[a-z])(?=.*?[0-9])(?=.*?[$-/:-?{-~!"^_`\[\]]).{8}/gi
    const pwFound = (formProps?.password as string)?.match(regex)

    if (!pwFound) {
      setErrorMessages({
        password: t('password_rule_error'),
      })
      
      return
    }

    try {
      await createUser({
        ...formProps,
        username: formProps.email,
      })
      const loginData = await loginUser({
        username: formProps.email as string,
        password: formProps.password as string,
      })

      setStorageData(AUTH_TOKEN, loginData)

      replace('/')
    } catch (err) {
      console.error('login error', err)
    }
  }

  return (
    <>
      <section id="signup-wrap">
        <h2>{t('sign_up_h2')}</h2>

        <form onSubmit={handleSubmit}>
          <div id="signup-inputs-wrap">
            {/* row1 */}
            <div className="signup-inputs-row">
              <div className="field">
                <label htmlFor="firstname">*{t('first_name')}</label>
                <input required type="text" id="firstname" name="firstName"/>
              </div>

              <div className="field">
                <label htmlFor="lastname">*{t('last_name')}</label>
                <input required type="text" id="lastname" name="lastName"/>
              </div>
            </div>

            {/* row2 */}
            <div className="signup-inputs-row">
              <div className="field">
                <label htmlFor="org">*{t('org')}</label>
                <input required type="text" id="org" name="organization" placeholder={t('org_placeholder')} />
              </div>

              <div className="field">
                <label htmlFor="jobtitle">*{t('jobtitle')}</label>
                <input required type="text" id="jobtitle" name="jobTitle" placeholder={t('jobtitle_placeholder')} />
              </div>
            </div>

            {/* row3 */}
            <div className="signup-inputs-row">
              <div className="sortby-country">
                <label htmlFor="country">*{t('country')}</label>
                <Select 
                  isRequired
                  name="country" 
                  id="country"
                  defaultOption={{
                    value: 'Default',
                    label: t('country_placeholder'),
                  }}
                  options={ct('country_options', { returnObjects: true }) }
                />
              </div>

              <div className="sortby-function">
                <label htmlFor="function">*{t('function')}</label>
                <Select 
                  isRequired
                  name="userFunction" 
                  id="function"
                  defaultOption={{
                    value: 'Default',
                    label: t('function_placeholder'),
                  }}
                  options={ct('function_options', { returnObjects: true }) }
                />
              </div>
            </div>

            {/* row4 */}
            <div className="signup-inputs-row">
              <div className="field">
                <label htmlFor="username">*{t('email')}</label>
                <input required type="email" id="username" name="email" placeholder={t('email_placeholder')} />
              </div>

              <div className={`${errorMessages?.password && 'error-field'} field pw-field`}>
                <label htmlFor="password">*{t('password')}</label>
                <input 
                  required 
                  type={errorMessages?.password ? 'text' : 'password'}
                  id="password" 
                  name="password"
                  placeholder={t('password_placeholder')}
                  value={errorMessages?.password}
                />
                <p>{t('password_rule')}</p>
              </div>
            </div>
          </div>

          <div id="signup-checkboxes">
            <div className="newsletter-checkbox">
              <input type="checkbox" id="newsletter" name="newsletterChk" />
              <label htmlFor="newsletter">{t('newsletter')}</label>
            </div>

            <div className="marketing-checkbox">
              <input type="checkbox" id="marketing" name="marketingChk" />
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
          {/* //recaptcha */}

          <button type="submit" className="signup-button">
            {t('sign_up')}
          </button>
        </form>
      </section>
    </>
  )
}

export default withNoAuth(SignUp)
