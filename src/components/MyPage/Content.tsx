'use client'
 
import { useSelectedLayoutSegment } from 'next/navigation'
import { ValidLocale } from '@/i18n/settings'
 
export default function Content({
  lang,
}: {
  lang: ValidLocale
}) {
  const segment = useSelectedLayoutSegment()
 
  return <p>Active segment: {segment}</p>
}