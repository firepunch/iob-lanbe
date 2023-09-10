'use client'

import { ValidLocale } from '@/i18n/settings'
import { TI18N } from '@/types'
import Link from 'next/link'
import Image from 'next/image'
import SampleBg from '@/imgs/thumbnail_sample3.jpg'

export default function DownloadWall({
  t,
  bgImage,
  downloadLink = '',
  onDownload,
}: {
  t: TI18N
  bgImage: string
  downloadLink: string
  onDownload: () => void
}) {
  return (
    <section id="report-download">

      {/* <!-- 배경은 워드프레스에서 직접 추가 가능하게 --> */}
      <div id="report-titlepage-image">
        <Image 
          src={bgImage !== '' ? bgImage : SampleBg} 
          alt="Report Image"
          fill
          sizes="100vw"
        />
      </div>

      <Link 
        href={downloadLink} 
        className="download-link" 
        target="_blank"
        onClick={onDownload}
      >
        {t('download')}
      </Link>

      <div className="download-text">
        <p>
          {t('download_cta')}
        </p>
      </div>

    </section>
  )
}