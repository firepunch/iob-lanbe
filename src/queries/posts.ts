const POSTS_QUERY = `
query AllPosts(
  $language: LanguageCodeFilterEnum!, 
  $userId: Float = 0, 
  $first: Int = 1, 
  $last: Int,
  $before: String, 
  $after: String,
  $field: PostObjectsConnectionOrderbyEnum = DATE,
  $order: OrderEnum = DESC
) {
  posts(
    where: {language: $language, orderby: {field: $field, order: $order}}
    first: $first
    after: $after
    before: $before
    last: $last
  ) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
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
`

export default POSTS_QUERY
