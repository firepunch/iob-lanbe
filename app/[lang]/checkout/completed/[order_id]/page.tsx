'use client'

import { ValidLocale } from '@/i18n/settings'
import useUserState from '@/stores/userStore'
import Link from 'next/link'
import { useTranslation } from '@/i18n/client'

export default function CheckoutCompleted({
  params: { lang, order_id },
}: {
  params: { lang: ValidLocale; order_id: string },
}) {
  const { t } = useTranslation(lang, 'completed')
  const { download } = useUserState(state => state)

  if (!download) {
    console.log(order_id)
  }

  return (
    <>
      <h2>Payment Completed!</h2>
      <Link href={`/${lang}/report}`}>
        Download PDF
      </Link>
    </>
  )
}
