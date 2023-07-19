const PRODUCTS_QUERY = `
query products($language: String) {
  products(where: {category: $language}) {
    edges {
      cursor
      node {
        id
        name
        type
        slug
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
      }
    }
  }
}
`

export default PRODUCTS_QUERY
