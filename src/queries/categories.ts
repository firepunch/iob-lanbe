const CATEGORIES_QUERY = `
  query GetAllCategories {
    categories {
      edges {
        node {
          id
          name
<<<<<<< HEAD
          slug
=======
>>>>>>> 1e733aad5f945b445ee9135b27b2e47e485149f0
        }
      }
    }
  }
`

export default CATEGORIES_QUERY