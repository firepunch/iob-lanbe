import { Inter } from 'next/font/google';
// import styled from 'styled-components';
import { ValidLocale, getLocalePartsFrom, getTranslator, locales } from "../../i18n";
import Header from '../components/Header';
import { getAllPosts } from '../utils/api';

const inter = Inter({ subsets: ['latin'] })

// const SkeletonBtn = styled.div`
//   margin-top: 0.75rem /* 12px */;
//   width: 25%;
//   height: 0.75rem /* 12px */;
//   border-radius: 0.5rem /* 8px */;
//   background-color: rgb(255 0 128 / 1);
// `;

export default async function Home({
  params: {lang},
}: {
  params: {lang:string;},
}) {
  console.log('lang: ', lang)

  const t = await getTranslator(lang as ValidLocale)
  const postsData = getAllPosts(lang.toUpperCase())

  const [posts] = await Promise.all([postsData])

  return (
    <main >
      <Header/>
      <p>Current locale: {lang}</p>
      <p className={inter.className}>
        This text is rendered on the server: 
        {t("menu.about")}
      </p>

      <p>
        First Post Title:
        {posts?.edges[0].node.title}
      </p>

      <button>Button</button>
    </main>
  )
}

export async function generateStaticParams() {
  return locales.map((locale) => getLocalePartsFrom({locale}))
}