'use client'

import { TI18N } from '@/types'

interface SignUpFormProps {
  t: TI18N;
  errorCode?: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children?: React.ReactNode;
}

export default function SignUpForm ({
  t,
  errorCode,
  onSubmit,
  children,
  ...props
}: SignUpFormProps) {

  return (
    <>
      <form onSubmit={onSubmit}>
        <label htmlFor="first_name">{t('first_name')}</label>
        <input type="text" id="first_name" />
        <button type="submit">{t('sign_up')}</button>
      </form>
    </>
  )
}
