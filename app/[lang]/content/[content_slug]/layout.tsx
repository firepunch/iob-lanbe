import { getMetaData } from '@/api_gql'
import { stripPTag } from '@/utils/lib'
import type { Metadata } from 'next'

export async function generateMetadata({
  params: { content_slug }, 
}: {
  params: { content_slug: string; },
}): Promise<Metadata> {
  const meta = await getMetaData({
    postSlug: decodeURIComponent(content_slug), 
  })

  return meta?.title ? {
    openGraph: {
      title: `${meta.title} | I.O.B`,
      description: `${stripPTag(meta.excerpt)}`,
      images: meta.featuredImage?.node?.sourceUrl,
    },
  } : {}
}

export default function ContentLayout({
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
