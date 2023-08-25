'use client'

import { sendEmailForm } from '@/api_wp'
import { EmailForm } from '@/components'
import Icons from '@/components/Icons'
import { useTranslation } from '@/i18n/client'
import { ValidLocale } from '@/i18n/settings'
import Link from 'next/link'

export default function Footer({
  lang, 
}: {
  lang: ValidLocale
}) {  
  const { t } = useTranslation(lang, 'layout')

  const handleSubmit = async (email: string) => {
    try {
      const formData = new FormData()
      formData.append('user-email', 'ex@gmail.com')
      const { code } = await sendEmailForm(formData)
      // setErrorCode(code)
      alert('이메일 폼 전송에 성공했습니다!')
    } catch (error) {
      console.error('이메일 폼 전송 에러:', error)
    }
  }

  return (
    <footer>
      <div id="footer-left">
        <a className="footer-logo">I.O.B </a>

        <div className="footer-info">
          <a className="email">support@iob.team</a>
          <p className="address">Nonhyeon-ro 149-gil 67-7<br/> Myeong-Eun Building 3F</p>
        </div>

        <p className="copyright">© IOB 2023</p>
      </div>

      <div id="footer-right">
        <div className="footer-pages">
          {/* <EmailForm  
            errorCode={'errorCode'}
            onSubmit={handleSubmit} 
          /> */}
          <ul>
            <li>
              <Link href={`/${lang}/category`}>
                <Icons type="arrowBlack" />
                <p>{t('f_content')}</p>
              </Link>
            </li>
            <li>
              <Link href={`/${lang}/report`}>
                <Icons type="arrowBlack" />
                <p>{t('f_report')}</p>
              </Link>
            </li>
            <li>
              <Link href={`/${lang}/project`}>
                <Icons type="arrowBlack" />
                <p>{t('f_project')}</p>
              </Link>
            </li>
          </ul>

          <ul>
            <li>
              <Link href={`https://www.linkedin.com/company/ideasonboard/`} target="_blank">
                <Icons type="arrowBlack" />
                <p>{t('f_linkedin')}</p>
              </Link>
            </li>
            <li>
              <Link href={`/${lang}/privacy-policy`}>
                <Icons type="arrowBlack" />
                <p>{t('f_privacy-policy')}</p>
              </Link>
            </li>
            <li>
              <Link href={`/${lang}/terms-conditions`}>
                <Icons type="arrowBlack" />
                <p>{t('f_terms-conditions')}</p>
              </Link>
            </li>
            <li>
              <Link href={`/${lang}/cookie-policy`}>
                <Icons type="arrowBlack" />
                <p>{t('f_cookie-policy')}</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
