import { getProductBySlug } from '@/utils/api'
import { ValidLocale, getTranslator } from 'i18n'
import { Button } from '@/components'

export default async function Report({
  params: { lang, report_slug },
}: {
  params: { lang: ValidLocale; report_slug: string; },
}) {
  const dict = await getTranslator(lang)
  const reportData = getProductBySlug(report_slug)
  const [report] = await Promise.all([reportData])

  return (
    <>
      <h2>{dict.menu.about}</h2>
      <p>{report.name}</p>
      <a href={`/${lang}/checkout`}>Pay now</a>
    </>
  )
}
