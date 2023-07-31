'use client'

import cls from 'classnames'
import styles from './index.module.scss'
import { login } from '@/api_wp'

interface SignUpFormProps {
  children?: React.ReactNode;
}

export default function SignInForm ({
  children,
  ...props
}: SignUpFormProps) {

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await login({
        id: 'asdf',
        password: '1234',
      })
    } catch {
      console.error('error')
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        {children}
      </form>
    </>
  )
}
