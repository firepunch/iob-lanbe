'use client'

import cls from 'classnames'
import styles from './index.module.scss'

interface SignUpFormProps {
  t: any;
  errorCode?: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children?: React.ReactNode;
}

export default function SignInForm ({
  t,
  errorCode,
  onSubmit,
  children,
  ...props
}: SignUpFormProps) {
  

  return (
    <>
      <form onSubmit={onSubmit}>
        <label htmlFor="id">{t('id')}</label>
        <input type="text" id="id" />
        <p>{t(errorCode)}</p>
        <button type="submit">{t('sign_in')}</button>
      </form>
    </>
  )
}
