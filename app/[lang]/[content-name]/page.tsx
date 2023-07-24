"use client"
import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import styles from "./index.module.scss"
import cls from "classnames"
import { objectToGetParams } from "src/utils/lib"
import { getAllPosts } from "src/utils/api"
import { ContentCard } from "@/components/index"

export default function Category({ 
  params: { lang },
}: {
  params: { lang: string; },
}) {
  const shareLink = "https://www.naver.com/"  // || window.location.toString()
  
  const copyURLButton = (e) => {
    navigator.clipboard.writeText(shareLink)
  }
  const [isZoom, setIsZoom] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const handleFontSize = () => {
    setIsZoom(prevZoomed => !prevZoomed)
  }

  const handleShareMenu = () => {
    setIsOpen(isOpen => !isOpen)
  }

  async function getPosts() {
    const postsData = getAllPosts(lang.toUpperCase())
    const [posts] = await Promise.all([postsData])
    return (
      <>
        {posts?.map(({ node }) => (
          <Link key={node.id} href={`/${node.id}`}>
            <ContentCard
              thumbnail_url={node.image}
              country={node.country}
              title={node.title}
              date={node.date}
              tags={node.tags}
              {...node} 
            />
          </Link>
        ))}
      </>
    )
  }

  return (
    <main>
      <h2 id="content-header">Post Detail</h2>
      { getPosts() }
      <Link href="#content-header">Scroll to top</Link>

      <div className="">
        <button onClick={handleShareMenu}>share</button>
        <div className={cls(styles.menu, { [styles.open]: !isOpen })}>
          <button onClick={copyURLButton}>URL</button>
          <a href={`mailto:${objectToGetParams({ subject: "title", body: shareLink })}`}>Gmail</a>
          <a href={`https://linkedin.com/shareArticle?${objectToGetParams({ url: shareLink })}`}>Linkedin</a>
          <a href={`https://teams.microsoft.com/share?${objectToGetParams({ href: shareLink, msgText:shareLink })}`}>Teams</a>
        </div>
        <button onClick={handleFontSize} title="handle Font Size"> Size </button>
        <div className={cls(styles.content, { [styles.large]: isZoom })}>
          <p>This is some text for size test.</p>
          <p>This is some text for size test.</p>
          <p>This is some text for size test.</p>
          <ul>This is some text for size test.</ul>
        </div>
      </div>

    </main>
  )
}
