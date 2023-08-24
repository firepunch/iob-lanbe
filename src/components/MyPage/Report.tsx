'use client'
 
import { TI18N } from '@/types'
import Link from 'next/link'
import Icons from '../Icons'

export default function Report({
  t,
}: {
  t: TI18N
}) {
  return (
    <>
      <div id="default-title">
        <h2>{t('report').toUpperCase()}</h2>

        <div className="filters-wrap">
          <div className="country-category">
            <button>{t('country')}</button>
            <button>{t('category')}</button>
          </div>

          <div className="saved-read">
            <button>Saved (0)</button>
            <button>Purchased (0)</button>
          </div>
        </div>
      </div>


      <div id="default-text">
        <p className="none-saved-text">You haven't saved or purchased anything yet.</p>
        <p className="explore-text">Check out our reports page and explore now!</p>

        <Link href="/report">
          <Icons type="arrowBlack" />
          <p>See all</p>
        </Link>
      </div>
    </>
  )
}