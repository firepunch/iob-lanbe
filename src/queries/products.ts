const PRODUCTS_QUERY = `
query products($language: String, $userId: Float) {
  products(where: {category: $language}) {
    edges {
      cursor
      node {
        databaseId
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
        lanbeContent(user_id: $userId, type: "report") {
          country
          is_save
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
