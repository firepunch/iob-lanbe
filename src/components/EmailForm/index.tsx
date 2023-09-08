'use client'

import { sendEmailForm } from '@/api_wp'
import arrowBlackImg from '@/imgs/arrow_black.png'
import Image from 'next/image'
import { useState } from 'react'
import { useTranslation } from '@/i18n/client'
import { ValidLocale } from '@/i18n/settings'
import { redirect } from 'next/navigation'

export default function EmailForm({
  lang, 
}: {
  lang: ValidLocale,
}) {
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
      redirect(`/${lang}/sign-up`)
    } catch (error) {
      console.error('이메일 폼 전송 에러:', error)
    }
  }

  return (
    <div className="footer-signup">
      <p className="cta">
        {t('form_signup')}{t('form_newsletter')}{t('form_receive')}
        <Image src={arrowBlackImg} alt="Arrow" onClick={handleSubmit} />
      </p>
    </div>
  )
}

