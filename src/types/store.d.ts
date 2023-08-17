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

export interface IReport extends IPost {
  name: string
  shortDescription: string
}
