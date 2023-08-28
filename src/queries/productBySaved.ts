const PRODUCT_BY_SAVED = `
query productBySaved($userId: Float = 0, $language: String) {
    products(where: {category: $language}) {
      edges {
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


export default PRODUCT_BY_SAVED
