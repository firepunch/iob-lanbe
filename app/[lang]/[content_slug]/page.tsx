import { getTranslation } from '@/i18n/index'
import { ValidLocale } from '@/i18n/settings'
import Link from 'next/link'

export async function generateMetadata({ params: { lang } }) {
  const { t } = await getTranslation(lang, 'second-page')
  return { title: t('h1') }
}

export default async function Category({
  params: { lang },
}: {
  params: { lang: ValidLocale; },
}) {
  const { t } = await getTranslation(lang, 'second-page')

  return (
    <main >
      <h2 id="content-header">{t('h1')}</h2>

      <div style={{ background: 'black', height: '100vh' }}>
      </div>

      <Link href="#content-header">Scroll to top</Link>
    </main>
  )
}
