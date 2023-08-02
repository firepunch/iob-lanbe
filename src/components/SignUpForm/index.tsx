'use client'

import cls from 'classnames'
import styles from './index.module.scss'
import { createUser } from '@/api_gql'

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
        clientMutationId: 'uniqueId',
        username: 'your_username',
        password: 'your_password',
        email: 'your_email',
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
