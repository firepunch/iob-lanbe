import { gql } from '@apollo/client'

export const CHECKOUT_QUERY = gql`
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