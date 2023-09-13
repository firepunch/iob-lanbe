import type { Metadata } from 'next'
import '@/sass/main.scss'

export const metadata: Metadata = {
  title: 'Ideas on board',
  description: 'Find your business opportunity',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#000',
  openGraph: {
    title: 'I.O.B',
    description: 'I.O.B offers curated business content and professional services that help you enter the Southeast Asian market.',
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
