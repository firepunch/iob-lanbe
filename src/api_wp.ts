import {
  ICreateNote,
  ICreateUser,
  ICreateWatchList,
  IFetchNotes,
  IEmailForm,
  ILoginUser,
  IFetchWatchList,
  IRemoveWatchList,
} from './types/api'
import { isEmpty, AUTH_TOKEN, getStorageData, setStorageData } from './utils/lib'


const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL as string
const API_MAP = {
  wpAPI: '',
  customAPI: '/custom-api/v1',
  formAPI: '/contact-form-7/v1/contact-forms',
}

async function fetchAPI({
  method = 'GET', 
  prefixPath,
  path,
  data = {},
}: {
  method: 'GET' | 'POST' | 'DELETE',
  prefixPath: 'wpAPI' | 'customAPI' | 'formAPI'
  path: string,
  data: object | FormData,
}) {
  const headers = prefixPath === 'formAPI' ? {} : { 'Content-Type':'application/json' }

  if (process.env.NEXT_PUBLIC_WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers[
      'Authorization'
    ] = `Basic ${process.env.NEXT_PUBLIC_WORDPRESS_AUTH_REFRESH_TOKEN}`
  }

  const res = await fetch(`${API_URL}/wp-json${API_MAP[prefixPath]}${path}`, {
    ...!isEmpty(headers) &&  headers,
    method,
    body: prefixPath === 'formAPI' ?
      data :
      JSON.stringify({
        ...data,
      }) as any,
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
    prefixPath: 'customAPI',
    path: '/users',
    method: 'POST',
    data,
  })

  return res
}

export async function sendEmailForm(data) {
  const res = await fetchAPI({
    prefixPath: 'formAPI',
    path: '/3116/feedback',
    method: 'POST',
    data,
  })
  return res
}

export async function SearchRequest(data) {
  const res = await fetchAPI({
    prefixPath: 'formAPI',
    path: '/3143/feedback',
    method: 'POST',
    data,
  })
  return res
}

export async function ProjectInquiry(data) {
  const res = await fetchAPI({
    prefixPath: 'formAPI',
    path: '/3144/feedback',
    method: 'POST',
    data,
  })
  return res
}

export async function fetchWatchList(data: IFetchWatchList) {
  const res = await fetchAPI({
    prefixPath: 'customAPI',
    path: '/watchlist',
    method: 'GET',
    data,
  })

  return res
}

export async function createWatchList(data: ICreateWatchList) {
  const res = await fetchAPI({
    prefixPath: 'customAPI',
    path: '/watchlist',
    method: 'POST',
    data,
  })

  return res
}

export async function removeWatchList(data: IRemoveWatchList) {
  const res = await fetchAPI({
    prefixPath: 'customAPI',
    path: '/watchlist',
    method: 'DELETE',
    data,
  })

  return res
}

export async function fetchNotes(data: IFetchNotes) {
  const res = await fetchAPI({
    prefixPath: 'customAPI',
    path: '/notes',
    method: 'GET',
    data,
  })

  return res
}

export async function createNote(data: ICreateNote) {
  const res = await fetchAPI({
    prefixPath: 'customAPI',
    path: '/notes',
    method: 'POST',
    data,
  })
  return res
}
