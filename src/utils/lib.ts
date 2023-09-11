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

export const setStorageData = (key: string, data: string | object, isRemember = false) => {
  if (typeof window == 'undefined' || !window.localStorage || !window.sessionStorage || !window.JSON || !key) return

  isRemember ?
    sessionStorage.setItem(key, JSON.stringify(data)) :
    localStorage.setItem(key, JSON.stringify(data))
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

export const removeStorageData = (key: string) => {
  if (typeof window == 'undefined' || !window.localStorage || !window.sessionStorage || !window.JSON || !key) {
    return
  }

  sessionStorage.removeItem(key)
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

  const name = author.node.name?.replace('&amp;', '&')
  const roles = author.node.roles
  if (!roles) return name
  
  return `${name} | ${roles.edges?.node.id}`
}

export const sort2variables = (type: string) => {
  const map = {
    newest: { field: 'DATE', order: 'DESC' },
    oldest: { field: 'DATE', order: 'ASC' },
    most_viewed: { field: 'VIEW_COUNTS', order: 'DESC' },
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

export const getUniqueArr = (arr) => (
  arr.filter((item, index, self) => (
    self.indexOf(item) === index
  ))
)

export const getUniqueEdges = (arr) => {
  return arr.filter((item, index, self) => (
    index === self.findIndex((t) => (
      t['node']['databaseId'] === item['node']['databaseId']
    ))
  ))
}

export const formatPostTaxQuery = (
  categories: { terms: string[], field: string },
  countries: string[],
) => { 
  const taxArray: any[] = []
  if (categories?.terms?.length) {
    taxArray.push({
      ...categories,
      taxonomy: 'CATEGORY',
      operator: 'IN',
    })
  }
  if (countries?.length) {
    taxArray.push({
      terms: countries,
      taxonomy: 'CATEGORY',
      operator: 'IN',
      field: 'SLUG',
    })
  }
  return { relation: 'AND', taxArray }
}

export const formatSearchTaxQuery = (keyword: string, lang:string) => {
  let taxArray: any[] = []
  if (keyword) {
    taxArray = [{
      terms: [keyword.toLowerCase().replaceAll(' ', '-') + `-${lang}`],
      taxonomy: 'CATEGORY',
      operator: 'IN',
      field: 'SLUG',
    }, {
      terms: [keyword.toLowerCase().replaceAll(' ', '-') + `-${lang}`],
      taxonomy: 'TAG',
      operator: 'IN',
      field: 'SLUG',
    }]
  }
  return { relation: 'OR', taxArray }
}
