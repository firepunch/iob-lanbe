'use client'
 
import ArrowBlackIcon from '@/imgs/arrow_black.png'
import { TI18N } from '@/types'
import Image from 'next/image'

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
            <button>Saved (0)</button>
            <button>Read (0)</button>
          </div>
        </div>
      </div>


      <div id="default-text">
        <p className="none-saved-text">You haven't saved or read anything yet.</p>
        <p className="explore-text">Check out our contents page and explore now!</p>

        <a href="allcontents.html">
          <Image src={ArrowBlackIcon} alt="Arrow"/>
          <p>See all</p>
        </a>
      </div>
    </>
  )
}