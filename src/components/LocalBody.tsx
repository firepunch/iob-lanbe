'use client'

import useHasScroll from '@/hooks/useScroll'
import { ValidLocale } from '@/i18n/settings'
import useUserState from '@/stores/userStore'
import { IResponseUser } from '@/types/store'
import { AUTH_TOKEN, getStorageData } from '@/utils/lib'
import classNames from 'classnames'
import { usePathname } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import Analytics from './Analytics'
import Footer from './Footer'
import Header from './Header/Header'
import SimpleHeader from './Header/SimpleHeader'

const SIMPLE_HEADER_MAP = [
  'sign-in',
  'sign-up',
]

const DESIGN_PAGE = [
  'success',
  'about',
  'project',
  'welcome',
  'sign-in',
  'sign-up',
  'my-page',
]

export default function LocalBody({
  lang,
  children,
}: {
  lang: ValidLocale 
  children: React.ReactNode,
}) {
  const pathName = usePathname()
  const page = DESIGN_PAGE.find(item => (
    item === 'sign-in' ? 
      pathName?.includes(item) && !pathName?.includes('password') : 
      pathName?.includes(item)
  ))
  const { user, updateUser } = useUserState(state => state)
  const [storageUser] = getStorageData(AUTH_TOKEN)
  const [openMenu, setOpenMenu] = useState<'search' | undefined>()
  const hasScroll = useHasScroll()

  useEffect(( ) => {
    if (storageUser && !user) {
      updateUser(storageUser as IResponseUser)
    }
  }, [storageUser])

  const handleOpenMenu = (menu?: 'search' | undefined) => setOpenMenu(menu)
  
  return (
    <body className={(
      classNames(`iob-${lang}`, {
        [`iob-${page}`]: page,
        ['iob-open']: openMenu,
        ['iob-scroll']: hasScroll,
      })
    )}>
      <Suspense>
        <Analytics />
      </Suspense>
      {
        SIMPLE_HEADER_MAP.find(item => pathName?.includes(item)) ?
          <SimpleHeader lang={lang} openMenu={openMenu} onOpenMenu={handleOpenMenu} /> :
          <Header lang={lang} openMenu={openMenu} onOpenMenu={handleOpenMenu} />
      }
      <main>
        {children}
      </main>
      <Footer lang={lang} />
    </body>
  )
}
