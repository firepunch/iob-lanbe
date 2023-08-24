'use client'
 
import { TI18N, TStringObj } from '@/types'
import { useState } from 'react'
import InputField from '../InputField'
import SelectField from '../SelectField'

export default function Settings({
  t,
  ct,
}: {
  t: TI18N
  ct: TI18N
}) {
  const [errorMessages, setErrorMessages] = useState<TStringObj>()
  const handleSubmit = () => {

  }

  return (
    <section id="default-content">
    
      <div id="default-title" className="dt-no-buttons">
        <h2>SETTINGS</h2>
      </div>
    
      <form onSubmit={handleSubmit}>
        <div id="settings-wrap">
          <div className="personal-info">
            <h3>Personal Information</h3>

            <div className="personal-info-inputs-wrap">
              {/* row1 */}
              <div className="personal-info-inputs-row">
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
                  errorMessage={errorMessages?.firstName}
                />
              </div>

              {/* row2 */}
              <div className="personal-info-inputs-row">
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
                  errorMessage={errorMessages?.organization}
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
            </div>
          </div>

          <div id="account-info">
            <h3>Account Information</h3>

            <div className="account-info-inputs-wrap">

              {/* row1 */}
              <div className="account-info-inputs-row">
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
                  isRequired
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
            <h3>Email notifications</h3>

            <div className="newsletter-checkbox">
              <input type="checkbox" id="newsletter" name="newsletter" defaultChecked />
              <p>
                                I would like to subscribe to I.O.B’s newsletter.
              </p>
            </div>

            <div className="marketing-checkbox">
              <input type="checkbox" id="marketing" name="marketing" defaultChecked />
              <p>
                                I would like to receive marketing emails and offers.
              </p>
            </div>
          </div>

          <div className="save-button">
            <button type="submit">Save</button>
          </div>
                    
        </div>
      </form>
    
    </section>
  )
}