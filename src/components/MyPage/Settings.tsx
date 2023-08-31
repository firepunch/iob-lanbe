'use client'
 
import { fetchUser, updateWPUser } from '@/api_wp'
import useUserState from '@/stores/userStore'
import { TI18N, TStringObj } from '@/types'
import { useEffect, useState } from 'react'
import InputField from '../InputField'
import SelectField from '../SelectField'

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

    const formData = new FormData(e.currentTarget)
    const formProps = Object.fromEntries(formData) as TStringObj
    const regex = /(?=.*?[a-z])(?=.*?[0-9])(?=.*?[$-/:-?{-~!"^_`\[\]]).{8}/gi
    const pwFound = (formProps?.newPassword as string)?.match(regex)

    if (!pwFound) {
      setErrorMessages(prev => ({
        ...prev,
        password: t('password_rule_error'),
      }))
      return
    }

    if (formProps?.userFunction === 'Default') {
      setErrorMessages(prev => ({
        ...prev,
        userFunction: t('function_required'),
      }))
      return
    }

    if (formProps?.country === 'Default') {
      setErrorMessages(prev => ({
        ...prev,
        country: t('country_required'),
      }))
      return
    }

    try {
      await updateWPUser({
        ...formProps,
        user_id: userId,
        username: formProps.email,
      })
      alert('수정 성공')
      // TODO Update user
    } catch (err) {
      console.error(err)
      alert('수정 실패')
    }
  }

  return (
    <>
      <div id="default-title" className="dt-no-buttons">
        <h2>{t('settings').toUpperCase()}</h2>
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
                  defaultValue={userInfo?.display_name?.split(' ')[0]}
                  errorMessage={errorMessages?.firstName}
                />
            
                <InputField
                  isRequired
                  name="lastName"
                  label={t('last_name')}
                  defaultValue={userInfo?.display_name?.split(' ')[1]}
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
                  readOnly
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
              <input type="checkbox" id="newsletter" name="newsletterChk" defaultChecked={userInfo?.newsletterChk === 'yes' ? true : false} />
              <label htmlFor="newsletter">
                {t('newsletter')}
              </label>
            </div>

            <div className="marketing-checkbox">
              <input type="checkbox" id="marketing" name="marketingChk" defaultChecked={userInfo?.marketingChk === 'yes' ? true : false} />
              <label htmlFor="marketing">
                {t('marketing')}  
              </label>
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