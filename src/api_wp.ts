import { ICreateUser, ILogin, IEmailForm } from './types/api'
import { isEmpty } from './utils/lib'

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL as string

async function fetchAPI({
  method = 'GET', 
  path,
  data = {},
  customPrefixPath,
}: {
  method: 'GET' | 'POST' | 'DELETE',
  path: string,
  data: object | FormData,
  customPrefixPath?: string
}) {
  const headers = customPrefixPath?.includes('contact-form-7') ? {} : { 'Content-Type':'application/json' }

  if (process.env.NEXT_PUBLIC_WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers[
      'Authorization'
    ] = `Basic ${process.env.NEXT_PUBLIC_WORDPRESS_AUTH_REFRESH_TOKEN}`
  }

  const res = await fetch(`${API_URL}/wp-json${customPrefixPath || '/wp/v2'}${path}`, {
    ...!isEmpty(headers) &&  headers,
    method,
    body: customPrefixPath?.includes('contact-form-7') ?
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
  console.log(res)

  return res
}

export async function sendEmailForm(data) {
  const res = await fetchAPI({
    customPrefixPath: '/contact-form-7/v1/contact-forms',
    path: '/3116/feedback',
    method: 'POST',
    data,
  })
  console.log(res)
  return res
}
