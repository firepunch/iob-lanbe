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

export type ILanbePost = {
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
  featuredImage?: IFeaturedImage
  tags: ITags
  lanbePost: ILanbePost
}
