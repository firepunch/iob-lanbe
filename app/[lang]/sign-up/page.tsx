'use client'

import { getTranslation } from '@/i18n'
import { ValidLocale } from '@/types'
import { AUTH_TOKEN, setStorageData, generateRandomString } from '@/utils/lib'
import { useTranslation } from '@/i18n/client'
import { Select } from '@/components'
import { createUser } from '@/api_wp'

export default function SignUp({
  params: { lang },
}: {
  params: { lang: ValidLocale; },
}) {
  const { t: ct } = useTranslation(lang, 'common')
  const { t } = useTranslation(lang, 'sign-up')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()

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
    <>
      <section id="signup-wrap">
        <h2>{t('sign_up_h2')}</h2>

        <form onSubmit={handleSubmit}>
          <div id="signup-inputs-wrap">
            {/* row1 */}
            <div className="signup-inputs-row">
              <div className="field">
                <label htmlFor="firstname">*{t('first_name')}</label>
                <input type="text" id="firstname" name="firstname"/>
              </div>

              <div className="field">
                <label htmlFor="lastname">*{t('last_name')}</label>
                <input type="text" id="lastname" name="lastname"/>
              </div>
            </div>

            {/* row2 */}
            <div className="signup-inputs-row">
              <div className="field">
                <label htmlFor="org">*{t('org')}</label>
                <input type="text" id="org" name="org" placeholder={t('org_placeholder')} />
              </div>

              <div className="field">
                <label htmlFor="jobtitle">*{t('jobtitle')}</label>
                <input type="text" id="jobtitle" name="jobtitle" placeholder={t('jobtitle_placeholder')} />
              </div>
            </div>

            {/* row3 */}
            <div className="signup-inputs-row">
              <div className="sortby-country">
                <label htmlFor="country">*{t('country')}</label>
                <Select 
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
                  name="function" 
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
                <input type="email" id="username" name="username" placeholder={t('email_placeholder')} />
              </div>

              <div className="field pw-field">
                <label htmlFor="password">*{t('password')}</label>
                <input type="password" id="password" name="password" placeholder={t('password_placeholder')} />
                <p>{t('password_rule')}</p>
              </div>
            </div>
          </div>

          <div id="signup-checkboxes">
            <div className="newsletter-checkbox">
              <input type="checkbox" id="newsletter" name="newsletter" />
              <label htmlFor="newsletter">{t('newsletter')}</label>
            </div>

            <div className="marketing-checkbox">
              <input type="checkbox" id="marketing" name="marketing" />
              <label htmlFor="marketing">{t('marketing')}</label>
            </div>

            <div className="required-checkbox">
              <input type="checkbox" id="privacy" name="privacy" defaultChecked />
              <label htmlFor="privacy">{t('privacy')}</label>
            </div>

            <div className="required-checkbox">
              <input type="checkbox" id="terms" name="terms" defaultChecked />
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
