import { getMetaData } from '@/api_gql'
import { IOB_KEYWORDS } from '@/utils/constants'
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
  const author = meta.author?.node?.name?.replace('&amp;', '&')

  return meta?.title ? {
    robots: 'index,follow,max-image-preview:large',
    title: `${meta.title} | I.O.B`,
    keywords: [
      ...IOB_KEYWORDS,
      ...meta.categories?.nodes?.map(item => item?.name),
      ...meta.tags?.nodes?.map(item => item?.name),
    ],
    description: stripPTag(meta.excerpt),
    authors: {
      name: author,
    },
    openGraph: {
      type: 'article',
      title: meta.title,
      description: `${stripPTag(meta.excerpt)}`,
      images: {
        url: meta.featuredImage?.node?.sourceUrl,
        alt: meta.title,
      },
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
