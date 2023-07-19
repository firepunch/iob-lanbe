import { ValidLocale } from '@/i18n/settings'

export default async function About({
  params: { lang },
}: {
  params: { lang: ValidLocale; },
}) {
  return (
    <>
      <h2>About</h2>
    </>
  )
}
