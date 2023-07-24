import Link from "next/link"
import LanguageSwitcher from "../LanguageSwitcher"
import { ValidLocale, getTranslator } from "i18n"
import React, { useState, useEffect } from "react"

export default async function Header({
  lang,
}: {
  lang: ValidLocale
}) {
  const t = await getTranslator(lang as ValidLocale)
  return (
    <header>
      <Link href='/'>
        <h1>
          IOB
        </h1>
      </Link>

      <nav>
        <Link href={`/${lang}/about`}>
          {t("menu.about")}
        </Link>
        <Link href={`/${lang}/category`}>
          {t("menu.content")}
        </Link>
        <Link href={`/${lang}/report`}>
          {t("menu.report")}
        </Link>
        <Link href={`/${lang}/search`}>
          {t("menu.search")}
        </Link>
        <Link href={`/${lang}/login`}>
          {t("menu.sign_in")}
        </Link>
        <Link href={`/${lang}/my-page`}>
          {t("menu.my_page")}
        </Link>
      </nav>
      
      <nav>
        <Link href={`/${lang}/market`}>
          {t("Market")}
        </Link>
        <Link href={`/${lang}/corporate`}>
          {t("Corporate")}
        </Link>
        <Link href={`/${lang}/consumer`}>
          {t("Consumer")}
        </Link>
        <Link href={`/${lang}/marketing`}>
          {t("Marketing")}
        </Link>
        <Link href={`/${lang}/partnership`}>
          {t("Partnership")}
        </Link>
        <Link href={`/${lang}/channel`}>
          {t("Channel")}
        </Link>
        <Link href={`/${lang}/payment`}>
          {t("Payment")}
        </Link>
      </nav>

      <LanguageSwitcher />
    </header>
  )
}