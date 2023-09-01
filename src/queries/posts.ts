const POSTS_QUERY = `
query postsQuery(
  $language: LanguageCodeFilterEnum!, 
  $userId: Float = 0, 
  $first: Int = 10, 
  $field: PostObjectsConnectionOrderbyEnum = DATE,
  $order: OrderEnum = DESC
) {
  posts(
    where: {language: $language, orderby: {field: $field, order: $order}}
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
  $categoryId: Int = 0,
  $first: Int = 100, 
  $last: Int,
  $before: String, 
  $after: String,
  $field: PostObjectsConnectionOrderbyEnum = DATE,
  $order: OrderEnum = DESC,
  $categoryName: String = "",
  $in: [ID] = []
) {
  posts(
    where: {
      language: $language, 
      categoryId: $categoryId,
      categoryName: $categoryName, 
      orderby: {field: $field, order: $order},
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
