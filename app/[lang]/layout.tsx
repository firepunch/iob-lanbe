import { ValidLocale, getLocaleParams } from "i18n"
import { Footer, Header } from "@/components"

export async function generateStaticParams() {
  return getLocaleParams()
}

export default function LangLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode,
  params: { lang: ValidLocale; },
}) {

  return (
    <html lang={lang}>
      <body>
        <Header lang={lang} />
        <main>
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  )
}
