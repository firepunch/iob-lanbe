import { ValidLocale } from '@/i18n/settings'
import Link from 'next/link'

export default async function Order({
  params: { lang },
}: {
  params: { lang: ValidLocale; },
}) {
  const reportSlug = 'report-1'

  return (
    <>
      <h2>Payment Completed!</h2>
      <Link href={`/${lang}/report/${reportSlug}`}>
        Download PDF
      </Link>
    </>
  )
}
