import { getSitemapUrls } from '@/api_gql'
import { MetadataRoute } from 'next'
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const WEB_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://iob.team'
  const enPosts = await getSitemapUrls({
    language: 'EN', 
  })
  const koPosts = await getSitemapUrls({
    language: 'KO', 
  })

  const enPostUrls = enPosts?.map(post => ({
    url: `${WEB_URL}/en/content/${post?.slug}`,
    lastModified: new Date(post?.dateGmt),
  }))  

  const koPostUrls = koPosts?.map(post => ({
    url: `${WEB_URL}/ko/content/${post?.slug}`,
    lastModified: new Date(post?.dateGmt),
  }))  

  return [...enPostUrls, ...koPostUrls]
}