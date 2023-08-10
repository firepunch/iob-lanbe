'use client'

import { TI18N } from '@/types'

interface SearchRequestProps {
  t: TI18N;
  errorCode?: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children?: React.ReactNode;
}

export default function SearchRequestForm ({
  t,
  errorCode,
  onSubmit,
  children,
  ...props
}: SearchRequestProps) {

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="id">first-name</label>
      <input type="name" id="first-name" /><br></br>
      <label htmlFor="id">last-name</label>
      <input type="name" id="last-name" /><br></br>
      <label htmlFor="id">email</label>
      <input type="email" id="email" /><br></br>
      <label htmlFor="id">message</label>
      <input type="text" id="message" /><br></br>
      {errorCode && <p>{t(errorCode)}</p>}
      <button type="submit">submit</button>
    </form>
  )
}