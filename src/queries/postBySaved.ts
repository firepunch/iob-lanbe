const POST_BY_SAVED = `
query postBySaved($userId: Float = 0, $language: LanguageCodeFilterEnum = EN) {
  posts(where: {language: $language}) {
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
        categories {
          edges {
            node {
              parentId
              parent {
                node {
                  id
                  name
                }
              }
              id
              name
            }
          }
        }
      }
    }
  }
}
`

export default POST_BY_SAVED
