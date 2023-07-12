'use client';

import { Inter } from 'next/font/google';
import styled from 'styled-components';
import { getDictionary } from '../../get-dictionary';
import { Locale } from '../../i18n-config';
import Header from '../components/Header';
import styles from './page.module.css';

const inter = Inter({ subsets: ['latin'] })

const SkeletonBtn = styled.div`
  margin-top: 0.75rem /* 12px */;
  width: 25%;
  height: 0.75rem /* 12px */;
  border-radius: 0.5rem /* 8px */;
  background-color: rgb(255 0 128 / 1);
`;

export default async function Home({
  params: {lang}
}: {
  params: {lang: Locale}
}) {
  const dictionary = await getDictionary(lang)

  return (
    <main className={styles.main}>
      <Header/>
      <p>Current locale: {lang}</p>
      <p className={inter.className}>
        This text is rendered on the server: 
        {dictionary.menu.about}
        </p>

      <SkeletonBtn>Button</SkeletonBtn>
    </main>
  )
}
