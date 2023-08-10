'use client'

import cls from 'classnames'
import styles from './index.module.scss'
import { TI18N } from '@/types'

interface SignUpFormProps {
  t: TI18N;
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
    <form onSubmit={onSubmit}>
      <label htmlFor="id">{t('id')}</label>
      <input type="text" id="id" />
      {errorCode && <p>{t(errorCode)}</p>}
      <button type="submit">{t('sign_in')}</button>
    </form>
  )
}
