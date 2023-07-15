const PRODUCTS_QUERY = `
  query {
    products(first: 10) {
      edges {
        cursor
        node {
          id
          name
          shortDescription(format: RAW)
          image {
            id
            sourceUrl
            altText
          }
          ... on SimpleProduct {
            id
            name
            price
            salePrice
            regularPrice
          }
          ... on VariableProduct {
            id
            name
            price
            salePrice
            regularPrice
          }
          type
        }
      }
    }
  }
`

export default PRODUCTS_QUERY
