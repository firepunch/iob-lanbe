'use client'
 
import ArrowBlackIcon from '@/imgs/arrow_black.png'
import { TI18N } from '@/types'
import Image from 'next/image'

export default function Ideas({
  t,
}: {
  t: TI18N
}) {
  return (
    <>
      <h2>{t('ideas').toUpperCase()}</h2>
    </>
  )
}