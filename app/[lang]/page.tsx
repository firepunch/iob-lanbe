import { ContentCard } from '@/components'
import { getTranslation } from '@/i18n/index'
import { ValidLocale } from '@/i18n/settings'
import { getContents } from '@/utils/api'
import Link from 'next/link'

export async function generateMetadata({ params: { lang } }) {
  const { t } = await getTranslation(lang, 'second-page')
  return { title: t('h1') }
}

export default async function Home({
  params: { lang },
}: {
  params: { lang: ValidLocale; },
}) {
  const { t } = await getTranslation(lang, 'second-page')
  const contentsData = getContents(lang.toUpperCase())

  const [contents] = await Promise.all([contentsData])

  return (
    <>
      <h2>{t('h1')}</h2>
      {contents?.map(({ node }) => (
        <Link 
          key={node.id} 
          href={`/${encodeURIComponent(node.slug)}`}>
          <ContentCard
            thumbnail_url={node.featuredImage?.node.sourceUrl}
            {...node}
          />
        </Link>
      ))}
    </>
  )
}
