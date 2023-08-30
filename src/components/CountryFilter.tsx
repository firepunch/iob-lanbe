import Image from 'next/image'
import { Option, Options, TI18N, ValidLocale } from '@/types'

import CategoryFilterBg from '@/imgs/category_filter_bg.png'
import TrashIcon from '@/imgs/trash.png'

export interface CountryOptions extends Option { 
  slug: string 
}[]

export default function CountryFilter({
  lang,
  ct,
  value = [],
  onChange,
}: {
  lang: ValidLocale,
  ct: TI18N,
  value: string[],
  onChange: (value: string[]) => void
}) {
  const countries = ct('country_filter_options', { returnObjects: true }) as CountryOptions
  const handleToggle = (isSelected: boolean, selected: string) => {
    if (isSelected) {
      const newValue = value.filter(item => item !== selected)
      onChange(newValue)
    } else {
      onChange([...value, selected])
    }
  }
  
  return (
    <div id="category-filter">
      <Image src={CategoryFilterBg} alt="speech bubble bg" className="speech-bubble" />

      <div className="button-wrap-1">
        {countries?.map(item => {
          const isSelected = value.includes(item.label)
          return (
            <button 
              key={item.value} 
              className={`${isSelected ? 'selected' : ''}`}
              onClick={() => handleToggle(isSelected, `${item.slug}-${lang}`)}
            >
              {item.value?.toUpperCase()}
            </button>
          )
        })}
      </div>

      <div className="selected-clearbtn">
        <p>{`${value.length} ${ct('selected')}`}</p>

        <button type="button" onClick={() => onChange([])}>
          <Image src={TrashIcon} alt="Trash" />
          <p>{ct('clear_all')}</p>
        </button>
      </div>
    </div>
  )
}