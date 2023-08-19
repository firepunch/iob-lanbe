const REPORT_BY_SLUG_QUERY = `
query productBySlug($productSlug: ID!, $userId: Float) {
  product(id: $productSlug, idType: SLUG) {
    databaseId
    name
    slug
    date
    dateGmt
    author {
      node {
        id
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
    attributes {
      edges {
        node {
          id
          name
          options
          
        }
      }
    }
    lanbeContent(user_id: $userId, type: "report") {
      country
      is_save
    }
    featuredImage {
      node {
        altText
        sourceUrl
      }
    }
    productTags {
      nodes {
        id
        name
      }
    }
    description(format: RENDERED)
    shortDescription(format: RAW)
    type
    ... on SimpleProduct {
      price
    }
  }
}
`

export default REPORT_BY_SLUG_QUERY