'use client'

import Image from 'next/image'
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
        <button  className="scroll-top arrow-button">
          <a href="#top">
            <Image src={ScrollTopImg} alt="Scroll to top" />
          </a>
        </button>
    
        <button  className="bookmark-button">
          <Bookmark 
            isSaved={isSaved}
            metaKey={metaKey}
            contentId={contentId}
            onFetchData={onFetchData} 
          />
        </button>
    
        <div className="share-button">
          <button onClick={() => setIsOpen(() => !isOpen)}>
            <Image src={ShareImg} alt="Share" className="share-icon" />
          </button>
          {isOpen && (
            <ShareLinks onClose={() => setIsOpen(() => !isOpen)} />
          )}
        </div>
    
        <button  className="font-size" onClick={onFontSize}>
          <p>Aa</p>
        </button>
      </div>
    </div>
  )
}
