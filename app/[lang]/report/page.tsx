import { PageHeading, ReportCard } from '@/components/index'
import { getAllProducts } from '@/utils/api'
import { ValidLocale, getTranslator } from 'i18n'
import Link from 'next/link'

export default async function Reports({
  params: { lang },
}: {
  params: { lang: ValidLocale; },
}) {
  const dict = await getTranslator(lang)
  const reportsData = getAllProducts(lang)
  const [reports] = await Promise.all([reportsData])

  return (
    <>
      <PageHeading title={dict.menu.report}/> 
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
