import '@/styles/_global.scss'
import { ApolloWrapper } from '@/utils/apollo-provider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {

  return (
    <ApolloWrapper>
      {children}
    </ApolloWrapper>
  )
}

export const metadata = {
  title: 'Ideas on board',
  description: 'This is IOB website.',
}
