const SEARCH_QUERY = `
query getSearchResult($language: LanguageCodeFilterEnum!, $userId: Float = 0, $keyword: String = "") {
  posts(where: {language: $language, search: $keyword}) {
    pageInfo {
      total
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
  reports(where: {language: $language, search: $keyword}) {
    pageInfo {
      total
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

export default SEARCH_QUERY