import { Footer, Header } from '@/components'
import { getTranslation } from '@/i18n'
import { ValidLocale, languages } from '@/i18n/settings'

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }))
}

export default async function LocaleLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode,
  params: { lang: ValidLocale }
}) {
  const { t: ct } = await getTranslation(lang, 'category-page')
  const { t } = await getTranslation(lang, 'layout')

  return (
    <html lang={lang}>
      <head />
      <body>
        <Header lang={lang} ct={ct} t={t} />
        <main>
          {children}
        </main>
        <Footer lang={lang} t={t} />
      </body>
    </html>
  )
}
