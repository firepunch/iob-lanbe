'use client'

import { useTranslation } from '@/i18n/client'
import { ValidLocale } from '@/i18n/settings'
import closeIcon from '@/imgs/close.png'
import searchThinIcon from '@/imgs/search_thin.png'
import { Options } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useState } from 'react'

export default function SearchWall({
  lang,
  onClose,
}: {
  lang: ValidLocale
  onClose: () => void
}) {
  const { t } = useTranslation(lang, 'search')
  const [keyword, setKeyword] = useState<string>()
  const keywords1 = t('keywords-row1', { returnObjects: true }) as Options
  const keywords2 = t('keywords-row2', { returnObjects: true }) as Options

  const handleSearch = () => {
    window.location.replace(`/${lang}/search/${keyword}`)
  }

  return (
    <>
      <section id="search">
        <button type="button">
          <Image src={closeIcon} alt="Close" onClick={onClose} />
        </button>

        <div id="input-recommendations">
          <div className="search-bar-wrap">
            <input 
              type="text"
              id="search-bar"
              name="search-bar"
              placeholder="Search" 
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
            />
            <button type="submit" onClick={handleSearch} className="search-button">
              <Image src={searchThinIcon} alt="Search" />
            </button>
          </div>

          <div className="recommendations">
            <h3>{t('recommended')}</h3>

            <div className="keywords-wrap">
              <div className="keywords-row">
                {keywords1?.map(item => (
                  <Link
                    key={item.value}
                    href={`/${lang}/search/${item.label}`} 
                    className="keyword"
                    onClick={onClose}
                  >
                    <p>{item.label}</p>
                  </Link>
                ))}
              </div>
              <div className="keywords-row">
                {keywords2?.map(item => (
                  <Link
                    key={item.value}
                    href={`/${lang}/search/${item.label}`} 
                    className="keyword"
                    onClick={onClose}
                  >
                    <p>{item.label}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}