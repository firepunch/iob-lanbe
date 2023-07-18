import { ValidLocale, getTranslator } from "i18n"

export default async function SignUp({
  params: { lang },
}: {
  params: { lang: ValidLocale; },
}) {
  const dict = await getTranslator(lang)

  return (
    <>
      <h2>{dict.menu.about}</h2>
    </>
  )
}
