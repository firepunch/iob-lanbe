import { getTranslation } from '@/i18n/index'
import { ValidLocale } from '@/i18n/settings'
import Link from 'next/link'
import { Button, ContentCard, PageHeading, Select } from 'src/components/index'
import { getContents, getAllCategories, getContentsByCategory } from '@/api_gql'

export default async function Category({
  params: { lang },
}: {
  params: { lang: ValidLocale; },
}) {
  const { t: ct } = await getTranslation(lang, 'common')
  const { t } = await getTranslation(lang, 'category-page')
  
  const urlSearchParams = new URLSearchParams('name=uncategorized') //new URLSearchParams('window.location.search')
  const nameQueryParam = urlSearchParams.get('name') || 'all'

  const categoryData = getContentsByCategory(nameQueryParam)
  const [category] = await Promise.all([categoryData])
  
  return (
    <>
      <PageHeading title={t(nameQueryParam)}/>
      <span>Sort by:</span>
      <Select
        options={ct('sort_options', { returnObjects: true }) }
      />
      {category?.posts?.edges?.map(async ({ node }) => {
        console.log(node.title)
        // <p key={node.id}> {node.title}</p>
      })}
      <Button>Load more</Button>
    </>
  )
}
