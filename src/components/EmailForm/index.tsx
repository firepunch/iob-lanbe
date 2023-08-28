'use client'

import { sendEmailForm } from '@/api_wp'
import arrowBlackImg from '@/imgs/arrow_black.png'
import Image from 'next/image'
import { useState } from 'react'

interface emailFormProps {
}

export default function EmailForm({
}: emailFormProps) {
  const [value, setValue] = useState<string>()

  const handleSubmit = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    try {
      const formData = new FormData()
      formData.append('user-email', value as string)
      await sendEmailForm(formData)
      alert('이메일 폼 전송에 성공했습니다!')
    } catch (error) {
      console.error('이메일 폼 전송 에러:', error)
    }
  }

  return (
    <>
      <div className="footer-signup">
        <p>Sign up to<br/> receive our newsletter.</p>
        <input 
          type="email" 
          placeholder="Email"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <Image src={arrowBlackImg} alt="Arrow" onClick={handleSubmit} />
      </div>
    </>
  )
}

