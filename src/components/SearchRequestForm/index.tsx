'use client'

import { TI18N } from '@/types'

interface SearchRequestProps {
  t: TI18N;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function SearchRequestForm ({
  t,
  onSubmit,
}: SearchRequestProps) {

  return (
    <>
      <div className="sum-title">
        <h3>{t('looking_for')}</h3>
      </div>

      <form onSubmit={onSubmit}>
        <div id="send-us-message-wrap">
          <div className="sum-row">
            <div className="field">
              <label htmlFor="firstname">{t('first_name')}</label>
              <input required type="text" id="firstname" name="first-name" />
            </div>

            <div className="field">
              <label htmlFor="lastname">{t('last_name')}</label>
              <input required type="text" id="lastname" name="last-name" />
            </div>
          </div>

          <div className="sum-row">
            <div className="field">
              <label htmlFor="email">{t('email')}</label>
              <input required type="email" id="email" name="user-email" placeholder={t('email_placeholder')} />
            </div>
          </div>

          <div className="sum-message-us">
            <div className="field">
              <label htmlFor="message">{t('message')}</label>
              <textarea required id="message" name="message" placeholder={t('message_placeholder')} />
            </div>
          </div>

          <button type="submit">{t('send')}</button>
        </div>
      </form>
    </>
  )
}
