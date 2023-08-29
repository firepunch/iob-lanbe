'use client'
 
import { TI18N, TStringObj } from '@/types'
import { useEffect, useState } from 'react'
import InputField from '../InputField'
import SelectField from '../SelectField'
import { fetchUser, updateUser, updateWPUser } from '@/api_wp'
import useUserState from '@/stores/userStore'

export default function Settings({
  t,
  ct,
  userId,
}: {
  t: TI18N
  ct: TI18N
  userId: number
}) {
  const { userInfo, updateUserInfo } = useUserState(state => state)
  const [errorMessages, setErrorMessages] = useState<TStringObj>()

  useEffect(() => {
    if (userId) {
      fetchUser(userId).then(result => (
        updateUserInfo(result.data.user_data)
      ))
    }
  }, [])

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

    try {
      await updateWPUser({
        ...formProps,
        user_id: userId,
        username: formProps.email,
      })
      alert('수정 성공')
    } catch (err) {
      console.error(err)
      alert('수정 실패')
    }
  }

  return (
    <>
      <div id="default-title" className="dt-no-buttons">
        <h2>{t('settings_en').toUpperCase()}</h2>
      </div>
    
      <form onSubmit={handleSubmit}>
        <div id="settings-wrap">
          <div className="personal-info">
            <h3>{t('personal_info')}</h3>

            <div className="personal-info-inputs-wrap">
              {/* row1 */}
              <div className="personal-info-inputs-row">
                <InputField
                  isRequired
                  name="firstName"
                  label={t('first_name')}
                  defaultValue={userInfo?.display_name.split(' ')[0]}
                  errorMessage={errorMessages?.firstName}
                />
            
                <InputField
                  isRequired
                  name="lastName"
                  label={t('last_name')}
                  defaultValue={userInfo?.display_name.split(' ')[1]}
                  errorMessage={errorMessages?.lastName}
                />
              </div>

              {/* row2 */}
              <div className="personal-info-inputs-row">
                <InputField
                  isRequired
                  name="organization"
                  label={t('org')}
                  placeholder={t('org_placeholder')}
                  defaultValue={userInfo?.organization}
                  errorMessage={errorMessages?.organization}
                />

                <InputField
                  isRequired
                  name="jobTitle"
                  label={t('jobtitle')}
                  placeholder={t('jobtitle_placeholder')}
                  defaultValue={userInfo?.jobTitle}
                  errorMessage={errorMessages?.jobTitle}
                />
              </div>

              {/* row 3 */}
              <div className="personal-info-inputs-row">
                <SelectField 
                  isRequired
                  className="sortby-country"
                  name="country"
                  label={t('country')}
                  placeholder={t('country_placeholder')}
                  options={ct('country_options', { returnObjects: true })}
                  defaultValue={userInfo?.country}
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
                  defaultValue={userInfo?.userFunction}
                  errorMessage={errorMessages?.userFunction}
                  onResetError={() => (
                    setErrorMessages(prev => ({
                      ...prev,
                      userFunction: undefined,
                    }))
                  )}
                />
              </div>
            </div>
          </div>

          <div id="account-info">
            <h3>{t('account_info')}</h3>

            <div className="account-info-inputs-wrap">

              {/* row1 */}
              <div className="account-info-inputs-row">
                <InputField
                  isRequired
                  type="email"
                  name="email"
                  label={t('email')}
                  placeholder={t('email_placeholder')}
                  defaultValue={userInfo?.user_email}
                  errorMessage={errorMessages?.email}
                />
                                
                <InputField
                  type="email"
                  name="newEmail"
                  label={t('new_email')}
                  placeholder={t('new_email_placeholder')}
                  errorMessage={errorMessages?.newEmail}
                />
              </div>

              {/* row2 */}
              <div className="account-info-inputs-row">
                <InputField
                  isRequired
                  className="pw-field"
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

                <InputField
                  className="pw-field"
                  type="password"
                  name="newPassword"
                  label={t('new_password')}
                  placeholder={t('password_placeholder')}
                  description={t('password_rule')}
                  errorMessage={errorMessages?.newPassword}
                  onResetError={() => (
                    setErrorMessages(prev => ({
                      ...prev,
                      password: undefined,
                    }))
                  )}
                />
              </div>
                    
            </div>
          </div>

          <div id="email-notif">
            <h3>{t('email-notify')}</h3>

            <div className="newsletter-checkbox">
              <input type="checkbox" id="newsletter" name="newsletter" defaultChecked={userInfo?.newsletterChk === 'yes' ? true : false} />
              <p>
                {t('newsletter')}
              </p>
            </div>

            <div className="marketing-checkbox">
              <input type="checkbox" id="marketing" name="marketing" defaultChecked={userInfo?.marketingChk === 'yes' ? true : false} />
              <p>
                {t('marketing')}  
              </p>
            </div>
          </div>

          <div className="save-button">
            <button type="submit">{t('save')}</button>
          </div>
                    
        </div>
      </form>
    </>
  )
}