"use client"

import { useState } from "react"
import { getLocalePartsFrom, locales } from "i18n"
import Link from "next/link"
import styles from "./index.module.scss"
import cls from "classnames"
import { objectToGetParams } from "src/utils/api"

export default function Category({
  params: { lang },
}: {
  params: { lang: string; },
}) {

  const shareLink = "https://www.naver.com/"  // || window.location.toString()
  
  const copyURLButton = (e) => {
    navigator.clipboard.writeText(shareLink)
  }

  const [isZoomed, setIsZoomed] = useState(false)
  const handleFontSize = () => {
    setIsZoomed(prevZoomed => !prevZoomed)
  }

  const [isOpen, setMenu] = useState(false)
  const shareButton = () => {
    setMenu(isOpen => !isOpen)
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
        <button onClick={handleFontSize} title="handle Font Size"> Size </button>
      </div>

      <div className={cls(styles.content, { [styles.large]: isZoomed })}>
        <p>This is some text for size test.</p>
        <p>This is some text for size test.</p>
        <p>This is some text for size test.</p>
        <ul>This is some text for size test.</ul>
      </div>

    </main>
  )
}

export async function generateStaticParams() {
  return locales.map((locale) => getLocalePartsFrom({ locale }))
}
