import CATEGORIES_QUERY from '@/queries/categories'
import { CHECKOUT_QUERY, FETCH_ORDER_QUERY, ORDER_QUERY } from '@/queries/orders'
import POST_BY_CATEGORY_QUERY from '@/queries/postByCategory'
import POST_BY_SLUG_QUERY from '@/queries/postBySlug'
import POSTS_QUERY from '@/queries/posts'
import PRODUCTS_QUERY from '@/queries/products'
import REPORT_BY_SLUG_QUERY from '@/queries/reportBySlug'
import CATEGORY_POSTS_QUERY from '@/queries/postByCategory'
import DATABASEID_POSTS_QUERY from '@/queries/postByDatabaseid'
import POST_BY_SAVED from './queries/postBySaved'
import { LOGIN_QUERY, REFRESH_TOKEN_QUERY, REGISTER_QUERY } from '@/queries/users'
import { AUTH_TOKEN, getStorageData, setStorageData } from './utils/lib'
import { ILoginUser } from './types/api'
import PRODUCT_BY_SAVED from './queries/productBySaved'
import SEARCH_QUERY from './queries/search'

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL as string

async function fetchAPI (query = '', { variables }: Record<string, object> = {}) {
  const headers = { 'Content-Type': 'application/json' }
  const [tokens, isRemember] = getStorageData(AUTH_TOKEN)

  // const refreshQuery = query.match(/(LoginUser)|(GetUser)/gi)
  // if (tokens?.authToken && !refreshQuery) {
  //   headers['Authorization'] = `Bearer ${tokens.authToken}`
  // }

  if (tokens?.sessionToken) {
    headers['woocommerce-session'] = `Session ${tokens.sessionToken}`
  }

  const res = await fetch(`${API_URL}/graphql`, {
    headers,
    method: 'POST',
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  if (!tokens?.sessionToken) {
    setStorageData(
      AUTH_TOKEN, 
      {
        ...tokens,
        sessionToken: res.headers.get('woocommerce-session'),
      },
      isRemember)
  }

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)

    // if (json.errors?.[0].debugMessage?.includes('Expired token')) {
    // alert('Expired Token')
    // window.location.replace('/sign-in')
    //   return
    // }

    throw new Error(`Failed to fetch API\n${json.errors?.[0]?.message}`)
  }
  return json.data
}

export async function createCheckout(input) {
  const data = await fetchAPI(CHECKOUT_QUERY, {
    variables: { input },
  })
  return data.product
}

export async function createOrder(input) {
  const data = await fetchAPI(ORDER_QUERY, {
    variables: { input },
  })
  return data.createOrder
}

export async function fetchOrder(id) {
  const data = await fetchAPI(FETCH_ORDER_QUERY, {
    variables: { id },
  })
  return data.order
}

export async function getProductBySlug(variables) {
  const data = await fetchAPI(REPORT_BY_SLUG_QUERY, {
    variables,
  })
  return data.product
}

export async function getContents(language) {
  const data = await fetchAPI(POSTS_QUERY, {
    variables: { language },
  })

  return data.posts.edges
}

export async function getContentBySlug(postSlug, userId) {
  const data = await fetchAPI(POST_BY_SLUG_QUERY, {
    variables: { postSlug, userId },
  })

  return data.post
}

export async function getAllProducts(variables) {
  const data = await fetchAPI(PRODUCTS_QUERY, {
    variables,
  })
  return data.products
}

export async function getAllCategories(language) {
  const data = await fetchAPI(CATEGORIES_QUERY, {
    variables: { language },
  })
  return data.categories.edges
}

export async function getAllPosts(variables) {
  const data = await fetchAPI(POSTS_QUERY, {
    variables,
  })
  return data.posts
}

export async function getContentsByCategory(variables) {
  const data = await fetchAPI(POST_BY_CATEGORY_QUERY, {
    variables,
  })
  return data.category?.posts.edges
}

export async function createUser(input) {
  const data = await fetchAPI(REGISTER_QUERY, {
    variables: { input },
  })
  return data.registerUser
}

export async function loginUser(input: ILoginUser) {
  const data = await fetchAPI(LOGIN_QUERY, {
    variables: { input },
  })
  return data.login
}

export async function refreshToken() {
  const data = await fetchAPI(REFRESH_TOKEN_QUERY, {
    variables: { refreshToken },
  })
  return data
}

export async function getContentByDatabaseID(databaseID) {
  const data = await fetchAPI(DATABASEID_POSTS_QUERY, {
    variables: { databaseID },
  })
  return data
}

export async function getPostBySaved(variables) {
  const data = await fetchAPI(POST_BY_SAVED, {
    variables,
  })
  return data.posts.edges
}

export async function getProductBySaved(variables) {
  const data = await fetchAPI(PRODUCT_BY_SAVED, {
    variables,
  })
  return data.products.edges
}

export async function getSearchResults(variables) {
  const data = await fetchAPI(SEARCH_QUERY, {
    variables,
  })
  return {
    posts: data.posts.edges,
    products: data.products.edges,
  }
}

// EXAMPLE
export async function getPostAndMorePosts(slug, preview, previewData) {
  const postPreview = preview && previewData?.post
  // The slug may be the id of an unpublished post
  const isId = Number.isInteger(Number(slug))
  const isSamePost = isId
    ? Number(slug) === postPreview.id
    : slug === postPreview.slug
  const isDraft = isSamePost && postPreview?.status === 'draft'
  const isRevision = isSamePost && postPreview?.status === 'publish'
  const data = await fetchAPI(
    `
    fragment AuthorFields on User {
      name
      firstName
      lastName
      avatar {
        url
      }
    }
    fragment PostFields on Post {
      title
      excerpt
      slug
      date
      featuredImage {
        node {
          sourceUrl
        }
      }
      author {
        node {
          ...AuthorFields
        }
      }
      categories {
        edges {
          node {
            name
          }
        }
      }
      tags {
        edges {
          node {
            name
          }
        }
      }
    }
    query PostBySlug($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        ...PostFields
        content
        ${
  // Only some of the fields of a revision are considered as there are some inconsistencies
  isRevision
    ? `
        revisions(first: 1, where: { orderby: { field: MODIFIED, order: DESC } }) {
          edges {
            node {
              title
              excerpt
              content
              author {
                node {
                  ...AuthorFields
                }
              }
            }
          }
        }
        `
    : ''
}
      }
      posts(first: 3, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            ...PostFields
          }
        }
      }
    }
  `,
    {
      variables: {
        id: isDraft ? postPreview.id : slug,
        idType: isDraft ? 'DATABASE_ID' : 'SLUG',
      },
    }
  )

  // Draft posts may not have an slug
  if (isDraft) data.post.slug = postPreview.id
  // Apply a revision (changes in a published post)
  if (isRevision && data.post.revisions) {
    const revision = data.post.revisions.edges[0]?.node

    if (revision) Object.assign(data.post, revision)
    delete data.post.revisions
  }

  // Filter out the main post
  data.posts.edges = data.posts.edges.filter(({ node }) => node.slug !== slug)
  // If there are still 3 posts, remove the last one
  if (data.posts.edges.length > 2) data.posts.edges.pop()

  return data
}
