'use client'

import { ValidLocale } from '@/types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function LanguageSwitcher({ lang }: { lang: ValidLocale }) {
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
      <img src="./imgs/lang_black.png" alt="Change language" />
      {lang.toUpperCase()}
    </Link>
  )
}
