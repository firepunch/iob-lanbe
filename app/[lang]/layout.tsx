import { sendEmailForm } from '@/api_wp'
import { Footer, Header, SimpleHeader } from '@/components'
import { getTranslation } from '@/i18n'
import { useTranslation } from '@/i18n/client'
import { ValidLocale, languages } from '@/i18n/settings'
import { headers } from 'next/headers'

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }))
}

const SIMPLE_HEADER_MAP = [
  'sign-in',
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
  // const [errorCode, setErrorCode] = useState()

  const handleSubmit = async (email: string) => {
    try {
      const formData = new FormData()
      formData.append('user-email', 'ex@gmail.com')
      const { code } = await sendEmailForm(formData)
      // setErrorCode(code)
      alert('이메일 폼 전송에 성공했습니다!')
    } catch (error) {
      console.error('이메일 폼 전송 에러:', error)
    }
  }

  return (
    <html lang={lang}>
      <head />
      <body>
        {SIMPLE_HEADER_MAP.find(item=> fullUrl.includes(item)) ?
          <SimpleHeader lang={lang} /> :
          <Header lang={lang} ct={ct} t={t} /> 
        }
        <main>
          {children}
        </main>
        <Footer lang={lang} t={t} />
        {/* <EmailForm 
          t={t}
          errorCode={errorCode}
          onSubmit={handleSubmit} 
        /> */}
      </body>
    </html>
  )
}

export const dynamic = 'force-dynamic'
