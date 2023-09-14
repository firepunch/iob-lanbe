const SEARCH_QUERY = `
query getSearchResult(
  $language: LanguageCodeFilterEnum!,
  $lang: String = "en", 
  $userId: Float = 0,
  $keyword: String = "",
  $taxQuery: TaxQuery = {}
) {
  posts(
    where: {
      language: $language,
      search: $keyword,
      taxQuery: $taxQuery
    }
  ) {
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
          edges {
            node {
              id
              name
            }
          }
        }
        featuredImage {
          node {
            id
            sourceUrl
          }
        }
        lanbeContent(user_id: $userId, lang: $lang, type: "post") {
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
  reports(
    where: {
      language: $language,
      search: $keyword,
      taxQuery: $taxQuery
    }
  ) {
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
        lanbeContent(user_id: $userId, lang: $lang, type: "report") {
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