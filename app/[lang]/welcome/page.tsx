import { ValidLocale } from '@/i18n/settings'
import Image from 'next/image'
import WelcomeImg from '@/imgs/welcome_main.jpg'

export default async function Welcome({
  params: { lang },
}: {
  params: { lang: ValidLocale; },
}) {
  return (
    <section id="welcome-main">
      <Image src={WelcomeImg} alt="Welcome Img" />
      <p>Welcome to I.O.B,<br /><span>Seoyoung!</span></p>
    </section>
  )
}
