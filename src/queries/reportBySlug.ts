const REPORT_BY_SLUG_QUERY = `
query productBySlug($productSlug: ID!) {
  product(id: $productSlug, idType: SLUG) {
    attributes {
      nodes {
        id
        name
      }
    }
    content(format: RAW)
    databaseId
    name
    productId
    title(format: RAW)
    totalSales
    ... on VariableProduct {
      id
      name
      attributes {
        edges {
          node {
            id
          }
        }
      }
      content(format: RAW)
      description(format: RAW)
    }
  }
}
`

export default REPORT_BY_SLUG_QUERY