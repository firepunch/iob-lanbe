import Image from 'next/image'
import { TI18N, ValidLocale } from '@/types'
import { getUniqueArr } from '@/utils/lib'
import CategoryFilterBg from '@/imgs/category_filter_bg.png'
import TrashIcon from '@/imgs/trash.png'

const categoryKeys = {
  market_research: ['market', 'corporate', 'consumer'],
  market_entry: ['marketing', 'partnership', 'channel', 'payment'],
}

export default function CategoryFilter({
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
    <div id="category-filter">
      <Image src={CategoryFilterBg} alt="speech bubble bg" className="speech-bubble" />

      <div className="button-wrap-1">
        <p>{ct('market_research')}</p>
        {categoryKeys.market_research.map(item => {
          const isSelected = value.includes(`${item}-${lang}`)
          return (
            <button 
              key={item}
              className={`${isSelected ? 'selected' : ''}`}
              onClick={() => handleToggle(isSelected, `${item}-${lang}`)}
            >
              {ct(item)}
            </button>
          )
        })}
      </div>

      <div className="button-wrap-2">
        <p>{ct('market_entry')}</p>
        {categoryKeys.market_entry.map(item => {
          const isSelected = value.includes(`${item}-${lang}`)
          return (
            <button 
              key={item}
              className={`${isSelected ? 'selected' : ''}`}
              onClick={() => handleToggle(isSelected, `${item}-${lang}`)}
            >
              {ct(item)}
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