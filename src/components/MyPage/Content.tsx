'use client'
 
import { TI18N } from '@/types'
import Link from 'next/link'
import Icons from '../Icons'

export default function Content({
  t,
}: {
  t: TI18N
}) {
  
  return (
    <>
      <div id="default-title">
        <h2>{t('content').toUpperCase()}</h2>

        <div className="filters-wrap">
          <div className="country-category">
            <button>{t('country')}</button>
            <button>{t('category')}</button>
          </div>

          <div className="saved-read">
            <button>{t('saved')}(0)</button>
            <button>{t('purchased')} (0)</button>
          </div>
        </div>
      </div>


      <div id="default-text">
        <p className="none-saved-text">{t('content_none')}</p>
        <p className="explore-text">{t('content_explore')}</p>

        <Link href="/category">
          <Icons type="arrowBlack" />
          <p>{t('see-all')}</p>
        </Link>
      </div>
    </>
  )
}