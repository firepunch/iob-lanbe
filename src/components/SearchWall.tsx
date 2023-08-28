'use client'

import { searchRequest } from '@/api_wp'
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

  const handleSearch = async () => {
    redirect(`${lang}/search/${keyword}`)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const formData = new FormData()
      // const { id, value } = e.target
      // formData.set(id, value)
      // setFormData(formData)
      formData.append('first-name', 'yu')
      formData.append('last-name', 'da')
      formData.append('user-email', 'ex@gmail.com')
      formData.append('message', 'hello')
      console.log(e.target)

      await searchRequest(formData)
    } catch (error) {
      console.error('이메일 폼 전송 에러:', error)
    }
  }

  return (
    <>
      <section id="search">
        <button type="button">
          <Image src={closeIcon} alt="Close" />
        </button>

        <div id="input-recommendations">
          <input 
            type="text"
            id="search-bar"
            name="search-bar"
            placeholder="Search" 
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
          />
          <button type="submit" onClick={handleSearch}>
            <Image src={searchThinIcon} alt="Search" />
          </button>

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