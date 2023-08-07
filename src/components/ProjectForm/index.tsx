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
    <form onSubmit={onSubmit}>
      <label htmlFor="id">first-name</label>
      <input type="name" id="first-name" /><br></br>
      <label htmlFor="id">last-name</label>
      <input type="name" id="last-name" /><br></br>
      <label htmlFor="id">organization</label>
      <input type="name" id="organization" /><br></br>
      <label htmlFor="id">job-title</label>
      <input type="name" id="job-title" /><br></br>
      <label htmlFor="id">email</label>
      <input type="email" id="user-email" /><br></br>
      <label htmlFor="id">tel</label>
      <input type="tel" id="contact-no" /><br></br>
      <label htmlFor="id">message</label>
      <input type="textarea" id="message" /><br></br>
      {errorCode && <p>{t(errorCode)}</p>}
      <button type="submit">submit</button>
    </form>
  )
}
