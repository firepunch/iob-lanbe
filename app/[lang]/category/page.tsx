import { getContents } from '@/utils/api'
import { ValidLocale, getLocalePartsFrom, getTranslator, locales } from "i18n"
import { Header, Button } from '@/components/index'

export default async function Category({
  params: { lang },
}: {
  params: { lang: string; },
}) {
  const t = await getTranslator(lang as ValidLocale)
  const contentsData = getContents(lang.toUpperCase())

  const [contents] = await Promise.all([contentsData])

  return (
    <main>
      <Header/>
      <h2>Category</h2>
      <p>Current locale: {lang}</p>
      <p>
        This text is rendered on the server: 
        {t("menu.about")}
      </p>

      <p>
        First Post Title:
        {posts?.edges[0].node.title}
      </p>

      <Button>Button</Button>
    </main>
  )
}

export async function generateStaticParams() {
  return locales.map((locale) => getLocalePartsFrom({ locale }))
}
