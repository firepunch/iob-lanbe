'use client'

import { sendEmailForm } from '@/api_wp'
import arrowBlackImg from '@/imgs/arrow_black.png'
import Image from 'next/image'
import { useState } from 'react'
import { useTranslation } from '@/i18n/client'
import { ValidLocale } from '@/i18n/settings'

interface emailFormProps {
}

export default function EmailForm({
  lang, 
}: {
  lang: ValidLocale,
}, emailFormProps) {
  const { t } = useTranslation(lang, 'layout')
  const [value, setValue] = useState<string>()

  const handleSubmit = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    try {
      const formData = new FormData()
      formData.append('email', value as string)
      await sendEmailForm(formData)
      alert('이메일 폼 전송에 성공했습니다!')
    } catch (error) {
      console.error('이메일 폼 전송 에러:', error)
    }
  }

  return (
    <>
      <form>
        <div className="footer-signup">
          <p>{t('form_signup')}<br/>{t('form_newsletter')}<br/>{t('form_receive')}</p>
          <input 
            id="email"
            name="email"
            type="email" 
            placeholder="Email"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <Image src={arrowBlackImg} alt="Arrow" onClick={handleSubmit}/>
        </div>
      </form>
    </>
  )
}

