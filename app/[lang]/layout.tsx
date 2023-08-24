import { Footer, Header, SimpleHeader } from '@/components'
import { getTranslation } from '@/i18n'
import { ValidLocale } from '@/i18n/settings'
import { headers } from 'next/headers'

// export function generateStaticParams() {
//   return languages.map((lang) => ({ lang }))
// }

const SIMPLE_HEADER_MAP = [
  'sign-in',
  'sign-up',
]

export default async function LocaleLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode,
  params: { lang: ValidLocale }
}) {
  const headersList = headers()
  const fullUrl = headersList.get('referer') || ''
  const { t: ct } = await getTranslation(lang, 'category-page')
  const { t } = await getTranslation(lang, 'layout')

  return (
    <html lang={lang}>
      <head />
      <body>
        {
          SIMPLE_HEADER_MAP.find(item=> fullUrl.includes(item)) ?
            <SimpleHeader lang={lang} /> :
            <Header lang={lang} ct={ct} t={t} /> 
        }
        <main>
          {children}
        </main>
        <Footer lang={lang} />
      </body>
    </html>
  )
}
