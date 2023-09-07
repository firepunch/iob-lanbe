'use client'

import { ValidLocale } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import LangBlackImg from '@/imgs/lang_black.png'
import LangWhiteImg from '@/imgs/lang_white.png'
import useContentState from '@/stores/contentStore'

const WHITE_ICONS = [
  'about',
  'project',
  'welcome',
]

const CHANGE_URL = [
  'contents',
  'report',
]

export default function LanguageSwitcher({ 
  lang, 
  isSimple = false,
  className,
}: {
  lang: ValidLocale 
  isSimple?: boolean
  className?: string
}) {
  const post = useContentState(state => state.post)
  const pathName = usePathname()
  const otherLocale = lang === 'ko' ? 'en' : 'ko'
  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments[1] = locale

    if (CHANGE_URL.find(item => pathName.includes(item))) {
      let targetIdx = segments.length - 1
      let origin = segments[segments.length - 1]
      if (origin === '' ) {
        targetIdx -= 1
        origin = segments[targetIdx]
      }
      segments[targetIdx] = post?.translations?.[0]?.slug || origin
    }

    return segments.join('/')
  }

  return (
    <Link href={redirectedPathName(otherLocale)} className={className}>
      <Image 
        src={
          WHITE_ICONS.find(item => pathName.includes(item)) ?
            LangWhiteImg :
            LangBlackImg
        }
        alt="Change Language" 
        className="language-icon"
      />
      {!isSimple && otherLocale.toUpperCase()}
    </Link>
  )
}
