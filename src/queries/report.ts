export const REPORTS_QUERY = `
query AllReports(
  $language: LanguageCodeFilterEnum!, 
  $userId: Float = 0, 
  $first: Int = 10, 
  $field: PostObjectsConnectionOrderbyEnum = DATE,
  $order: OrderEnum = DESC
) {
  reports(
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
        excerpt
        reportTags {
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
          pages
        }
        reportCategories {
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
