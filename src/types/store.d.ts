export type IFeaturedImage = {
  node: {
    sourceUrl: string
    altText: string
  }
}

export type ITags = {
  nodes: {
    id: string
    name: string
  }[]
}

export type ILanbeContent = {
  is_save: boolean
  country: string
}

export interface IPost {
  id: number
  databaseId: number
  slug: string
  title: string
  date: string
  country: string
  content: string
  featuredImage?: IFeaturedImage
  tags: ITags
  lanbeContent: ILanbeContent
  categories: {
    edges: {
      node: {
        id: string
        name: string
        parentId: string
      }
    }[]
  }
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

export interface IPageInfo {
  initTotal?: number
  total?: number
  hasNextPage?: boolean
  hasPreviousPage?: boolean
  startCursor?: string
  endCursor?: string
}

export interface IPosts {
  edges: { node: IPost }[]
  pageInfo: IPageInfo
}

export interface IReport extends IPost {
  name: string
  price: string
  dateGmt: string
  description: string
  shortDescription: string
  productTags: {
    nodes: {
      id: string
      name: string
    }[]
  }
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