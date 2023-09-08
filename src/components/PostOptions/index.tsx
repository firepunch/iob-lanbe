'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Bookmark from '../Bookmark'
import ShareLinks from './ShareLinks'

import ScrollTopImg from '@/imgs/scrolltop.png'
import ShareImg from '@/imgs/share.png'

interface ContentOptionsProps {
  isSaved?: boolean
  metaKey: string
  contentId: number
  onFetchData: () => void
  onFontSize: () => void
}

export default function PostOptions ({
  isSaved = false,
  metaKey,
  contentId,
  onFetchData,
  onFontSize,
}: ContentOptionsProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div id="content-fixed-icons">
      <div className="buttons-wrap">
        <button type="button" className="scroll-top arrow-button">
          <a href="#top">
            <Image src={ScrollTopImg} alt="Scroll to top" />
          </a>
        </button>
    
        <button type="button" className="bookmark-button">
          <Bookmark 
            isSaved={isSaved}
            metaKey={metaKey}
            contentId={contentId}
            onFetchData={onFetchData} 
          />
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
