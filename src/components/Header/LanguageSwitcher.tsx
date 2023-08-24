'use client'

import { ValidLocale } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import LanguageImg from '@/imgs/lang_black.png'

export default function LanguageSwitcher({ 
  lang, 
  isSimple = false,
}: {
   lang: ValidLocale 
  isSimple?: boolean
}) {
  const pathName = usePathname()
  const otherLocale = lang === 'ko' ? 'en' : 'ko'
  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments[1] = locale
    return segments.join('/')
  }

  return (
    <Link href={redirectedPathName(otherLocale)}>
      <Image src={LanguageImg} alt="Change Language" />
      {!isSimple && lang.toUpperCase()}
    </Link>
  )
}
