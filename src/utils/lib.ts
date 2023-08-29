import { IUser } from '@/types/store'
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

type Tokens = {
  authToken?: string
  user?: {
    databaseId: number
    email: string
  }
  sessionToken?: string
}

interface IGetStorageData {
  (key: string): [undefined, undefined] | [Tokens, boolean]
}

export const getStorageData:IGetStorageData = (key: string) => {
  if (typeof window == 'undefined' || !window.localStorage || !window.sessionStorage || !window.JSON || !key) {
    return [undefined, undefined]
  }

  const rememberData = sessionStorage.getItem(key)
  const localData = localStorage.getItem(key)
  const item = rememberData || localData

  if (!item || item === 'undefined') return [undefined, undefined]

  return [JSON.parse(item), Boolean(rememberData)]
}

function remove_data(key) {
  if (!window.localStorage || !window.JSON || !key) {
    return
  }
  localStorage.removeItem(key)
}

export const dateFormat = (rcvDate: string, showFullYear?: boolean) => (
  format(new Date(rcvDate), showFullYear ? 'yyyy.MM.dd' : 'yy.MM.dd')
)

export const dateEnFormat = (rcvDate?: string) => (
  rcvDate ? format(new Date(rcvDate), 'MMM dd, yyyy') : ''
)

export const getAuthorInfo = (author) => {
  if (!author) return ''

  const name = author.node.name
  const roles = author.node.roles
  if (!roles) return name
  
  return `${name} | ${roles.edges?.node.id}`
}

export const isValidToken = () => {
  const [userData] = getStorageData(AUTH_TOKEN)
  const isValid = userData?.authToken && userData?.user?.databaseId

  return Boolean(isValid)
}

export const isValidUser = () => {
  const [userData] = getStorageData(AUTH_TOKEN)
  const isValid = userData?.authToken && userData?.user?.databaseId

  return { isValid: Boolean(isValid), user: userData?.user as IUser }
}

export const getUserId = () => {
  const [userData] = getStorageData(AUTH_TOKEN)
  return userData?.user?.databaseId || 0
}

export const getUser = () => {
  const [userData] = getStorageData(AUTH_TOKEN)
  
  return {
    userId: userData?.user?.databaseId || 0,
    email: userData?.user?.email || '',
  }
}

export const sort2variables = (type: string) => {
  const map = {
    newest: { field: 'DATE', order: 'DESC' },
    oldest: { field: 'DATE', order: 'ASC' },
    most_viewed: { field: 'DATE', order: 'DESC' },
  }

  return map[type] || map.newest
}

export const toComma = (value: string|number) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const getCountry = (categories) => {
  if (!categories) return ''
  
  const countryNode = categories?.edges?.find(({ node }) => {
    return node?.parent?.node.name === 'Country'
  })

  return countryNode?.node?.name
}
