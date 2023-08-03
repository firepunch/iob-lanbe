export const LOGIN_QUERY = `
mutation LoginUser($input: LoginInput!) {
  login(input: $input) {
    clientMutationId
    authToken
    refreshToken
    sessionToken
  }
}
`

export const REGISTER_QUERY = `
mutation RegisterUser($input: RegisterUserInput!) {
  registerUser(input: $input) {
    clientMutationId
    user {
      jwtAuthToken
      jwtRefreshToken
    }
  }
}
`

export const REFRESH_TOKEN_QUERY = `
mutation RefreshAuthToken($refreshToken: String!) {
  refreshJwtAuthToken(input: { jwtRefreshToken: $refreshToken }) {
    authToken
    sessionToken
  }
}
`