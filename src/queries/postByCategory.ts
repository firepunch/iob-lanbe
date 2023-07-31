const CATEGORY_POSTS_QUERY = `
  query GetCategoryPosts($categoryId: ID!) {
    category(id: $categoryId) {
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
