import { getTranslation } from '@/i18n/index'
import { ValidLocale } from '@/i18n/settings'
import Link from 'next/link'

export async function generateMetadata({ params: { lang } }) {
  const { t } = await getTranslation(lang, 'second-page')
  return { title: t('h1') }
}

export default async function Category({
  params: { lang },
}: {
  params: { lang: ValidLocale; },
}) {
  const { t } = await getTranslation(lang, 'second-page')

  const shareLink = "https://www.naver.com/"  // || window.location.toString()
  
  const copyURLButton = (e) => {
    navigator.clipboard.writeText(shareLink)
  }

  const [isZoomed, setIsZoomed] = useState(false)
  const handleFontSize = () => {
    setIsZoomed(prevZoomed => !prevZoomed)
  }

  const [isOpen, setIsOpen] = useState(false)
  const handleShareMenu = () => {
    setIsOpen(isOpen => !isOpen)
  }

  return (
    <main>
      <h2 id="content-header">{t('h1')}</h2>

      <div style={{ background: 'black', height: '100vh' }}>
      </div>

      <Link href="#content-header">Scroll to top</Link>

      <div className="">
        <button onClick={handleShareMenu}>share</button>
        <div className={cls(styles.menu, { [styles.open]: !isOpen })}>
          <button onClick={copyURLButton}>URL</button>
          <a href={`mailto:${objectToGetParams({ subject: "title", body: shareLink })}`}>Gmail</a>
          <a href={`https://linkedin.com/shareArticle?${objectToGetParams({ url: shareLink })}`}>Linkedin</a>
          <a href={`https://teams.microsoft.com/share?${objectToGetParams({ href: shareLink, msgText:shareLink })}`}>Teams</a>
        </div>
        <button onClick={handleFontSize} title="handle Font Size"> Size </button>
      </div>

      <div className={cls(styles.content, { [styles.large]: isZoomed })}>
        <p>This is some text for size test.</p>
        <p>This is some text for size test.</p>
        <p>This is some text for size test.</p>
        <ul>This is some text for size test.</ul>
      </div>

    </main>
  )
}
