import { ValidLocale } from '@/i18n/settings'
import Link from 'next/link'
import HamburgerMenu from './HamburgerMenu'
import LanguageSwitcher from './LanguageSwitcher'

export default function SimpleHeader({
  lang,
}: {
  lang: ValidLocale
}) {
  return (
    <header>
      <LanguageSwitcher isSimple lang={lang} />
      <h1>
        <Link href="/">I.O.B</Link>
      </h1>
      <HamburgerMenu lang={lang} />
    </header>
  )
}
