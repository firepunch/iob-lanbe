'use client'

import { TI18N } from '@/types'
import React, { useState } from 'react'

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
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [org, setOrg] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [email, setEmail] = useState('')
  const [contact, setContact] = useState('')
  const [message, setMessage] = useState('')

  return (
    <section id="project-inquiry-form">
      <h2>{t('project')}<br/>{t('inquiry')}</h2>

      <form onSubmit={onSubmit}>
        <div id="pi-form-wrap">
          {/* row1 */}
          <div className="pi-inputs-row">
            <div className="field">
              <label htmlFor="firstname">{t('first-name')}</label>
              <input 
                type="text" 
                id="firstname" 
                name="firstname" 
                value={firstName} 
                onChange={e => setFirstName(e.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor="lastname">{t('last-name')}</label>
              <input 
                type="text" 
                id="lastname" 
                name="lastname"
                value={lastName} 
                onChange={e => setLastName(e.target.value)} />
            </div>
          </div>

          {/* row2 */}
          <div className="pi-inputs-row">
            <div className="field">
              <label htmlFor="org">{t('organization')}</label>
              <input 
                type="text" 
                id="org" 
                name="org" 
                placeholder={t('organization-placeholder')}
                value={org} 
                onChange={e => setOrg(e.target.value)} />
            </div>

            <div className="field">
              <label htmlFor="jobtitle">{t('job-title')}</label>
              <input 
                type="text" 
                id="jobtitle" 
                name="jobtitle" 
                placeholder={t('job-placeholder')} 
                value={jobTitle} 
                onChange={e => setJobTitle(e.target.value)}/>
            </div>
          </div>

          {/* row3 */}
          <div className="pi-inputs-row">
            <div className="field">
              <label htmlFor="email">{t('email')}</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                placeholder={t('email-placeholder')} 
                value={email} 
                onChange={e => setEmail(e.target.value)}/>
            </div>

            <div className="field">
              <label htmlFor="contact">{t('contact')}</label>
              <input 
                type="phone" 
                id="contact" 
                name="contact" 
                placeholder={t('contact-placeholder')}
                value={contact} 
                onChange={e => setContact(e.target.value)} />
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
                value={message} 
                onChange={e => setMessage(e.target.value)}/>
            </div>
          </div>

          {/* send button */}
          <button type="submit">{t('send')}</button>
        </div>
      </form>
    </section>
  )
}
