'use client'

import { EmailForm } from '@/components'
import Icons from '@/components/Icons'
import { useTranslation } from '@/i18n/client'
import { ValidLocale } from '@/i18n/settings'
import useUserState from '@/stores/userStore'
import Link from 'next/link'

export default function Footer({
  lang, 
}: {
  lang: ValidLocale
}) {  
  const { t } = useTranslation(lang, 'layout')
  const user = useUserState(state => state.user)

  return (
    <footer>
      <div id="footer-left">
        <Link href="/" className="footer-logo">
          I.O.B
        </Link>

        <div className="footer-info">
          <p className="email">{t('f_company')}</p>
          <p className="email">{t('f_email')}</p>
          <p className="address">{t('f_address')}<br/>{t('f_building')}</p>
          <p className="address">{t('f_ceo')}</p>
        </div>

        <p className="copyright">© IOB 2023</p>
      </div>

      <div id="footer-right">
        {!user?.databaseId && (
          <EmailForm lang={lang}/>
        )}

        <div className="footer-pages">
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
