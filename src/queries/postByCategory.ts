const POST_BY_CATEGORY_QUERY = `
query postByCategory($categorySlug: ID!, $userId: Float) {
  category(id: $categorySlug, idType: SLUG) {
    posts {
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
