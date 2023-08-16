const POSTS_QUERY = `
query posts($language: LanguageCodeFilterEnum!, $userId: Float) {
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
          lanbePost(user_id: $userId){
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
