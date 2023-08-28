import Image from 'next/image'
import { Options, TI18N } from '@/types'

import CategoryFilterBg from '@/imgs/category_filter_bg.png'
import TrashIcon from '@/imgs/trash.png'

export default function CountryFilter({
  t,
}: {
  t: TI18N
}) {
  const countries = t('country_filter_options', { returnObjects: true }) as Options

  return (
    <div id="category-filter">
      <Image src={CategoryFilterBg} alt="speech bubble bg" className="speech-bubble" />

      <div className="button-wrap-1">
        {countries?.map(item => (
          <button key={item.value}>
            {item.value?.toUpperCase()}
          </button>
        ))}
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