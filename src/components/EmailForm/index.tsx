'use client'

import { sendEmailForm } from '@/api_wp'
import Icons from '@/components/Icons'

interface emailFormProps {
}

export default function EmailForm({
}: emailFormProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()

    try {
      const formData = new FormData(e.currentTarget)
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
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Email" name="user-email"/>
          <button type="submit">
            <Icons type="arrowBlack" />
          </button>
        </form>
      </div>
    </>
  )
}

