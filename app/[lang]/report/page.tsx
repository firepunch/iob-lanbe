import Link from "next/link"
import { getTranslator } from "i18n"
import { getLocalePartsFrom, locales } from "i18n"
import { getAllProducts } from "@/utils/api"
import { ValidLocale } from "i18n"
import { PageHeading, ReportCard } from "@/components/index"

export default async function Report({
  params: { lang },
}: {
  params: { lang: string; },
}) {
  const t = await getTranslator(lang as ValidLocale)
  const reportsData = getAllProducts()
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
