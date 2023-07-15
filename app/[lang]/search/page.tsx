import { ValidLocale, getLocalePartsFrom, getTranslator, locales } from "i18n"
import { Header, Button } from "src/components/index"
import { getAllPosts } from "src/utils/api"

export default async function Category({
  params: { lang },
}: {
  params: { lang: string; },
}) {
  const t = await getTranslator(lang as ValidLocale)
  const postsData = getAllPosts(lang.toUpperCase())

  const [posts] = await Promise.all([postsData])

  return (
    <main >
      <Header/>
      <h2>Search</h2>

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
