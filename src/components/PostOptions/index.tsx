'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { objectToGetParams } from '@/utils/lib'
import Bookmark from '../Bookmark'
import ShareLinks from './ShareLinks'

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
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div id="content-fixed-icons">
      <div className="buttons-wrap">
        <button type="button" className="scroll-top arrow-button">
          <Link href="#top-title">
            <Image src={ScrollTopImg} alt="Scroll to top" />
          </Link>
        </button>
    
        <button type="button" className="bookmark-button">
          <Bookmark 
            isSaved={isSaved}
            onToggle={onToggleBookmark} />
        </button>
    
        <div className="share-button">
          <button type="button" onClick={() => setIsOpen(() => !isOpen)}>
            <Image src={ShareImg} alt="Share" />
          </button>
          {isOpen && (
            <ShareLinks onClose={() => setIsOpen(() => !isOpen)} />
          )}
        </div>
    
        <button type="button" className="font-size" onClick={onFontSize}>
          <p>Aa</p>
        </button>
      </div>
    </div>
  )
}
