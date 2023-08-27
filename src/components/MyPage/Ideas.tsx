'use client'
 
import Icons from '../Icons'
import { TI18N } from '@/types'
import Image from 'next/image'
import Link from 'next/link'

export default function Ideas({
  t,
}: {
  t: TI18N
}) {
  return (
    <>
      <div id="default-title">
        <h2>{t('ideas').toUpperCase()}</h2>
      </div>

      <div id="default-text">
        <p className="none-saved-text">{t('ideas_none')}</p>
        <p className="explore-text">{t('ideas_explore')}</p>

        <Link href="/category">
          <Icons type="arrowBlack" />
          <p>{t('see-all')}</p>
        </Link>
      </div>
    </>
  )
}