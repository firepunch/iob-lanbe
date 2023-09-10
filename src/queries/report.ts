export const REPORTS_QUERY = `
query AllReports(
  $language: LanguageCodeFilterEnum!, 
  $lang: String = "en", 
  $userId: Float = 0, 
  $first: Int = 100, 
  $last: Int,
  $before: String, 
  $after: String,
  $field: PostObjectsConnectionOrderbyEnum = DATE,
  $order: OrderEnum = DESC,
  $in: [ID] = []
) {
  reports (
    where: {
      language: $language, 
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
      node {
        databaseId
        id
        title
        slug
        date
        excerpt
        viewCounts
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
        lanbeContent(user_id: $userId, type: "report", lang: $lang) {
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

export const REPORT_QUERY = `
query reportBySlug(
  $lang: String = "en", 
  $reportSlug: ID!, 
  $userId: Float,
) {
  report(id: $reportSlug, idType: URI) {
    id
    databaseId
    title
    uri
    date
    content
    excerpt(format: RAW)
    translations {
      slug
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
    featuredImage {
      node {
        sourceUrl
        altText
      }
    }
    lanbeReportFields {
      pages
      whtItMatters
      downloadFile {
        id
        link
        fileSize
      }
      thirdImage {
        id
        link
      }
    }
    lanbeContent(user_id: $userId, type: "report", lang: $lang) {
      is_save
      pages
      downloadFile
      whyItMatters
      firstImage
      secondImage
      secondText
      thirdText
      thirdImage
    }
    reportTags {
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