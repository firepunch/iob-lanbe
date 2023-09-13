'use client'

import { ValidLocale } from '@/i18n/settings'
import { TI18N } from '@/types'
import Link from 'next/link'
import Image from 'next/image'
import SampleBg from '@/imgs/thumbnail_sample3.jpg'

export default function DownloadWall({
  t,
  lang,
  userId,
  bgImage,
  downloadLink = '',
  onDownload,
}: {
  t: TI18N
  lang: ValidLocale
  userId?: number
  bgImage: string
  downloadLink: string
  onDownload: () => void
}) {
  return (
    <section id="report-download">

      <Image 
        className="report-download-bg"
        src={bgImage !== '' ? bgImage : SampleBg} 
        alt="Report Image"
        fill
        sizes="100vw"
      />

      <div className="report-download-content">
        {userId ? (
          <>
            <Link 
              href={downloadLink} 
              className="download-link" 
              target="_blank"
              onClick={onDownload}
            >
              {t('download')}
            </Link>

            <div className="download-text">
              <p>{t('download_cta')}</p>
            </div>
          </>
        ) : (
          <>
            <Link href={`/${lang}/sign-in`} className="download-link">
              {t('sign_in')}
            </Link>

            <div className="download-text sign-in-text">
              <p>{t('sign_in_cta')}</p>
            </div>
          </>
        )}
      </div>
      
    </section>
  )
}