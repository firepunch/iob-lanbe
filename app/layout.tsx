import '@/sass/main.scss'
import type { Metadata } from 'next'

import FaviconIcon from '/public/favicon/favicon.ico'

export const metadata: Metadata = {
  title: 'Ideas on board',
  description: 'Find your business opportunity',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#000',
  // manifest: '/favicon/site.webmanifest',
  // icons: [{
  //   rel: 'icon',
  //   url: FaviconIcon.src,
  // }],
  // icons: [{
  //   rel: 'icon',
  //   type: 'image/png',
  //   sizes: '16x16',
  //   url: '/favicon/favicon-16x16.png',
  // }, {
  //   rel: 'icon',
  //   type: 'image/png',
  //   sizes: '32x32',
  //   url: '/favicon/favicon-32x32.png',
  // }, {
  //   rel: 'icon',
  //   type: 'apple-touch-icon',
  //   sizes: '76x76',
  //   url: '/favicon/apple-touch-icon.png',
  // }, {
  //   rel: 'icon',
  //   type: 'mask-icon',
  //   url: '/favicon/safari-pinned-tab.svg',
  // }],
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
