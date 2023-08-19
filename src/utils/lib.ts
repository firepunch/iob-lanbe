import { format } from 'date-fns'

export const objectToGetParams = (object: {
    [key: string]: string | number | undefined | null;
  }) => {
  const params = Object.entries(object)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
  
  return params.length > 0 ? `?${params.join('&')}` : ''
} 

export const isEmpty = (obj) => (
  Object.keys(obj).length == 0
)


export const generateRandomString = () => (
  Math.floor(Math.random() * Date.now()).toString(36)
)

export const AUTH_TOKEN = 'IOB_TOKENS'
export const setStorageData = (key: string, data: string | object, isRemember = false) => {
  if (typeof window == 'undefined' || !window.localStorage || !window.sessionStorage || !window.JSON || !key) return

  isRemember ?
    sessionStorage.setItem(key, JSON.stringify(data)) :
    localStorage.setItem(key, JSON.stringify(data))
}

export const getStorageData = (key: string, isRemember = false) => {
  if (typeof window == 'undefined' || !window.localStorage || !window.sessionStorage || !window.JSON || !key) return

  const item = isRemember ?
    sessionStorage.getItem(key) :
    localStorage.getItem(key)

  if (!item || item === 'undefined') return

  return JSON.parse(item)
}

function remove_data(key) {
  if (!window.localStorage || !window.JSON || !key) {
    return
  }
  localStorage.removeItem(key)
}

export const dateFormat = (rcvDate: string) => format(new Date(rcvDate), 'yy.MM.dd')

export const dateEnFormat = (rcvDate?: string) => {
  return rcvDate ? format(new Date(rcvDate), 'MMM dd, yyyy') : ''
  // return rcvDate
}