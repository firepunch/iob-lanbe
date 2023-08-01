import { ICreateUser, ILogin } from './types/api'

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL as string

async function fetchAPI({
  method = 'GET', 
  path,
  data = {},
  customPrefixPath,
}: {
  method: 'GET' | 'POST' | 'DELETE',
  path: string,
  data: object,
  customPrefixPath?: string
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
    method: 'POST',
    path: '/users',
    data,
  })

  return res
}

export async function login(data: ILogin) {
  const res = await fetchAPI({
    customPrefixPath: '/custom-api/v1',
    path: '/login',
    method: 'POST',
    data,
  })

  return res
}
