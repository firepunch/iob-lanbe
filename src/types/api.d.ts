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

export interface ISearchRequest{
  'first-name': string,
  'last-name': string,
  'user-email': string,
  'message': string
}