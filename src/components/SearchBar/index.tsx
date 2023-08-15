'use client'

import { TI18N } from '@/types'

interface SearchBarProps {
  t: TI18N;
  errorCode?: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children?: React.ReactNode;
}

export default function SearchBar ({
  t,
  errorCode,
  onSubmit,
  children,
  ...props
}: SearchBarProps) {

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="id">Search</label>
      <input type="text" id="search" /><br></br>
      <button type="submit">Submit</button>
    </form>
  )
}
