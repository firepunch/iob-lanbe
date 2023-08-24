const POSTS_QUERY = `
query posts($language: LanguageCodeFilterEnum!, $userId: Float, $first: Int = 10, $field: PostObjectsConnectionOrderbyEnum = DATE, $order: OrderEnum = DESC) {
  posts(
    where: {language: $language, orderby: {field: $field, order: $order}}
    first: $first
  ) {
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
