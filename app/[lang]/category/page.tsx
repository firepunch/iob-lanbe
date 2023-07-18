import { ValidLocale, getTranslator } from 'i18n'
import Link from 'next/link'
import { Button, ContentCard, PageHeading, Select } from 'src/components/index'
import { getContents } from 'src/utils/api'

export default async function Category({
  params: { lang },
}: {
  params: { lang: ValidLocale; },
}) {
  const dict = await getTranslator(lang)
  const contentsData = getContents(lang.toUpperCase())

  const [contents] = await Promise.all([contentsData])

  return (
    <>
      <PageHeading title={dict.category.all}/>
      <span>Sort by:</span>
      <Select
        options={dict.sorter_options}
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
