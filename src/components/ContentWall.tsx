'use client'

import { ValidLocale } from '@/i18n/settings'
import { TI18N } from '@/types'
import Link from 'next/link'

export default function ContentWall({
  lang,
  t,
}: {
  lang: ValidLocale
  t: TI18N
}) {
  return (
    <section className="signin-wall">
      <h3>{t('wall_h3')}</h3>
      <p>
        {t('wall_p1')}
        <br className="mobile-br"/>
        <span>{t('wall_keyword1')}</span>
        {t('wall_p2')}
        <span>{t('wall_keyword2')}</span>
        {t('wall_p3')}
      </p>
      <p className="desc">
        {t('wall_desc1')}
        <br className="mobile-br"/>
        {t('wall_desc2')}
      </p>
      <div className="button-wrapper">
        <Link href={`/${lang}/sign-up`}>
          {t('wall_signup')}
        </Link>
        <Link href={`/${lang}/sign-in`} className="black">
          {t('wall_signin')}
        </Link>
      </div>
    </section>
  )
}