const CATEGORIES_QUERY = `
  query GetAllCategories {
    categories {
      edges {
        node {
          id
          name
          slug
        }
      }
    }
  }
`

export default CATEGORIES_QUERY