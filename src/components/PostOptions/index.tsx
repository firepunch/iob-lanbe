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
              <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.7277 1.7337C16.4889 -0.505104 12.903 -0.57566 10.5794 1.52233L10.5738 1.5167L7.58021 4.50998C7.03741 5.05278 6.62682 5.67682 6.33896 6.34087C5.76474 6.59019 5.21986 6.92873 4.73249 7.36896L4.72686 7.36333L1.73358 10.3566C-0.57786 12.668 -0.57786 16.4158 1.73358 18.7275C4.04502 21.0393 7.79277 21.0393 10.1045 18.7275L13.0981 15.734L13.0924 15.7283C13.5324 15.241 13.8712 14.6961 14.1202 14.1219C14.7843 13.834 15.4083 13.4234 15.9511 12.8806L18.9447 9.88703L18.9391 9.8814C21.0368 7.5581 20.9662 3.97221 18.7277 1.7337ZM8.08448 16.6005L8.08418 16.6008C6.91764 17.7673 5.02657 17.7673 3.86033 16.6008C2.69379 15.4342 2.69379 13.5432 3.86033 12.3769L3.86062 12.3766L6.04459 10.1927C6.30102 11.1772 6.80914 12.1095 7.58021 12.8809C8.35158 13.6523 9.28392 14.1601 10.2681 14.4168L8.08448 16.6005ZM9.70696 10.7542C9.17453 10.2217 8.88786 9.53811 8.84161 8.84144C9.53828 8.88769 10.2216 9.17436 10.7543 9.70679C11.2868 10.2392 11.5737 10.9228 11.6197 11.6195C10.923 11.573 10.2394 11.2866 9.70696 10.7542ZM16.7848 7.90021L16.6012 8.08371L16.601 8.08401L14.4161 10.2686C14.1597 9.28405 13.6518 8.3517 12.8808 7.58034C12.1094 6.80897 11.1768 6.30144 10.1922 6.04471L12.3768 3.86016C12.3768 3.86016 12.3768 3.86016 12.3771 3.85986L12.3774 3.85956L12.5609 3.67606L12.5695 3.68436C13.7432 2.69747 15.4967 2.75528 16.6012 3.85956C17.7058 4.96385 17.7636 6.71796 16.7765 7.89131L16.7848 7.90021Z" fill="white"/>
              </svg>
                URL
            </button>
            <Link 
              className="share-link"
              target="_blank"
              href={`https://linkedin.com/shareArticle?${objectToGetParams({ url: shareLink })}`}
              onClick={handleToggleShare}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.9905 0H1.43429C0.642529 0 0 0.627417 0 1.40002V18.0278C0 18.8015 0.642529 19.4297 1.43429 19.4297H17.9905C18.7828 19.4297 19.4297 18.8015 19.4297 18.0278V1.40002C19.4297 0.627417 18.7828 0 17.9905 0ZM5.76252 16.5568H2.87937V7.28479H5.76252V16.5568ZM4.32095 6.017C3.39723 6.017 2.65053 5.26842 2.65053 4.34551C2.65053 3.42394 3.39723 2.67536 4.32095 2.67536C5.24251 2.67536 5.99109 3.42394 5.99109 4.34551C5.99109 5.26842 5.24251 6.017 4.32095 6.017ZM16.5557 16.5568H13.6772V12.048C13.6772 10.9724 13.6561 9.58936 12.1792 9.58936C10.6793 9.58936 10.4507 10.7608 10.4507 11.97V16.5571H7.57002V7.28479H10.3347V8.55095H10.3741C10.7589 7.82234 11.6991 7.05352 13.1013 7.05352C16.0174 7.05352 16.556 8.97328 16.556 11.4708L16.5557 16.5568Z" fill="white"/>
              </svg>
                Linkedin
            </Link>
            <Link 
              className="share-link"
              target="_blank"
              href={`mailto:${objectToGetParams({ subject: 'title', body: shareLink })}`}
              onClick={handleToggleShare}
            >
              <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.591 0H0.672649C0.301587 0 0 0.30185 0 0.672913V2.02663C0 2.089 0.0676334 2.16058 0.122898 2.18953L10.0668 7.86942C10.0926 7.88442 10.1216 7.89126 10.1505 7.89126C10.18 7.89126 10.2097 7.88363 10.2358 7.8681L19.8792 2.19506C19.9334 2.16479 20.0771 2.08479 20.1311 2.04795C20.1963 2.00347 20.2637 1.96321 20.2637 1.88347V0.67265C20.2637 0.30185 19.9621 0 19.591 0Z" fill="white"/>
                <path d="M20.1795 4.06891C20.1269 4.03838 20.0627 4.0397 20.0098 4.06996L14.5525 7.28084C14.5088 7.3061 14.4786 7.35084 14.4712 7.40137C14.4646 7.45163 14.4804 7.50295 14.5144 7.54005L19.9724 13.4236C20.0048 13.4586 20.049 13.4773 20.0953 13.4773C20.1161 13.4773 20.1371 13.4734 20.1569 13.466C20.2213 13.4405 20.2634 13.3786 20.2634 13.3092V4.21497C20.2634 4.15444 20.2316 4.09891 20.1795 4.06891Z" fill="white"/>
                <path d="M12.9802 8.35739C12.9266 8.29923 12.8402 8.28634 12.7721 8.32634L10.5847 9.61348C10.3278 9.76454 9.99885 9.76585 9.74042 9.61901L7.81537 8.51924C7.75169 8.48319 7.67142 8.49187 7.61774 8.54187L0.307543 15.3226C0.268595 15.3589 0.249121 15.4113 0.25491 15.4642C0.2607 15.5171 0.29149 15.5644 0.337544 15.591C0.451231 15.6578 0.560971 15.6897 0.672553 15.6897H19.3975C19.4646 15.6897 19.5252 15.65 19.5515 15.5884C19.5783 15.5273 19.5662 15.456 19.5204 15.4071L12.9802 8.35739Z" fill="white"/>
                <path d="M6.00911 7.73991C6.04858 7.70386 6.06832 7.6507 6.06253 7.5978C6.05674 7.54464 6.02516 7.49753 5.97884 7.47069L0.250796 4.19903C0.199742 4.16955 0.135267 4.17008 0.0831601 4.20008C0.0315798 4.23008 0 4.28561 0 4.34535V12.9298C0 12.9964 0.0394747 13.0569 0.100529 13.0835C0.122108 13.0932 0.145004 13.0979 0.168162 13.0979C0.209479 13.0979 0.250796 13.0824 0.282376 13.0529L6.00911 7.73991Z" fill="white"/>
              </svg>
                Email
            </Link>
              
            <Link 
              className="share-link"
              target="_blank"
              href={`https://teams.microsoft.com/share?${objectToGetParams({ href: shareLink, msgText:shareLink })}`}
              onClick={handleToggleShare}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="9.52381" height="9.52381" rx="1" fill="white"/>
                <rect y="10.9526" width="9.52381" height="9.04762" rx="1" fill="white"/>
                <rect x="10.9521" width="9.04762" height="9.52381" rx="1" fill="white"/>
                <rect x="10.9521" y="10.9526" width="9.04762" height="9.04762" rx="1" fill="white"/>
              </svg>
                Teams
            </Link>
          </div>
        </div>
    
        <button type="button" className="font-size" onClick={onFontSize}>
          <p>Aa</p>
        </button>
      </div>
    </div>
  )
}
