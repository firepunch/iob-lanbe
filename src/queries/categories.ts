const CATEGORIES_QUERY = `
  query GetAllCategories {
    categories {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`

export default CATEGORIES_QUERY