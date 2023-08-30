'use client'

import { TI18N } from '@/types'
import React, { useState } from 'react'
import { InputField, SelectField } from '@/components'

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
            <div className="field">
              <InputField
                isRequired
                type="text"
                name="firstname"
                label={t('first-name')}
              />
            </div>

            <div className="field">
              <InputField
                isRequired
                name="lastname"
                label={t('last-name')}
              />
            </div>
          </div>

          {/* row2 */}
          <div className="pi-inputs-row">
            <div className="field">
              <InputField
                isRequired
                type="text" 
                name="org"
                label={t('organization')}
                placeholder={t('organization-placeholder')}
              />
            </div>

            <div className="field">
              <InputField
                isRequired
                type="text" 
                name="jobtitle"
                label={t('job-title')}
                placeholder={t('job-placeholder')} 
              />
            </div>
          </div>

          {/* row3 */}
          <div className="pi-inputs-row">
            <div className="field">
              <InputField
                isRequired
                type="email" 
                name="email"
                label={t('email')}
                placeholder={t('email-placeholder')} 
              />
            </div>

            <div className="field">
              <InputField
                type="phone" 
                name="contact"
                label={t('contact')}
                placeholder={t('contact-placeholder')} 
              />
            </div>
          </div>

          {/* row4: message */}
          <div className="message-us">
            <div className="field">
              <label htmlFor="message">{t('message')}</label>
              <textarea 
                id="message"
                name="message" 
                placeholder={t('message-placeholder')} 
              />
            </div>
          </div>

          {/* send button */}
          <button type="submit">{t('send')}</button>
        </div>
      </form>
    </section>
  )
}
