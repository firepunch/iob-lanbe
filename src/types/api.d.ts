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