import { PageHeading, ReportCard } from '@/components/index'
import { getAllProducts } from '@/api_gql'
import { getTranslation } from '@/i18n/index'
import { ValidLocale } from '@/i18n/settings'
import Link from 'next/link'

export async function generateMetadata({ params: { lang } }) {
  const { t } = await getTranslation(lang, 'second-page')
  return { title: t('h1') }
}

export default async function Reports({
  params: { lang },
}: {
  params: { lang: ValidLocale; },
}) {
  const { t } = await getTranslation(lang, 'second-page')
  const reportsData = getAllProducts(lang)
  const [reports] = await Promise.all([reportsData])

  return (
    <>
      <PageHeading title={t('h1')} /> 
      {reports?.map(({ node }) => (
        <Link key={node.id} href={`${node.slug}`}>
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
