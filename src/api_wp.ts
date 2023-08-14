import {
  ICreateNote,
  ICreateUser,
  ICreateWatchList,
  IFetchNotes,
  IFetchWatchList,
  IRemoveWatchList,
} from './types/api'

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL as string
const API_MAP = {
  wpAPI: '',
  customAPI: '/custom-api/v1',
}

async function fetchAPI({
  method = 'GET', 
  customPrefixPath,
  path,
  data = {},
}: {
  method: 'GET' | 'POST' | 'DELETE',
  customPrefixPath?: string
  path: string,
  data: object,
}) {
  const headers = { 'Content-Type': 'application/json' }

  if (process.env.NEXT_PUBLIC_WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers[
      'Authorization'
    ] = `Basic ${process.env.NEXT_PUBLIC_WORDPRESS_AUTH_REFRESH_TOKEN}`
  }

  const res = await fetch(`${API_URL}/wp-json${customPrefixPath || '/wp/v2'}${path}`, {
    headers,
    method,
    body: JSON.stringify({
      ...data,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }

  return json.data
}

export async function createUser(data: ICreateUser) {
  const res = await fetchAPI({
    customPrefixPath: '/custom-api/v1',
    path: '/users',
    method: 'POST',
    data,
  })

  return res
}

export async function fetchWatchList(data: IFetchWatchList) {
  const res = await fetchAPI({
    customPrefixPath: '/custom-api/v1',
    path: '/watchlist',
    method: 'GET',
    data,
  })

  return res
}

export async function createWatchList(data: ICreateWatchList) {
  const res = await fetchAPI({
    customPrefixPath: '/custom-api/v1',
    path: '/watchlist',
    method: 'POST',
    data,
  })

  return res
}

export async function removeWatchList(data: IRemoveWatchList) {
  const res = await fetchAPI({
    customPrefixPath: '/custom-api/v1',
    path: '/watchlist',
    method: 'DELETE',
    data,
  })

  return res
}

export async function fetchNotes(data: IFetchNotes) {
  const res = await fetchAPI({
    customPrefixPath: '/custom-api/v1',
    path: '/notes',
    method: 'GET',
    data,
  })

  return res
}

export async function createNote(data: ICreateNote) {
  const res = await fetchAPI({
    customPrefixPath: '/custom-api/v1',
    path: '/notes',
    method: 'POST',
    data,
  })

  return res
}
