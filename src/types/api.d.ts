export interface ICreateUser {
  clientMutationId: string
  username: string
  email: string
  password: string
}

export interface IFetchWatchList {
  user_id: number
  type: 'post' | 'report'
}

export interface IBodyWatchList {
  type: 'post' | 'report'
  content_id: number
  user_id: number
}

export interface IFetchNotes {
  user_id: number
  post_id?: number
}

export interface ICountData {
  user_id: number
  content_id?: number
  type?: 'post' | 'report'
}

export interface ICreateNote {
  user_id: number
  post_id: number
  content: string
}

export interface IUpdateNote {
  note_id: number
  content: string
}

export interface ILoginUser {
  username: string
  password: string
  remember?: boolean
}

export interface IEmailForm{
  'user-email': string
}

export interface IEmailForm{
  'user-email': string
}

export interface ISearchRequest{
  'first-name': string,
  'last-name': string,
  'user-email': string,
  'message': string
}

export interface IStripeCard {
  id: string
  card: {
    brand: string
    last4: string
    exp_year: number
    exp_month: number
  }
  billing_details: {
    email: string
  }
}

export interface ISearchBar{
  search: string
  billing_details: {
    email: string
    name: string
    address: {
      country: string
    }
  }
}

export interface IStripePaymentIntents {
  id: string
  amount: number
  currency: string
  created: number
}

export interface IPaymentHistory {
  data: IStripePaymentIntents[]
  has_more: boolean
}
