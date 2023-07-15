const POSTS_QUERY = `
  query posts($language: LanguageCodeFilterEnum!) {
    posts(where: {language: $language}) {
      edges {
        node {
          id
          title
          slug
          date
          featuredImage {
            node {
              id
              sourceUrl
            }
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
