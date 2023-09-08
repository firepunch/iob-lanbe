import { ValidLocale } from '@/i18n/settings'
import Link from 'next/link'
import HamburgerMenu from './HamburgerMenu'
import LanguageSwitcher from './LanguageSwitcher'

export default function SimpleHeader({
  lang,
  openMenu,
  onOpenMenu,
}: {
  lang: ValidLocale
  openMenu?: string
  onOpenMenu: (menu?: string) => void
}) {
  return (
    <header>
      <LanguageSwitcher isSimple lang={lang} />
      <h1 onClick={() => onOpenMenu()}>
        <Link href="/">I.O.B</Link>
      </h1>
      <HamburgerMenu lang={lang} openMenu={openMenu} onOpenMenu={onOpenMenu} />
    </header>
  )
}
