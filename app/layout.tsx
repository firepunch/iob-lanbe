import '@/sass/main.scss'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ideas on board',
  description: 'Find your business opportunity',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#000',
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
