import { gql } from '@apollo/client'

export const CHECKOUT_QUERY = `mutation Checkout($input: CheckoutInput!) {
  checkout(input: $input) {
    order {
      currency
      date
      id
      status
      total
    }
  }
}`

export const OLD_CHECKOUT_QUERY = gql`
mutation Checkout($input: CheckoutInput!) {
  checkout(input: $input) {
    order {
      databaseId
      orderNumber
      total
      lineItems {
        nodes {
          product {
            name
            databaseId
          }
        }
      }
    }
  }
}
`