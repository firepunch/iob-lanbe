'use client'
 
import { useSelectedLayoutSegment } from 'next/navigation'
import { ValidLocale } from '@/i18n/settings'
 
export default function Payment({
  lang,
}: {
  lang: ValidLocale
}) {
  const segment = useSelectedLayoutSegment()
 
  return <p>PAyment Active segment: {segment}</p>
}