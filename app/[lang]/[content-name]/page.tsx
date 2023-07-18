"use client"

import { getLocalePartsFrom, locales } from "i18n"
import Link from "next/link"
import React, { useState } from "react"
import { LinkedinIcon, LinkedinShareButton, EmailShareButton, EmailIcon } from "react-share"

export default function Category({
  params: { lang },
}: {
  params: { lang: string; },
}) {

  const copyURLButton = (e) => {
    navigator.clipboard.writeText(window.location.toString())
  }

  const [prevZoomed, setZoomed] = useState(false)
  const [fontSize, setFontSize] = useState(20)
  const fontSizeButton = () => {
    setZoomed(prevZoomed => !prevZoomed)
    setFontSize(prevFontSize => (prevZoomed ? prevFontSize - 5 : prevFontSize + 5))
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
          
          <LinkedinIcon size={32} round />
          <LinkedinShareButton url={window.location.toString()} title="title"> LinkedIn </LinkedinShareButton>
          
          <EmailIcon size={32} round />
          <EmailShareButton url={window.location.toString()}> Mail </EmailShareButton>
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
