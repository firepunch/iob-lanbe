'use client'

import { ValidLocale } from '@/types'
import Link from 'next/link'
import { useSelectedLayoutSegment, useSelectedLayoutSegments } from 'next/navigation'
import { MyPagePayment, MyPageContent } from '@/components'

const TAB_MAP = {
  content: 'content',
  payment: 'payment',
}

export default function Layout({
  params: { lang },
  children,
}: {
  params: { lang: ValidLocale },
  children: React.ReactNode
}) {
  const segment = useSelectedLayoutSegment()

  return (
    <div className="my-page">
      <div className="tab-header">
        <Link href={{ pathname: `/my-page/${TAB_MAP.content}` }}>Content</Link>
        <Link href={{ pathname: `/my-page/${TAB_MAP.payment}` }}>Payment</Link>
      </div>
      <div className="tab-content">
        {segment === TAB_MAP.content && <MyPageContent lang={lang} />}
        {segment === TAB_MAP.payment && <MyPagePayment lang={lang} />}
      </div>
    </div>
  )
}