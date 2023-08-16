import { ContentArea } from '@/components'
import { getTranslation } from '@/i18n/index'
import { ValidLocale } from '@/i18n/settings'
import { getContents, getContentBySlug } from '@/api_gql'
import Link from 'next/link'

export default async function Category({
  params: { lang, content_slug },
}: {
  params: { lang: ValidLocale; content_slug: string; },
}) {
  const { t } = await getTranslation(lang, 'content-page')
  const contentData = getContentBySlug(content_slug)
  const recommendData = getContents(lang.toUpperCase())
  const [content, recommend] = await Promise.all([contentData, recommendData])

  return (
    <main>
      <h2 id="content-header">Content Title</h2>

      {content && (
        <ContentArea>
          <p>{content.title}</p>
          <p>{content.date}</p>
          <p>{content.excerpt}</p>
          <p>
            {content.categories?.edges?.map(({ node }) => (
              <p key={node.id}>{node.name}</p>
            ))}
          </p>
          <p>
            {content.tages?.edges?.map(({ node }) => (
              <p key={node.id}>{node.name}</p>
            ))}
          </p>
          <p>
            {Array.isArray(content.author) ? (
              content.author.map(({ node }) => (
                <p key={node.name}>{node.name}</p>
              ))
            ) : (
              <p>{content.author?.node?.name}</p>
            )}
          </p>
          <p>
            {content.author?.node?.roles?.edges?.map(({ node }) => (
              <p key={node.id}>roles:{node.id}</p>
            ))}
          </p>
          <div dangerouslySetInnerHTML={{ __html: content.content }} />
        </ContentArea>
      )}

      <p>{t('login_wall')}</p>

      <h2>Recommended</h2>     
      {recommend?.map(({ node }) => (
        <Link 
          key={node.id} 
          href={`/${encodeURIComponent(node.slug)}`}>
        </Link>
      ))}
    </main>
  )
}
