const POST_BY_CATEGORY_QUERY = `
  query postByCategory($categorySlug: ID!) {
    category(id: $categorySlug, idType: SLUG) {
      posts {
        edges {
          node {
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
            lanbePost {
              country
              is_save
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
