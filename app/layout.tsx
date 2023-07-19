import { dir } from 'i18next'
import { ApolloWrapper } from '@/utils/apollo-provider'
import { languages, ValidLocale } from '@/i18n/settings'
import { Header, Footer } from '@/components'
import '@/styles/_global.scss'

export async function generateStaticParams() {
  return languages.map((lang) => ({ lang }))
}

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode,
  params: { lang: ValidLocale }
}) {
  return (
    <html lang={lang}>
      <head />
      <body>
        <Header lang={lang} />
        <ApolloWrapper>
          {children}
        </ApolloWrapper>
        <Footer />
      </body>
    </html>
  )
}
