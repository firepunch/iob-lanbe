import { ContentCard } from "@/components"
import { getContents } from "@/utils/api"
import { ValidLocale, getTranslator } from "i18n"
import Link from "next/link"

export default async function Home({
  params: { lang },
}: {
  params: { lang: ValidLocale; },
}) {
  const dict = await getTranslator(lang)
  const contentsData = getContents(lang.toUpperCase())

  const [contents] = await Promise.all([contentsData])

  return (
    <>
      <h2>{dict.menu.about}</h2>
      {contents?.map(item => (
        <Link 
          key={item.id} 
          href={`/${encodeURIComponent(item.slug)}`}>
          <ContentCard
            thumbnail_url={item.featuredImage?.node.sourceUrl}
            {...item} 
          />
        </Link>
      ))}
    </>
  )
}
