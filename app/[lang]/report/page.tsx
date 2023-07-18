import Link from "next/link"
import { PageHeading, ReportCard } from "@/components/index"
import { getAllProducts } from "@/utils/api"
import { ValidLocale, getLocalePartsFrom, getTranslator, locales } from "i18n"

export default async function Report({
  params: { lang },
}: {
  params: { lang: ValidLocale; },
}) {
  const t = await getTranslator(lang as ValidLocale)
  const reportsData = getAllProducts(lang)
  const [reports] = await Promise.all([reportsData])

  return (
    <>
      <PageHeading title={t("menu.report")}/> 
      {reports?.map(({ node }) => (
        <Link key={node.id} href={`/${node.id}`}>
          <ReportCard
            thumbnail={node.image}
            title={node.name}
            description={node.shortDescription}
          />
        </Link>
      ))}
    </>
  )
}

export async function generateStaticParams() {
  return locales.map((locale) => getLocalePartsFrom({ locale }))
}
