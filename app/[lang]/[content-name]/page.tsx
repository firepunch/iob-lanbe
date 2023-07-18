'use client'

import { getLocalePartsFrom, locales } from 'i18n'
import Link from 'next/link'

export default function Category({
  params: { lang },
}: {
  params: { lang: string; },
}) {

  const copyToClipboard = (e) => {
    navigator.clipboard.writeText(window.location.toString())
  }

  return (
    <main >
      <h2 id="content-header">Post Detail</h2>

      <div style={{ background: 'black', height: '100vh' }}>
      </div>

      <Link href="#content-header">Scroll to top</Link>

      <div className="">
        <button onClick={copyToClipboard}>
          Copy
        </button>
      </div>
    </main>
  )
}

export async function generateStaticParams() {
  return locales.map((locale) => getLocalePartsFrom({ locale }))
}
