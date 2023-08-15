const CATEGORY_POSTS_QUERY = `
  query GetCategoryPosts($categorySlug: ID!) {
    category(id: $categorySlug, idType: SLUG) {
      name
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
  }
`

export default CATEGORY_POSTS_QUERY
