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
  'my-page',
  'sign-in',
]

const CHANGE_URL = [
  'contents',
  'report',
]

export default function LanguageSwitcher({ 
  lang, 
  isSimple = false,
}: {
  lang: ValidLocale 
  isSimple?: boolean
}) {
  const { post, report } = useContentState(state => state)
  const pathName = usePathname()
  const otherLocale = lang === 'ko' ? 'en' : 'ko'
  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments[1] = locale

    if (segments.length !== 4 && CHANGE_URL.find(item => pathName.includes(item))) {
      let targetIdx = segments.length - 1
      let origin = segments[segments.length - 1]
      if (origin === '' ) {
        targetIdx -= 1
        origin = segments[targetIdx]
      }

      const contentSlug = pathName.includes('contents') ? post?.translations?.[0]?.slug : report?.translations?.[0]?.slug
      segments[targetIdx] = contentSlug || origin
    }

    return segments.join('/')
  }

  return (
    <Link href={redirectedPathName(otherLocale)} className="language-link">
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
