const REPORT_BY_SLUG_QUERY = `
query productBySlug($productSlug: ID!, $userId: Float, $email: String) {
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
    lanbeContent(user_id: $userId, email: $email, type: "report") {
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
      price(format: FORMATTED)
    }
  }
}
`

export default REPORT_BY_SLUG_QUERY