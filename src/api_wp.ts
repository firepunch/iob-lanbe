
const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL as string

async function fetchAPI(path, method = 'GET', { data }: Record<string, object> = {}) {
  const headers = { 'Content-Type': 'application/json' }

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers[
      'Authorization'
    ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`
  }

  // if (localStorage.getItem('woo-session')) {
  //   headers[
  //     'woocommerce-session'
  //   ] = `Session ${localStorage.getItem('woo-session')}`
  // }

  const res = await fetch(`${API_URL}/wp/v2${path}`, {
    headers,
    method,
    body: JSON.stringify({
      data,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  return json.data
}
