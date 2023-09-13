import type { Metadata } from 'next'
import '@/sass/main.scss'

export const metadata: Metadata = {
  title: 'Ideas on board',
  description: 'Find your business opportunity',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#000000',
  robots: 'index,follow',
  keywords: ['Ideas on board', 'IOB', 'I.O.B', 'business', 'market', 'Southeast Asian'],
  openGraph: {
    title: 'I.O.B',
    description: 'I.O.B offers curated business content and professional services that help you enter the Southeast Asian market.',
    images: 'https://i0.wp.com/api.iob.team/wp-content/uploads/2023/09/link_thumbnail.jpg',
  },
}

export default function RootLayout({
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
