const POST_BY_SLUG_QUERY = `
query postBySlug($postSlug: ID!) {
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
          id
          name
          parentId
        }
      }
    }
    featuredImage {
      node {
        sourceUrl
        altText
      }
    }
    lanbeContent {
      country
      is_save
    }
    postCountry {
      lanbeCountry
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
