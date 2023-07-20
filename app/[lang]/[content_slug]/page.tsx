'use client'

import { useState } from 'react'
import Link from 'next/link'
import cls from 'classnames'
import { ValidLocale } from '@/i18n/settings'
import { objectToGetParams } from '@/utils/lib'
import styles from './index.module.scss'

export default function Category({
  params: { lang, content_slug },
}: {
  params: { lang: ValidLocale; content_slug: string; },
}) {
  const [isZoomed, setIsZoomed] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  console.log(content_slug)
  // const { t } = await getTranslation(lang, 'content-page')

  const shareLink = 'https://www.naver.com/'  // || window.location.toString()
  
  const copyURLButton = (e) => navigator.clipboard.writeText(shareLink)
  const handleFontSize = () => setIsZoomed(prevZoomed => !prevZoomed)
  const handleShareMenu = () => setIsOpen(isOpen => !isOpen)

  return (
    <main>
      <h2 id="content-header">Content Title</h2>

      <div style={{ background: 'black', height: '100vh' }}>
      </div>

      <Link href="#content-header">Scroll to top</Link>

      <div className="">
        <button onClick={handleShareMenu}>share</button>
        <div className={cls(styles.menu, { [styles.open]: !isOpen })}>
          <button onClick={copyURLButton}>URL</button>
          <a href={`mailto:${objectToGetParams({ subject: 'title', body: shareLink })}`}>Gmail</a>
          <a href={`https://linkedin.com/shareArticle?${objectToGetParams({ url: shareLink })}`}>Linkedin</a>
          <a href={`https://teams.microsoft.com/share?${objectToGetParams({ href: shareLink, msgText:shareLink })}`}>Teams</a>
        </div>
        <button onClick={handleFontSize} title="handle Font Size"> Size </button>
      </div>

      <div className={cls(styles.content, { [styles.large]: isZoomed })}>
        <p>This is some text for size test.</p>
        <p>This is some text for size test.</p>
        <p>This is some text for size test.</p>
        <ul>This is some text for size test.</ul>
      </div>

    </main>
  )
}
