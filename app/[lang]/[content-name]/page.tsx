"use client"

import { getLocalePartsFrom, locales } from "i18n"
import Link from "next/link"
import { useState } from "react"

export default function Category({
  params: { lang },
}: {
  params: { lang: string; },
}) {

  const shareLink = "https://www.naver.com/"  // || window.location.toString()
  
  const copyURLButton = (e) => {
    navigator.clipboard.writeText(shareLink)
  }

  const [prevZoomed, setZoomed] = useState(false)
  const [fontSize, setFontSize] = useState(20)
  const fontSizeButton = () => {
    setZoomed(prevZoomed => !prevZoomed)
    setFontSize(prevFontSize => (prevZoomed ? prevFontSize - 5 : prevFontSize + 5))
  }

  const objectToGetParams = (object: {
    [key: string]: string | number | undefined | null;
  }) => {
    const params = Object.entries(object)
      .filter(([, value]) => value !== undefined && value !== null)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)

    return params.length > 0 ? `?${params.join("&")}` : ""
  }

  return (
    <main>
      <h2 id="content-header">Post Detail</h2>

      <div style={{ background: "black", height: "100vh" }}>
      </div>

      <Link href="#content-header">Scroll to top</Link>

      <div className="">
        <button>share</button>
        <div className="">
          <button onClick={copyURLButton}>URL</button>
          <a href={`mailto:${objectToGetParams({ subject: "title", body: shareLink })}`}>Gmail</a>
          <a href={`https://linkedin.com/shareArticle?${objectToGetParams({ url: shareLink })}`}>Linkedin</a>
          <a href={`https://teams.microsoft.com/share?${objectToGetParams({ href: shareLink, referrer: "" })}`}>Teams</a>
        </div>
      </div>

      <div>
        <p style={{ fontSize: `${fontSize}px` }}>This is some text for size test.</p>
        <button onClick={fontSizeButton} title="handle Font Size"> Size </button>
      </div>

    </main>
  )
}

export async function generateStaticParams() {
  return locales.map((locale) => getLocalePartsFrom({ locale }))
}
