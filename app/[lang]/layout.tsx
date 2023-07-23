import { Footer, Header } from '@/components'
import { languages, ValidLocale } from '@/i18n/settings'
import { ApolloWrapper } from '@/utils/apollo-provider'

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }))
}

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode,
  params: {lang: ValidLocale}
}) {
  
  return (
    <html lang={lang}>
      <head />
      <body>
        <ApolloWrapper>
          <Header lang={lang} />
          {children}
          <Footer lang={lang} />
        </ApolloWrapper>
      </body>
    </html>
  )
}
