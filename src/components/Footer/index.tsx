import Link from 'next/link'
import { ValidLocale } from '@/i18n/settings'
import { TI18N } from '@/types'

export default function Footer({
  t,
  lang,
}: {
  t: TI18N
  lang: ValidLocale
}) {
  return (
    <footer>
      Footer
      <Link href="/">
        <h1>
          IOB
        </h1>
      </Link>

      <nav>
        <Link href={`/${lang}/content`}>
          {t('content')}
        </Link>
        <Link href={`/${lang}/report`}>
          {t('report')}
        </Link>
        <Link href={`https://www.linkedin.com/`}>
          {t('linkedin')}
        </Link>
        <Link href={`/${lang}/privacy-policy`}>
          {t('privacy-policy')}
        </Link>
        <Link href={`/${lang}/terms-conditions`}>
          {t('terms-conditions')}
        </Link>
        <Link href={`/${lang}/cookie-policy`}>
          {t('cookie-policy')}
        </Link>

      </nav>
    </footer>
  )
}
