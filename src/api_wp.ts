import { TStringObj } from './types'
import {
  ICreateNote,
  ICreateUser,
  IFetchNotes,
  IEmailForm,
  ILoginUser,
  IFetchWatchList,
  IBodyWatchList,
  IUpdateNote,
} from './types/api'
import { isEmpty, AUTH_TOKEN, getStorageData, setStorageData } from './utils/lib'


const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL as string
const API_MAP = {
  wpAPI: '/wp-json',
  customAPI: '/wp-json/custom-api/v1',
  formAPI: '/wp-json/contact-form-7/v1/contact-forms',
  searchAPI: '/index.php/wp-json/wp',
}

async function fetchAPI({
  method = 'GET', 
  prefixPath,
  path,
  data = {},
  queryParams = undefined,
}: {
  method: 'GET' | 'POST' | 'DELETE' | 'PUT',
  prefixPath: 'wpAPI' | 'customAPI' | 'formAPI' | 'searchAPI'
  path: string,
  data?: object | FormData,
  queryParams?: object,
}) {
  const headers = {}
  
  if (prefixPath !== 'formAPI') {
    headers['Content-Type'] = 'application/json'
  } else {
    headers['Referrer-Policy'] = 'no-referrer'
  }

  if (process.env.NEXT_PUBLIC_WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers[
      'Authorization'
    ] = `Basic ${process.env.NEXT_PUBLIC_WORDPRESS_AUTH_REFRESH_TOKEN}`
  }
  
  const params = queryParams ? '?' + new URLSearchParams(queryParams as Record<string,string>) : ''
  const res = await fetch(`${API_URL}${API_MAP[prefixPath]}${path}${params}`, {
    ...!isEmpty(headers) && { headers },
    method,
    ...method !== 'GET' && data && {
      body: prefixPath === 'formAPI' ?
        data :
        JSON.stringify({
          ...data,
        }) as any,
    },
  })
  
  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  return method === 'GET' ? json : json.data
}

export async function createUser(data: any) { // ICreateUser) {
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

export async function searchBar(data) {
  const res = await fetchAPI({
    prefixPath: 'searchAPI',
    path: `search?search=${data.search}`,
    method: 'GET',
    data,
  })
  console.log('res', res)

  return res
}

export async function searchRequest(data) {
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

export async function createWatchList(data: IBodyWatchList) {
  return fetchAPI({
    prefixPath: 'customAPI',
    path: '/watchlist',
    method: 'POST',
    data,
  })
}

export async function removeWatchList(data: IBodyWatchList) {
  return fetchAPI({
    prefixPath: 'customAPI',
    path: '/watchlist',
    method: 'DELETE',
    data,
  })
}

export async function fetchNotes(queryParams: IFetchNotes) {
  const res = await fetchAPI({
    prefixPath: 'customAPI',
    path: '/notes',
    method: 'GET',
    queryParams,
  })

  return res?.data
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

export async function updateNote(data: IUpdateNote) {
  const res = await fetchAPI({
    prefixPath: 'customAPI',
    path: '/notes/',
    method: 'PUT',
    data,
  })
  return res
}

export async function deleteNote(data: { note_id: number }) {
  const res = await fetchAPI({
    prefixPath: 'customAPI',
    path: '/notes',
    method: 'DELETE',
    data,
  })
  return res
}
