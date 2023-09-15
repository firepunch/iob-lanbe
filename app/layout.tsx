import type { Metadata } from 'next'
import '@/sass/main.scss'
import { IOB_KEYWORDS } from '@/utils/constants'

export const metadata: Metadata = {
  title: 'I.O.B',
  description: 'Find your business opportunity',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#000000',
  robots: 'index,follow',
  keywords: IOB_KEYWORDS,
  openGraph: {
    title: 'I.O.B',
    description: 'I.O.B offers curated business content and professional services that help you enter the Southeast Asian market.',
    images: 'https://i0.wp.com/api.iob.team/wp-content/uploads/2023/09/link_thumbnail.jpg',
  },
  icons: [
    { rel: 'icon', sizes: '32x32', url: '/favicon/favicon-32x32.png' },
    { rel: 'icon', sizes: '16x16', url: '/favicon/favicon-16x16.png' },
    { rel: 'icon', sizes: '180x180', url: '/favicon/apple-touch-icon.png' },
    { rel: 'icon', sizes: '96x96', url: '/favicon/android-chrome-96x96.png' },
  ],
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
