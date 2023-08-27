'use client'

import { ValidLocale } from '@/i18n/settings'
import Image from 'next/image'
import useUserState from '@/stores/userStore'
import Link from 'next/link'
import { useTranslation } from '@/i18n/client'
import { Icons } from '@/components'
import checkIcon from '@/imgs/check.png'
import { useEffect } from 'react'
import { fetchOrder } from '@/api_gql'

export default function CheckoutCompleted({
  params: { lang, order_id },
}: {
  params: { lang: ValidLocale; order_id: string },
}) {
  const { t } = useTranslation(lang, 'completed')
  const { download, updateDownload } = useUserState(state => state)

  console.log(download)

  useEffect(() => {
    if (!download) {
      fetchOrder(order_id).then(result => {
        updateDownload(result.downloadableItems?.nodes?.[0])
      })
    }
  }, [])

  return (
    <section id="payment-completed">
      <div id="payment-completed-wrap">
        <Image src={checkIcon} alt="Check" />
        <h3>{t('h3')}</h3>

        {download?.download?.file && (
          <Link href={download.download.file} className="cta">
            <Icons type="arrowWhite" />
            <p>{t('download')}</p>
          </Link>
        )}
      </div>
    </section>
  )
}
