import { Inter } from 'next/font/google';
// import styled from 'styled-components';
import Header from '../components/Header';
import { getLocalePartsFrom, locales, ValidLocale, getTranslator } from "../../i18n";

const inter = Inter({ subsets: ['latin'] })

// const SkeletonBtn = styled.div`
//   margin-top: 0.75rem /* 12px */;
//   width: 25%;
//   height: 0.75rem /* 12px */;
//   border-radius: 0.5rem /* 8px */;
//   background-color: rgb(255 0 128 / 1);
// `;

export async function generateStaticParams() {
  return locales.map((locale) => getLocalePartsFrom({locale}))
}

export default async function Home({
  params
}: {
  params: {lang:string;}
}) {
  const translate = await getTranslator(params.lang as ValidLocale   )

  return (
    <main >
      <Header/>
      <p>Current locale: {params.lang}</p>
      <p className={inter.className}>
        This text is rendered on the server: 
        {translate("menu.about")}
      </p>

      <button>Button</button>
    </main>
  )
}
