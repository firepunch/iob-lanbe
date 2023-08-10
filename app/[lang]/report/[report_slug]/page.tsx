import { getProductBySlug } from '@/api_gql'
import { getTranslation } from '@/i18n/index'
import { ValidLocale } from '@/i18n/settings'
import Link from 'next/link'

export async function generateMetadata({ params: { lang } }) {
  const { t } = await getTranslation(lang, 'second-page')
  return { title: t('h1') }
}

export default async function Report({
  params: { lang, report_slug },
}: {
  params: { lang: ValidLocale; report_slug: string; },
}) {
  const { t } = await getTranslation(lang, 'second-page')
  const reportData = getProductBySlug(report_slug)
  const [report] = await Promise.all([reportData])

  return (
    <>
      <h2>{t('h1')}</h2>
      <p>{report.name}</p>
      <Link href={`/${lang}/checkout`}>
        Pay now
      </Link>
    </>
  )
}
