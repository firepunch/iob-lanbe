'use client'

import { Footer, Header, SimpleHeader } from '@/components'
import { ValidLocale } from '@/i18n/settings'
import useUserState from '@/stores/userStore'
import { IResponseUser } from '@/types/store'
import { AUTH_TOKEN, getStorageData } from '@/utils/lib'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

const SIMPLE_HEADER_MAP = [
  'sign-in',
  'sign-up',
]

const WHITE_ICONS = [
  'about',
  'project',
]

export default function LocaleLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode,
  params: { lang: ValidLocale }
}) {
  const pathName = usePathname()
  const className = WHITE_ICONS.find(item => pathName.includes(item))
  const { user, updateUser } = useUserState(state => state)
  const [storageUser] = getStorageData(AUTH_TOKEN)

  useEffect(( ) => {
    if (storageUser && !user) {
      updateUser(storageUser as IResponseUser)
    }
  }, [storageUser])
  
  return (
    <html lang={lang}>
      <head />
      <body className={`iob-${lang} ${className ? `iob-${className}` : ''}`}>
        {
          SIMPLE_HEADER_MAP.find(item => pathName.includes(item)) ?
            <SimpleHeader lang={lang} /> :
            <Header lang={lang} /> 
        }
        <main>
          {children}
        </main>
        <Footer lang={lang} />
      </body>
    </html>
  )
}
