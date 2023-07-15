import Link from "next/link"
import LanguageSwitcher from "../LanguageSwitcher"

export default function Header() {
  return (
    <header>
      Header
      <Link href='/'>
        <h1>
          IOB
        </h1>
      </Link>

      <LanguageSwitcher />
    </header>
  )
}