import { WP_URL, IOB_KEYWORDS } from '@/utils/constants'

export async function generateMetadata({ params }) {
  return {
    title: `${params?.lang === 'ko' ? '콘텐츠' : 'Content'} | I.O.B`,
    robots: 'index,follow,max-image-preview:large',
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
