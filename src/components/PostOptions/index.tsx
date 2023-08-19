'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { objectToGetParams } from '@/utils/lib'
import cls from 'classnames'
import styles from './index.module.scss'
import Bookmark from '../Bookmark'

import ScrollTopImg from '@/imgs/scrolltop.png'
import ShareImg from '@/imgs/share.png'

interface ContentOptionsProps {
  isSaved?: boolean
  onToggleBookmark: ({ isSaved, databaseId }) => void
  onToggleFontSize: () => void
}

export default function PostOptions ({
  isSaved = false,
  onToggleBookmark,
  onToggleFontSize,
}: ContentOptionsProps) {
  const shareLink = 'https://www.naver.com/'  // || window.location.toString()

  const [isOpen, setIsOpen] = useState(false)

  const handleOpenShare = () => setIsOpen(isOpen => !isOpen)
  const handleCopy = () => navigator.clipboard.writeText(shareLink)

  return (
    <>
      <div id="content-fixed-icons">
        <div className="buttons-wrap">
          <button type="button" className="scroll-top">
            <Link href="#top-title">
              <Image src={ScrollTopImg} alt="Scroll to top" />
            </Link>
          </button>
    
          <button type="button">
            <Bookmark isSaved={isSaved} onToggle={onToggleBookmark} />
          </button>
    
          <button type="button" className="share" onClick={handleOpenShare}>
            <Image src={ShareImg} alt="Share" />
          </button>
    
          <button type="button" className="font-size" onClick={onToggleFontSize}>
            <p>Aa</p>
          </button>
        </div>
      </div>
      
      {/* <div className={cls(styles.shareWrapper, { [styles.open]: isOpen })}>
        <button onClick={handleCopy}>URL</button>
        <a href={`mailto:${objectToGetParams({ subject: 'title', body: shareLink })}`}>Gmail</a>
        <a href={`https://linkedin.com/shareArticle?${objectToGetParams({ url: shareLink })}`}>Linkedin</a>
        <a href={`https://teams.microsoft.com/share?${objectToGetParams({ href: shareLink, msgText:shareLink })}`}>Teams</a>
      </div> */}
    </>
  )
}
