import { TI18N, ValidLocale } from '@/types'
import Image from 'next/image'
import { getUniqueArr } from '@/utils/lib'
import CategoryFilterBg from '@/imgs/category_filter_bg.png'
import TrashIcon from '@/imgs/trash.png'

type CountryOptions = {
  label: string
  value: string
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
      const newValue = getUniqueArr([...value, selected])
      onChange(newValue)
    }
  }
  
  return (
    <div id="category-filter" className="country-filter">
      <div className="arrow-top" />
      <div className="button-wrap-1">
        {countries?.map(item => {
          const isSelected = value.includes(`${item.slug}-${lang}`)
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