'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { locales } from '../../../i18n'

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
      {locales.map((locale) => (
        <li key={locale}>
          <Link href={redirectedPathName(locale)}>{locale}</Link>
        </li>
      ))}
    </ul>
  )
}