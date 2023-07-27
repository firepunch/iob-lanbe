const POSTS_QUERY = `
query posts {
  posts {
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
