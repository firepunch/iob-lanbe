import { LocalBody } from '@/components'
import { ValidLocale } from '@/i18n/settings'

export async function generateMetadata({ params }) {
  return {
    openGraph: {
      title: 'I.O.B',
      images: 'https://i0.wp.com/api.iob.team/wp-content/uploads/2023/09/link_thumbnail.jpg',
      description: params?.lang === 'ko' ?
        '동남아 시장에 진출하는 기업을 위해 비즈니스 콘텐츠를 제공하고 프로젝트를 수행합니다.' :
        'I.O.B offers curated business content and professional services that help you enter the Southeast Asian market.',
    },
  }
}

export default function LocaleLayout({
  params: { lang },
  children,
}: {
  params: { lang: ValidLocale }
  children: React.ReactNode,
}) {
  return (
    <html lang={lang}>
      <LocalBody lang={lang}>
        {children}
      </LocalBody>
    </html>
  )
}
