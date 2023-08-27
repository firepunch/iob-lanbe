const PRODUCTS_QUERY = `
query products(
  $language: String, 
  $userId: Float = 0, 
  $first: Int = 10, 
  $last: Int,
  $before: String, 
  $after: String,
  $field: ProductsOrderByEnum = DATE,
  $order: OrderEnum = DESC
) {
  products(
    where: {category: $language, orderby: {field: $field, order: $order}}
    first: $first
    after: $after
    before: $before
    last: $last
  ) {
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
    pageInfo {
      endCursor
      hasPreviousPage
      hasNextPage
      startCursor
      total
    }
  }
}
`

export default PRODUCTS_QUERY
