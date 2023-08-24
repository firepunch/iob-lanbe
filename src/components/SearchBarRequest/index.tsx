'use client'

import { TI18N } from '@/types'
import searchthinIcon from '@/imgs/search_thin.png'
import Image from 'next/image'

interface SearchBarRequestProps {
  t: TI18N;
  errorCode?: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children?: React.ReactNode;
}

export default function SearchBarRequest ({
  t,
  errorCode,
  onSubmit,
  children,
  ...props
}: SearchBarRequestProps) {

  return (
    <form name="search-bar" onSubmit={onSubmit}>
      <input type="text" id="search-bar" name="search-bar" placeholder="Search" />
      <button type="submit">
        <Image src={searchthinIcon} alt="Search" />
      </button>
    </form>
    // <form onSubmit={onSubmit}>
    //   <label htmlFor="id">Search</label>
    //   <input type="text" id="search" /><br></br>
    //   <button type="submit">Submit</button>
    // </form>
  )
}
