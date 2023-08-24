import { ValidLocale } from '@/i18n/settings'

export default async function Welcome({
  params: { lang },
}: {
  params: { lang: ValidLocale; },
}) {
  return (
    <section id="welcome-main">
      <p>Welcome to I.O.B,<br /><span>Seoyoung!</span></p>
    </section>
  )
}
