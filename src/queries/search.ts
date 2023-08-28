const SEARCH_QUERY = `
query getSearchResult($postLanguage: LanguageCodeFilterEnum!, $reportLanguage: String, $userId: Float, $keyword: String = "") {
  products(where: {category: $reportLanguage, search: $keyword}) {
    edges {
      node {
        databaseId
        id
        name
        type
        slug
        shortDescription(format: RAW)
        image {
          id
          sourceUrl
          altText
        }
        lanbeContent(user_id: $userId, type: "report") {
          country
          is_save
        }
        ... on SimpleProduct {
          id
          name
          price
          salePrice
          regularPrice
        }
        ... on VariableProduct {
          id
          name
          price
          salePrice
          regularPrice
        }
      }
    }
  }
  posts(
    where: {language: $postLanguage, search: $keyword}
  ) {
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
          country
        }
        language {
          code
          locale
        }
      }
    }
  }
}
`

export default SEARCH_QUERY