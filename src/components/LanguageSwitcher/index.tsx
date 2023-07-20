'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { languages } from '@/i18n/settings'

export default function LanguageSwitcher() {
  const pathName = usePathname()
  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments[1] = locale
    return segments.join('/')
  }

  return (
    <ul>
      {languages.map((locale) => (
        <li key={locale}>
          <Link href={redirectedPathName(locale)}>{locale}</Link>
        </li>
      ))}
    </ul>
  )
}