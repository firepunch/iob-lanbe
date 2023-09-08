import { initReactI18next } from 'react-i18next'

export interface Tokens {
  authToken?: string
  refreshToken?: string
  sessionToken?: string
}

export type IFeaturedImage = {
  node: {
    sourceUrl: string
    altText: string
  }
}

export type ITags = {
   edges: {
    node: {
      id: string
      name: string
    }
  }[]
}

export type ILanbeContent = {
  is_save: boolean
  country: string
  subTitle: string
  downloadFile: string
  pages: number
  whyItMatters: string
  firstImage: string
  secondImage: string
  secondText: string
  thirdText: string
  thirdImage: string
}

export interface IPost {
  id: number
  databaseId: number
  slug: string
  title: string
  excerpt: string
  date: string
  country: string
  content: string
  featured_image_url?: string
  featuredImage?: IFeaturedImage
  tags: ITags
  lanbeContent: ILanbeContent
  translations: {
    slug: string
  }[]
  categories: ICategory
  author: {
    node: {
      name: string
      roles: {
        edges: {
          node: {
            id: string
          }
        }
      }
    }
  }
}

export interface ICategory {
    edges: {
      node: {
        id: string
        name: string
        parentId: string
        parent: {
          node :{
            id: string
            name: string
          }
        }
      }
    }[]
  }

export interface IPageInfo {
  initTotal: number
  total: number
  hasNextPage?: boolean
  hasPreviousPage?: boolean
  startCursor?: string
  endCursor?: string
}

export interface IPosts {
  edges: { cursor: string, node: IPost }[]
  pageInfo: IPageInfo
}

export interface IReport extends IPost {
  name: string
  price: string
  dateGmt: string
  excerpt: string
  reportCategories: ICategory
  reportTags: ITags
  author: {
    node: {
      id: string
      name: string
      roles?: string
    }
  }
  attributes: {
    edges: {
      node: {
        id: string
        name: string
        options: number[]
      }
    }[]
  }
}

export interface IReports {
  edges: { node: IReport }[]
  pageInfo: IPageInfo
}

export interface IOrder {
  userId: number
  reportId: number
  name: string
  price: string
  amount: number
  currency: string
}

export interface IDownload {
  downloadId: string
  download: {
    file: string
  }
}

export interface ISearchResult {
  posts: { node: IPost }[]
  reports:{ node: IReport }[]
}

export interface IUser {
  databaseId: number
  name: string
  email: string
  registeredDate: string
}

export interface IResponseUser extends Tokens {
  user: IUser
}
