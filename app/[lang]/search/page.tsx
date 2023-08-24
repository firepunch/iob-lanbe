'use client'

import { SearchRequestForm } from '@/components'
import { ValidLocale } from '@/i18n/settings'
import { useTranslation } from '@/i18n/client'
import { useState } from 'react'
import { SearchRequest } from '@/api_wp'

export default function Search({
  params: { lang },
}: {
  params: { lang: ValidLocale; },
}) {
  const { t } = useTranslation(lang, 'search')
  const [errorCode, setErrorCode] = useState()

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

      const { code } = await SearchRequest(formData)
      setErrorCode(code)
    } catch (error) {
      console.error('이메일 폼 전송 에러:', error)
    }
  }

  return (
    <>
    <section id="search">
    <button type="button"><img src="./imgs/close.png" alt="Close"></button>

    <div id="input-recommendations">
        <form action="#" name="search-bar">
            <input type="text" id="search-bar" name="search-bar" placeholder="Search">
            <button type="button">
                <img src="./imgs/search_thin.png" alt="Search">
            </button>
        </form>

        <div class="recommendations">
            <h3>Recommended Keywords</h3>

            <div class="keywords-wrap">
                <div class="keywords-row">
                    <!-- no result page linked as example -->
                    <a href="search_noresults.html" class="keyword"><p>Indonesia</p></a>
                    <a href="search_results.html" class="keyword"><p>Vietnam</p></a>
                    <a href="#" class="keyword"><p>Thailand</p></a>
                    <a href="#" class="keyword"><p>Malaysia</p></a>
                </div>
                <div class="keywords-row">
                    <a href="#" class="keyword"><p>Digitalization</p></a>
                    <a href="#" class="keyword"><p>E-Commerce</p></a>
                    <a href="#" class="keyword"><p>Social Media</p></a>
                    <a href="#" class="keyword"><p>Culture</p></a>
                </div>
            </div>
        </div>
        
    </div>
</section>
    <SearchRequestForm
      t={t} 
      errorCode={errorCode}
      onSubmit={handleSubmit} 
    />
    </>
  )
}