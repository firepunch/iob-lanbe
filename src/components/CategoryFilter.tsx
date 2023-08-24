import Image from 'next/image'
import { TI18N } from '@/types'

import CategoryFilterBg from '@/imgs/category_filter_bg.png'
import TrashIcon from '@/imgs/trash.png'

export default function CategoryFilter({
  t,
}: {
  t: TI18N
}) {
  return (
    <div id="category-filter">
      <Image src={CategoryFilterBg} alt="speech bubble bg" className="speech-bubble" />

      <div className="button-wrap-1">
        <p>{t('market_research')}</p>

        <button type="button">{t('market')}</button>
        <button type="button">{t('corporate')}</button>
        <button type="button">{t('consumer')}</button>
      </div>

      <div className="button-wrap-2">
        <p>{t('market_entry')}</p>

        <button type="button">{t('marketing')}</button>
        <button type="button">{t('partnership')}</button>
        <button type="button">{t('channel')}</button>
        <button type="button">{t('payment')}</button>
      </div>

      <div className="selected-clearbtn">
        <p>{`2 ${t('selected')}`}</p>

        <button type="button">
          <Image src={TrashIcon} alt="Trash" />
          <p>{t('clear_all')}</p>
        </button>
      </div>
    </div>
  )
}