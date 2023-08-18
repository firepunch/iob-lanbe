'use client'

import { TI18N } from '@/types'

interface ProjectFormProps {
  t: TI18N;
  errorCode?: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children?: React.ReactNode;
}

export default function ProjectForm ({
  t,
  errorCode,
  onSubmit,
  children,
  ...props
}: ProjectFormProps) {

  return (
    <section id="project-inquiry-form">
      <h2>{t('project')}<br/>{t('inquiry')}</h2>

      <form onSubmit={onSubmit}>
        <div id="pi-form-wrap">
          {/* row1 */}
          <div className="pi-inputs-row">
            <label htmlFor="firstname">{t('first-name')}</label>
            <input type="text" id="firstname" name="firstname" />

            <label htmlFor="lastname">{t('last-name')}</label>
            <input type="text" id="lastname" name="lastname" />
          </div>

          {/* row2 */}
          <div className="pi-inputs-row">
            <label htmlFor="org">{t('organization')}</label>
            <input type="text" id="org" name="org" placeholder={t('organization-placeholder')} />

            <label htmlFor="jobtitle">{t('job-title')}</label>
            <input type="text" id="jobtitle" name="jobtitle" placeholder={t('job-placeholder')} />
          </div>

          {/* row3 */}
          <div className="pi-inputs-row">
            <label htmlFor="email">{t('email')}</label>
            <input type="email" id="email" name="email" placeholder={t('email-placeholder')} />
            <label htmlFor="contact">{t('contact')}</label>
            <input type="phone" id="contact" name="contact" placeholder={t('contact-placeholder')} />
          </div>

          {/* row4: message */}
          <div className="message-us">
            <label htmlFor="message">{t('message')}</label>
            <input type="text-area" id="message" name="message"
              placeholder={t('message-placeholder')} />
          </div>

          {/* send button */}
          <button type="submit">{t('send')}</button>
        </div>
      </form>
    </section>
  )
}
