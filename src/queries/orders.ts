import { gql } from '@apollo/client'

export const ORDER_QUERY = `
mutation Order($input: CreateOrderInput!) {
  createOrder(input: $input) {
    orderId
    order {
      downloadableItems {
        nodes {
          downloadId
          download {
            file
          }
        }
      }
    }
  }
}
`

export const FETCH_ORDER_QUERY = `
query fetchOrder($id: ID) {
  order(id: $id, idType: DATABASE_ID) {
    id
    orderNumber
    downloadableItems {
      nodes {
        downloadId
        download {
          file
        }
      }
    }
  }
}
`

export const CHECKOUT_QUERY = `
mutation Checkout($input: CheckoutInput!) {
  checkout(input: $input) {
    order {
      orderNumber
      total
      lineItems {
        nodes {
          orderId
          productId
          quantity
          subtotal
        }
      }
    }
  }
}`

// mutation Checkout($input: CheckoutInput!) {
//   checkout(input: $input) {
//     order {
//       currency
//       date
//       id
//       status
//       total
//     }
//   }
// }`

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
