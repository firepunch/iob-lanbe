import { getSitemapUrls } from '@/api_gql'
import { ValidLocale } from '@/types'
import { MetadataRoute } from 'next'
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL as string
  const enPosts = await getSitemapUrls({
    language: 'EN', 
  })
  const koPosts = await getSitemapUrls({
    language: 'KO', 
  })

  const enPostUrls = enPosts?.map(post => ({
    url: `${API_URL}/en/content/${post?.slug}`,
    lastModified: new Date(post?.dateGmt),
  }))  

  const koPostUrls = koPosts?.map(post => ({
    url: `${API_URL}/ko/content/${post?.slug}`,
    lastModified: new Date(post?.dateGmt),
  }))  

  return [...enPostUrls, ...koPostUrls]
}