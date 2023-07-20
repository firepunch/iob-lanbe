import Link from 'next/link'
import { ValidLocale } from '@/i18n/settings'
import { getTranslation } from '@/i18n/index'

export default async function Footer( {
  lang,
}: {
  lang: ValidLocale
}){
  const { t } = await getTranslation(lang, 'footer')

  return (
    <footer>
      Footer
      <Link href="/">
        IOB
      </Link>

      <nav>
        <Link href={`/${lang}/content`}>
          {t('content')}
        </Link>
      </nav>
    </footer>
  )
}
