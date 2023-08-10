export const LOGIN_QUERY = `
mutation LoginUser($input: LoginInput!) {
  login(input: $input) {
    clientMutationId
    authToken
    refreshToken
  }
}
`

export const CART_QUERY = `
query MyQuery {
  cart {
    contents {
      edges {
        node {
          id
          quantity
          subtotal
        }
      }
    }
  }
}
`

export const ADD_TO_CART_QUERY = `
mutation MyMutation3 {
  addToCart(input: {productId: 3123}) {
    cart {
      contents {
        nodes {
          key
          product {
            node {
              id
              name
            }
          }
          quantity
          subtotal
        }
      }
    }
  }
}
`

export const USER_QUERY = `
query GetUser($input: ID!) {
  user(id: $input, idType: USERNAME) {
    wooSessionToken
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