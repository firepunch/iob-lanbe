const DATABASEID_POSTS_QUERY = `
  query GetDatabaseIdPost($databaseID: ID!) {
    post(id: $databaseID, idType: DATABASE_ID) {
        id
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
            }
          }
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

export default DATABASEID_POSTS_QUERY
