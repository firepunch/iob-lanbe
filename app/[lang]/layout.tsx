import { Footer, Header } from "@/components"
import "@/styles/_global.scss"
import { ValidLocale, getLocaleParams } from "i18n"

export async function generateStaticParams() {
  return getLocaleParams()
}

export default function RootLayout({
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

export const metadata = {
  title: "Ideas on board",
  description: "This is IOB website.",
}
