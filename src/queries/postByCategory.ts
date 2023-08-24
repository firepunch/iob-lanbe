const POST_BY_CATEGORY_QUERY = `
query postByCategory($categorySlug: ID!, $userId: Float, $first: Int = 10, $field: PostObjectsConnectionOrderbyEnum = DATE, $order: OrderEnum = DESC) {
  category(id: $categorySlug, idType: SLUG) {
    posts(first: $first, where: {orderby: {field: $field, order: $order}}) {
      edges {
        node {
          databaseId
          id
          title
          slug
          date
          tags {
            nodes {
              id
              name
            }
          }
          featuredImage {
            node {
              id
              sourceUrl
            }
          }
          lanbeContent(user_id: $userId) {
            is_save
            country
          }
          language {
            code
            locale
          }
        }
      }
    }
  }
}
`

export default POST_BY_CATEGORY_QUERY
