export interface ICreateUser {
  clientMutationId: string
  username: string
  email: string
  password: string
}

export interface ILoginUser {
  username: string
  password: string
  remember?: boolean
}

export interface IEmailForm{
  'user-email': string
}

export interface IStripeCard {
  id: string
  card: {
    brand: string
    last4: string
    exp_year: number
    exp_month: number
  }
}