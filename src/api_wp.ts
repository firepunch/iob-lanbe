import { ICreateUser, ILogin, IEmailForm } from './types/api'

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL as string

async function fetchAPI({
  method = 'GET', 
  path,
  data = {},
  isCustom = false,
}: {
  method: 'GET' | 'POST' | 'DELETE',
  path: string,
  data: object,
  isCustom?: boolean
}) {
  const headers = { 'Content-Type': 'application/json' }

  if (process.env.NEXT_PUBLIC_WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers[
      'Authorization'
    ] = `Basic ${process.env.NEXT_PUBLIC_WORDPRESS_AUTH_REFRESH_TOKEN}`
  }

  const res = await fetch(`${API_URL}/wp-json${isCustom ? '/custom-api/v1' : '/wp/v2'}${path}`, {
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
    isCustom: true,
    method: 'POST',
    path: '/login',
    data,
  })

  return res
}

export async function sendEmailForm(data: IEmailForm) {
  const res = await fetchAPI({
    method: 'POST',
    path: '/wp-json/contact-form-7/v1/contact-forms/3116/feedback',
    data,
    isCustom: true,
  })

  return res
}