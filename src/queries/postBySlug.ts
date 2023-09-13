const POST_BY_SLUG_QUERY = `
query postBySlug($postSlug: ID!, $userId: Float, $lang: String) {
  post(id: $postSlug, idType: SLUG) {
    id
    databaseId
    title
    uri
    slug
    date
    content
    excerpt
    translations {
      slug
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
    featuredImage {
      node {
        sourceUrl
        altText
      }
    }
    lanbeContent(user_id: $userId, type: "post", lang: $lang) {
      country
      is_save
      subTitle
    }
    tags {
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

export const GET_POST_META_QUERY = `
query postMetaQuery($postSlug: ID!) {
  post(id: $postSlug, idType: SLUG) {
    title
    excerpt
    dateGmt
    categories {
      nodes {
        name
      }
    }
    tags {
      nodes {
        name
      }
    }
    author {
      node {
        name
      }
    }
    featuredImage {
      node {
        link
        sourceUrl
        uri
      }
    }
  }
}
`

export default POST_BY_SLUG_QUERY
