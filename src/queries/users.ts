export const USER_QUERY = `
query GetUser($userId: ID!) {
  user(id: $userId, idType: DATABASE_ID) {
    name
    email
  }
}
`

export const LOGIN_QUERY = `
mutation LoginUser($input: LoginInput!) {
  login(input: $input) {
    user {
      databaseId
      email
      name
      registeredDate
    }
    clientMutationId
    authToken
    refreshToken
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