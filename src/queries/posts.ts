const POSTS_QUERY = `
query postsQuery(
  $language: LanguageCodeFilterEnum!, 
  $userId: Float = 0, 
  $first: Int = 10, 
  $field: PostObjectsConnectionOrderbyEnum = DATE,
  $order: OrderEnum = DESC,
  $taxQuery: TaxQuery = {}
) {
  posts(
    where: {
      language: $language, 
      orderby: {field: $field, order: $order},
      taxQuery: $taxQuery
    }
    first: $first
  ) {
    pageInfo {
      total
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      node {
        databaseId
        id
        title
        slug
        date
        viewCounts
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
        lanbeContent(user_id: $userId) {
          is_save
          country
        }
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
      }
    }
  }
}
`

export const GET_POSTS_QUERY = `
query getPostsQuery(
  $language: LanguageCodeFilterEnum!, 
  $userId: Float = 0, 
  $first: Int = 100, 
  $last: Int,
  $before: String, 
  $after: String,
  $field: PostObjectsConnectionOrderbyEnum = DATE,
  $order: OrderEnum = DESC,
  $in: [ID] = [],
  $taxQuery: TaxQuery = {}
) {
  posts(
    where: {
      language: $language, 
      orderby: {field: $field, order: $order},
      taxQuery: $taxQuery, 
      in: $in
    }
    first: $first
    after: $after
    before: $before
    last: $last
  ) {
    pageInfo {
      total
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      cursor
      node {
        databaseId
        id
        title
        slug
        date
        viewCounts
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
        lanbeContent(user_id: $userId) {
          is_save
          country
        }
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
      }
    }
  }
}
`

export default POSTS_QUERY
