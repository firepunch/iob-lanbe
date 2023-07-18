import Link from "next/link"
import { ValidLocale, getLocalePartsFrom, getTranslator, locales } from "i18n"
import { getContents } from "@/utils/api"
import { ContentCard } from "@/components"

export default async function Home({
  params: { lang },
}: {
  params: { lang: string; },
}) {
  const t = await getTranslator(lang as ValidLocale)
  const contentsData = getContents(lang.toUpperCase())

  const [contents] = await Promise.all([contentsData])

  return (
    <main>
      <h2>Home</h2>
      <p>Current locale: {lang}</p>
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
    </main>
  )
}

export async function generateStaticParams() {
  return locales.map((locale) => getLocalePartsFrom({ locale }))
}