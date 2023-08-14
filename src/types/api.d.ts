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

export interface ICreateWatchList {
  user_id: number
  content_id: number
  type: 'post' | 'report'
}
export interface ILoginUser {
  username: string
  password: string
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
  hasMore: boolean
}