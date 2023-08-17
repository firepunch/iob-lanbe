import Link from 'next/link'
import { ValidLocale } from '@/i18n/settings'
import { TI18N } from '@/types'
import Image from 'next/image'
import Icons from '@/components/Icons'


export default async function Footer({
  t,
  lang, 
}: {
  t: TI18N
  lang: ValidLocale
}) {  

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
        <div className="footer-signup">
          <p>Sign up to<br/> receive our newsletter.</p>
          <input type="text" placeholder="Email" />
          <Icons type="arrowBlack" />
        </div>

        <div className="footer-pages">
          <ul>
            <li>
              <Link href={`/${lang}/content`}>
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
