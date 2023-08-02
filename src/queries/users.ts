export const LOGIN_QUERY = `
mutation LoginUser($input: LoginInput!) {
  login(input: $input) {
    authToken
    clientMutationId
    refreshToken
    sessionToken
  }
}`

export const REGISTER_QUERY = `
mutation RegisterUser($input: RegisterUserInput!) {
  registerUser(input: $input) {
    user {
      jwtAuthToken
      jwtRefreshToken
    }
  }
}
`
