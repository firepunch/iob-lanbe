export interface ICreateUser {
  username: string
  email: string
  password: string
}

export interface ILogin {
  id: string
  password: string
  remember?: boolean
}

export interface IEmailForm{
  email: string
}