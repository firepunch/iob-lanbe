const POST_BY_SEARCH = `
query postBySearch($filter: String!) {
  posts(filter: $filter) {
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

export default POST_BY_SEARCH
