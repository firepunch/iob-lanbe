import { ValidLocale } from '@/i18n/settings'
import Image from 'next/image'
import Link from 'next/link'
import LanguageSwitcher from '../LanguageSwitcher'

import HamburgerWhiteImg from '@/imgs/hamburger_white.png'

export default function Header({
  lang,
}: {
  lang: ValidLocale
}) {
  return (
    <>
      <header>
        <LanguageSwitcher isSimple lang={lang} />
        <h1>
          <Link href="/">I.O.B</Link>
        </h1>
        <a href="#" className="hamburger-mobile">
          <Image src={HamburgerWhiteImg} alt="Hamburger menu" />
        </a>
      </header>
    </>
  )
}
