import { ValidLocale, getTranslator } from "i18n"

export default async function Checkout({
  params: { lang },
}: {
  params: { lang: string; },
}) {
  const dict = await getTranslator(lang as ValidLocale)

  return (
    <>
      <h2>{dict.menu.about}</h2>
    </>
  )
}
