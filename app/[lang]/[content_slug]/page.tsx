import { ContentArea } from '@/components'
import { ValidLocale } from '@/i18n/settings'

export default function Category({
  params: { lang, content_slug },
}: {
  params: { lang: ValidLocale; content_slug: string; },
}) {
  console.log(content_slug)
  // const { t } = await getTranslation(lang, 'content-page')

  return (
    <main>
      <h2 id="content-header">Content Title</h2>

      <ContentArea>
        <p>This is some text for size test.</p>
        <p>This is some text for size test.</p>
      </ContentArea>
    </main>
  )
}
