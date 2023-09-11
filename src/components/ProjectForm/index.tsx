'use client'

import { TI18N } from '@/types'

interface ProjectFormProps {
  t: TI18N;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children?: React.ReactNode;
}

export default function ProjectForm ({
  t,
  onSubmit,
  children,
}: ProjectFormProps) {

  return (
    <section id="project-inquiry-form">
      <h2>{t('project')}{t('inquiry')}</h2>

      <form onSubmit={onSubmit}>
        <div id="pi-form-wrap">
          {/* row1 */}
          <div className="pi-inputs-row">
            <div className="field">
              <label htmlFor="firstname">{t('first-name')}</label>
              <input required type="text" id="firstname" name="firstname" />
            </div>

            <div className="field">
              <label htmlFor="lastname">{t('last-name')}</label>
              <input required type="text" id="lastname" name="lastname" />
            </div>
          </div>

          {/* row2 */}
          <div className="pi-inputs-row">
            <div className="field">
              <label htmlFor="org">{t('organization')}</label>
              <input required type="text" id="org" name="org" placeholder={t('organization-placeholder')} />
            </div>

            <div className="field">
              <label htmlFor="jobtitle">{t('job-title')}</label>
              <input required type="text" id="jobtitle" name="jobtitle" placeholder={t('job-placeholder')} />
            </div>
          </div>

          {/* row3 */}
          <div className="pi-inputs-row">
            <div className="field">
              <label htmlFor="email">{t('email')}</label>
              <input required type="email" id="email" name="email" placeholder={t('email-placeholder')} />
            </div>

            <div className="field">
              <label htmlFor="contact">{t('contact')}</label>
              <input required type="phone" id="contact" name="contact" placeholder={t('contact-placeholder')} />
            </div>
          </div>

          {/* row4: message */}
          <div className="message-us">
            <div className="field">
              <label htmlFor="message">{t('message')}</label>
              <textarea required id="message" name="message" placeholder={t('message-placeholder')} />
            </div>
          </div>

          {/* send button */}
          <button type="submit">{t('send')}</button>
        </div>
      </form>
    </section>
  )
}
