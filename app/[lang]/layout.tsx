'use client'

import { Footer, Header, SimpleHeader } from '@/components'
import { ValidLocale } from '@/i18n/settings'
import useUserState from '@/stores/userStore'
import { IResponseUser } from '@/types/store'
import { AUTH_TOKEN, getStorageData } from '@/utils/lib'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const SIMPLE_HEADER_MAP = [
  'sign-in',
  'sign-up',
]

const DESIGN_PAGE = [
  'about',
  'project',
  'welcome',
  'sign-in',
  'sign-up',
  'my-page',
]

export default function LocaleLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode,
  params: { lang: ValidLocale }
}) {
  const pathName = usePathname()
  const page = DESIGN_PAGE.find(item => (
    item === 'sign-in' ? 
      pathName.includes(item) && !pathName.includes('password') : 
      pathName.includes(item)
  ))
  const { user, updateUser } = useUserState(state => state)
  const [storageUser] = getStorageData(AUTH_TOKEN)
  const [openMenu, setOpenMenu] = useState<'search' | undefined>()

  useEffect(( ) => {
    if (storageUser && !user) {
      updateUser(storageUser as IResponseUser)
    }
  }, [storageUser])

  const handleOpenMenu = (menu?: 'search' | undefined) => setOpenMenu(menu)
  
  return (
    <html lang={lang}>
      <head />
      <body className={`iob-${lang} ${page ? `iob-${page}` : ''} ${openMenu ? `iob-open` : ''}`}>
        {
          SIMPLE_HEADER_MAP.find(item => pathName.includes(item)) ?
            <SimpleHeader lang={lang} openMenu={openMenu} onOpenMenu={handleOpenMenu} /> :
            <Header lang={lang} openMenu={openMenu} onOpenMenu={handleOpenMenu} />
        }
        <main>
          {children}
        </main>
        <Footer lang={lang} />
      </body>
    </html>
  )
}
