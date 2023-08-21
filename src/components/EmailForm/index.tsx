'use client'

import { useState } from 'react'
import Icons from '@/components/Icons'

interface emailFormProps {
  errorCode?: string;
  onSubmit: (email) => void;
  children?: React.ReactNode;
}

export default function EmailForm({
  errorCode,
  onSubmit,
  children,
  ...props
}: emailFormProps) {
  const [email, setEmail] = useState('')

  // const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   onSubmit(email)
  // }

  return (
    <>
      <div className="footer-signup">
        <p>Sign up to<br/> receive our newsletter.</p>
        <form  data-name="email" onSubmit={onSubmit}>
          <input type="text" placeholder="Email" id="email"/>
          <button type="submit">
            <Icons type="arrowBlack" />
          </button>
        </form>
      </div>
    </>
  )
}

