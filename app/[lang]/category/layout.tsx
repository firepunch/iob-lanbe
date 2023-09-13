import { WP_URL, IOB_KEYWORDS } from '@/utils/constants'

export async function generateMetadata({ params }) {
  return {
    title: `${params?.lang === 'ko' ? '콘텐츠' : 'Content'} | I.O.B`,
    robots: 'index,follow,max-image-preview:large',
    keywords: [
      ...IOB_KEYWORDS,
      '시장 분석','market',
      '기업 사례','corporate',
      '소비자','consumer',
      '마케팅','marketing',
      '파트너십','partnership',
      '채널','channel',
      '결제','payment',
    ],
    openGraph: {
      url: `${WP_URL}/${params?.lang}/category`,
      title: `${params?.lang === 'ko' ? '콘텐츠' : 'Content'} | I.O.B`,
      images: 'https://i0.wp.com/api.iob.team/wp-content/uploads/2023/09/link_thumbnail.jpg',
    },
  }
}

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <>
      {children}
    </>
  )
}
