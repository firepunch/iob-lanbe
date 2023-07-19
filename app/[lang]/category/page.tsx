import { getTranslation } from '@/i18n/index'
import { ValidLocale } from '@/i18n/settings'
import Link from 'next/link'
import { Button, ContentCard, PageHeading, Select } from 'src/components/index'
import { getContents } from 'src/utils/api'

export async function generateMetadata({ params: { lang } }) {
  const { t } = await getTranslation(lang, 'second-page')
  return { title: t('h1') }
}

export default async function Category({
  params: { lang },
}: {
  params: { lang: ValidLocale; },
}) {
  const { t } = await getTranslation(lang, 'second-page')
  const contentsData = getContents(lang.toUpperCase())

  const [contents] = await Promise.all([contentsData])

  return (
    <>
      <PageHeading title={t('h1')}/>
      <span>Sort by:</span>
      <Select
        options={[]}
      />

      {contents?.map(item => (
        <Link key={item.id} href={`/${item.slug}`}>
          <ContentCard
            thumbnail_url={item.featuredImage?.node.sourceUrl}
            {...item} 
          />
        </Link>
      ))}

      <Button>Load more</Button>
    </>
  )
}
