import Link from "next/link"
import { Button, ContentCard, PageHeading, Select } from "src/components/index"
import { getContents } from "src/utils/api"
import { ValidLocale, getLocalePartsFrom, getTranslator, locales } from "i18n"

export default async function Category({
  params: { lang },
}: {
  params: { lang: string; },
}) {
  const t = await getTranslator(lang as ValidLocale)
  const contentsData = getContents(lang.toUpperCase())

  const [contents] = await Promise.all([contentsData])

  return (
    <>
      <PageHeading title={t("category.all")}/>
      <span>Sort by:</span>
      <Select
        options={t("sorter_options")}
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

export async function generateStaticParams() {
  return locales.map((locale) => getLocalePartsFrom({ locale }))
}
