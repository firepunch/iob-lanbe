import { getTranslation } from '@/i18n/index'
import { ValidLocale } from '@/i18n/settings'
import Link from 'next/link'
import { Button, ContentCard, PageHeading, Select } from 'src/components/index'
import { getContents } from 'src/utils/api'

export default async function Category({
  params: { lang },
}: {
  params: { lang: ValidLocale; },
}) {
  const { t: ct } = await getTranslation(lang, 'common')
  const { t } = await getTranslation(lang, 'category-page')
  const contentsData = getContents(lang.toUpperCase())

  const [contents] = await Promise.all([contentsData])

  return (
    <>
      <PageHeading title={t('all')}/>
      <span>Sort by:</span>
      <Select
        options={ct('sort_options', { returnObjects: true }) }
      />

      {contents?.map(({ node }) => (
        <Link key={node.id} href={`/${node.slug}`}>
          <ContentCard
            thumbnail_url={node.featuredImage?.node.sourceUrl}
            {...node} 
          />
        </Link>
      ))}

      <Button>Load more</Button>
    </>
  )
}
