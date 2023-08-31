'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { objectToGetParams } from '@/utils/lib'
import Bookmark from '../Bookmark'

import ScrollTopImg from '@/imgs/scrolltop.png'
import ShareImg from '@/imgs/share.png'

interface ContentOptionsProps {
  isSaved?: boolean
  onToggleBookmark: () => void
  onFontSize: () => void
}

export default function PostOptions ({
  isSaved = false,
  onToggleBookmark,
  onFontSize,
}: ContentOptionsProps) {
  const shareLink = window.location.toString()

  const [isOpen, setIsOpen] = useState(false)

  const handleToggleShare = () => setIsOpen(() => !isOpen)
  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareLink)
    alert('copied')
    handleToggleShare()
  }

  return (
    <>
      <div id="content-fixed-icons">
        <div className="buttons-wrap">
          <button type="button" className="scroll-top arrow-button">
            <Link href="#top-title">
              <Image src={ScrollTopImg} alt="Scroll to top" />
            </Link>
          </button>
    
          <button type="button" className="bookmark-button">
            <Bookmark isSaved={isSaved} onToggle={onToggleBookmark} />
          </button>
    
          <div className="share-button">
            <button type="button" onClick={handleToggleShare}>
              <Image src={ShareImg} alt="Share" />
            </button>

            <div className={`share-menu ${isOpen ? 'show' : ''}`}>
              <button 
                className="share-link"
                onClick={handleCopy}
              >
                URL
              </button>
              <Link 
                className="share-link"
                target="_blank"
                href={`mailto:${objectToGetParams({ subject: 'title', body: shareLink })}`}
                onClick={handleToggleShare}
              >
                Gmail
              </Link>
              <Link 
                className="share-link"
                target="_blank"
                href={`https://linkedin.com/shareArticle?${objectToGetParams({ url: shareLink })}`}
                onClick={handleToggleShare}
              >
                Linkedin
              </Link>
              <Link 
                className="share-link"
                target="_blank"
                href={`https://teams.microsoft.com/share?${objectToGetParams({ href: shareLink, msgText:shareLink })}`}
                onClick={handleToggleShare}
              >
                Teams
              </Link>
            </div>
          </div>
    
          <button type="button" className="font-size" onClick={onFontSize}>
            <p>Aa</p>
          </button>
        </div>
      </div>
    </>
  )
}
