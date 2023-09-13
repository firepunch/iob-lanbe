import { getMetaData } from '@/api_gql'
import { ValidLocale } from '@/types'
import { IOB_KEYWORDS, WP_URL } from '@/utils/constants'
import { stripPTag } from '@/utils/lib'
import type { Metadata } from 'next'

export async function generateMetadata({
  params: { lang, content_slug }, 
}: {
  params: { lang: ValidLocale, content_slug: string; },
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
      url: `${WP_URL}/${lang}/content/${decodeURIComponent(content_slug)}`,
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
