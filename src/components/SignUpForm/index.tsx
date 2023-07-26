'use client'

import cls from 'classnames'
import styles from './index.module.scss'
import { createUser } from '@/api_wp'

interface SignUpFormProps {
  children?: React.ReactNode;
}

export default function SignUpForm ({
  children,
  ...props
}: SignUpFormProps) {

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await createUser({
        username: 'test user',
        email: 'firepunch119@gmail.com',
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
