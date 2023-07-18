import { match } from "@formatjs/intl-localematcher"
import { defaultLocale, locales } from "i18n"
import Negotiator from "negotiator"
import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
 
const getLocale = (req: NextRequest) => {
  let headers = { "accept-language": "en-US,en;q=0.5" }
  let languages = new Negotiator({ headers }).languages()

  return match(languages, locales as unknown as string [], defaultLocale) 
}

export const middleware = (req: NextRequest) => {
  const pathname = req.nextUrl.pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  console.log(pathnameIsMissingLocale)

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = "en" // getLocale(req)
 
    return NextResponse.redirect(
      new URL(`/${locale}/${pathname}`, req.url)
    )
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
}