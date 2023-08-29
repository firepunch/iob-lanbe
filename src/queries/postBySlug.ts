const POST_BY_SLUG_QUERY = `
query postBySlug($postSlug: ID!, $userId: Float) {
  post(id: $postSlug, idType: SLUG) {
    id
    databaseId
    title
    uri
    date
    content
    excerpt(format: RAW)
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
    featuredImage {
      node {
        sourceUrl
        altText
      }
    }
    lanbeContent(user_id: $userId) {
      country
      is_save
    }
    tags {
      edges {
        node {
          id
          name
        }
      }
    }
    author {
      node {
        name
        roles {
          edges {
            node {
              id
            }
          }
        }
      }
    }
  }
}
`

export default POST_BY_SLUG_QUERY
