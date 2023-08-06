export const objectToGetParams = (object: {
    [key: string]: string | number | undefined | null;
  }) => {
  const params = Object.entries(object)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
  
  return params.length > 0 ? `?${params.join('&')}` : ''
}

export const generateRandomString = () => (
  Math.floor(Math.random() * Date.now()).toString(36)
)

export const AUTH_TOKEN = 'IOB_TOKENS'
export const setStorageData = (key: string, data: string | object, isSession = false) => {
  if (typeof window == 'undefined' || !window.localStorage || !window.sessionStorage || !window.JSON || !key) return

  isSession ?
    sessionStorage.setItem(key, JSON.stringify(data)) :
    localStorage.setItem(key, JSON.stringify(data))
}

export const getStorageData = (key: string, isSession = false) => {
  if (typeof window == 'undefined' || !window.localStorage || !window.sessionStorage || !window.JSON || !key) return

  const item = isSession ?
    sessionStorage.getItem(key) :
    localStorage.getItem(key)

  if (!item) return

  return JSON.parse(item)
}

function remove_data(key) {
  if (!window.localStorage || !window.JSON || !key) {
    return
  }
  localStorage.removeItem(key)
}