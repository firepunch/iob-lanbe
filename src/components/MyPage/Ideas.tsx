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
        <p className="none-saved-text">You don’t have any idea notes yet.</p>
        <p className="explore-text">You can write up to 4 notes per content; check out our contents and write down your ideas at the end!</p>

        <Link href="/category">
          <Icons type="arrowBlack" />
          <p>See all</p>
        </Link>
      </div>
    </>
  )
}