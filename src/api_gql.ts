import CATEGORIES_QUERY from '@/queries/categories'
import { CHECKOUT_QUERY, FETCH_ORDER_QUERY, ORDER_QUERY } from '@/queries/orders'
import DATABASEID_POSTS_QUERY from '@/queries/postByDatabaseid'
import POST_BY_SLUG_QUERY, { GET_POST_META_QUERY } from '@/queries/postBySlug'
import POSTS_QUERY, { GET_POSTS_QUERY } from '@/queries/posts'
import REPORT_BY_SLUG_QUERY from '@/queries/reportBySlug'
import { LOGIN_QUERY, REFRESH_TOKEN_QUERY, REGISTER_QUERY, USER_QUERY } from '@/queries/users'
import PRODUCT_BY_SAVED from './queries/productBySaved'
import { REPORTS_QUERY, REPORT_QUERY } from './queries/report'
import SEARCH_QUERY from './queries/search'
import { ILoginUser } from './types/api'
import { AUTH_TOKEN, getStorageData, setStorageData } from './utils/lib'

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

  const json = await res?.json()

  if (!json || json?.errors) {
    console.error(json?.errors)

    if (query.includes('LoginUser')) {
      return { login: { error: json?.errors?.[0]?.message } }
    }

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

export async function getReportBySlug(variables) {
  const data = await fetchAPI(REPORT_QUERY, {
    variables,
  })
  return data.report
}

export async function getContents(language, first = 10) {
  const data = await fetchAPI(POSTS_QUERY, {
    variables: { language, first, lang: language.toLowerCase() },
  })

  return data.posts.edges
}

export async function getContentBySlug(variables) {
  const data = await fetchAPI(POST_BY_SLUG_QUERY, {
    variables,
  })

  return data.post
}

export async function getAllReports(variables) {
  const data = await fetchAPI(REPORTS_QUERY, {
    variables,
  })
  return data.reports
}

export async function getAllCategories(language) {
  const data = await fetchAPI(CATEGORIES_QUERY, {
    variables: { language },
  })
  return data.categories.edges
}

export async function getPosts(variables) {
  const data = await fetchAPI(GET_POSTS_QUERY, {
    variables,
  })
  return data.posts
}

export async function getAllPosts(variables) {
  const data = await fetchAPI(POSTS_QUERY, {
    variables,
  })
  return data.posts
}

export async function getMetaData(variables) {
  const data = await fetchAPI(GET_POST_META_QUERY, {
    variables,
  })
  return data.post
}

export async function createUser(input) {
  const data = await fetchAPI(REGISTER_QUERY, {
    variables: { input },
  })
  return data.registerUser
}

export async function authUser(userId: number) {
  const data = await fetchAPI(USER_QUERY, {
    variables: { userId },
  })
  return data.user
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
  return data
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
