'use client'
import { useState } from 'react'

interface emailFormProps {
  t: any;
  errorCode?: string;
  onSubmit: (email) => void;
  children?: React.ReactNode;
}

export default function EmailForm({
  t,
  errorCode,
  onSubmit,
  children,
  ...props
}: emailFormProps) {
  const [email, setEmail] = useState('')

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(email)
  }

  return (
    <>
      <form  data-name="email" onSubmit={handleFormSubmit}>
        <p>email:</p>
        <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)}/>
        <button type="submit">전송</button>
      </form>
    </>
  )
}

