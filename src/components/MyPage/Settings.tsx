'use client'
 
import ArrowBlackIcon from '@/imgs/arrow_black.png'
import { TI18N } from '@/types'
import Image from 'next/image'

export default function Settings({
  t,
}: {
  t: TI18N
}) {
  return (
    <>
      <h2>{t('settings').toUpperCase()}</h2>
    </>
  )
}