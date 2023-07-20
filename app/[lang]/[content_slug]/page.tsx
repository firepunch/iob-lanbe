import { ContentArea } from '@/components'
import { getTranslation } from '@/i18n/index'
import { ValidLocale } from '@/i18n/settings'
import { getContentBySlug } from '@/utils/api'

export default async function Category({
  params: { lang, content_slug },
}: {
  params: { lang: ValidLocale; content_slug: string; },
}) {
  const { t } = await getTranslation(lang, 'content-page')
  const contentData = getContentBySlug(content_slug)

  const [content] = await Promise.all([contentData])
  console.log(content)

  return (
    <main>
      <h2 id="content-header">Content Title</h2>

      <ContentArea>
        <p>{content.title}</p>
        <p>{content.date}</p>
        <p>{content.excerpt}</p>
        <p>
          {content.categories?.edges?.map(({ node }) => (
            <p key={node.id}>{node.name}</p>
          ))}
        </p>
        <div dangerouslySetInnerHTML={{ __html: content.content }} />
      </ContentArea>

      <p>{t('login_wall')}</p>
    </main>
  )
}
