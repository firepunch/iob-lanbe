'use client'

import { useState } from 'react'
import Link from 'next/link'
import { objectToGetParams } from '@/utils/lib'
import cls from 'classnames'
import styles from './index.module.scss'

interface ContentOptionsProps {
  onChangeFont: () => void
}

export default function ContentOptions ({
  onChangeFont,
}: ContentOptionsProps) {
  const shareLink = 'https://www.naver.com/'  // || window.location.toString()

  const [isOpen, setIsOpen] = useState(false)

  const handleOpenShare = () => setIsOpen(isOpen => !isOpen)
  const handleCopy = (e) => navigator.clipboard.writeText(shareLink)

  return (
    <div className={styles.optionWrapper}>
      <Link href="#content-header">Scroll to top</Link>
      <button onClick={handleOpenShare}>share</button>
      <button onClick={onChangeFont}>Size</button>

      <div className={cls(styles.shareWrapper, { [styles.open]: isOpen })}>
        <button onClick={handleCopy}>URL</button>
        <a href={`mailto:${objectToGetParams({ subject: 'title', body: shareLink })}`}>Gmail</a>
        <a href={`https://linkedin.com/shareArticle?${objectToGetParams({ url: shareLink })}`}>Linkedin</a>
        <a href={`https://teams.microsoft.com/share?${objectToGetParams({ href: shareLink, msgText:shareLink })}`}>Teams</a>
      </div>
    </div>
    
  )
}
