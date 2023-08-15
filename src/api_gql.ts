import POST_BY_SLUG_QUERY from '@/queries/postBySlug'
import POSTS_QUERY from '@/queries/posts'
import PRODUCTS_QUERY from '@/queries/products'
import REPORT_BY_SLUG_QUERY from '@/queries/reportBySlug'
import CATEGORIES_QUERY from '@/queries/categories'
import CATEGORY_POSTS_QUERY from '@/queries/postByCategory'
import { CHECKOUT_QUERY, ORDER_QUERY } from '@/queries/orders'
import { ADD_TO_CART_QUERY, CART_QUERY, LOGIN_QUERY, REFRESH_TOKEN_QUERY, REGISTER_QUERY, USER_QUERY } from '@/queries/users'
import { AUTH_TOKEN, getStorageData, setStorageData } from './utils/lib'
import { ILoginUser } from './types/api'

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL as string

async function fetchAPI(query = '', { variables }: Record<string, object> = {}) {
  const headers = { 'Content-Type': 'application/json' }
  const tokens = getStorageData(AUTH_TOKEN)

  if (tokens?.authToken && !query?.includes('LoginUser') && !query?.includes('GetUser')) {
    headers['Authorization'] = `Bearer ${tokens.authToken}`
  }

  // headers['woocommerce-session'] = 'Session eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3N0YWdpbmctZDUwZC1pb2J0ZWFtLndwY29tc3RhZ2luZy5jb20iLCJpYXQiOjE2OTEzMjU5NTAsIm5iZiI6MTY5MTMyNTk1MCwiZXhwIjoxNjkyNTM1NTUwLCJkYXRhIjp7ImN1c3RvbWVyX2lkIjoidF9lNWY5OGIxNDNiMjFjZWI2YjAwOWUzZmU2MDE5ZGMifX0.gd1sUXljQ1gYgQkkvISFuyxsxYs4Q8nhHp5NpeQ118Q'

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


  console.log(!tokens?.sessionToken, res.headers)
  if (!tokens?.sessionToken) {
    setStorageData(AUTH_TOKEN, {
      ...tokens,
      sessionToken: res.headers.get('woocommerce-session'),
    })
  }

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error(`Failed to fetch API\n${json.errors?.[0]?.message}`)
  }

  return json.data
}

export async function createOrder(input) {
  const data = await fetchAPI(CHECKOUT_QUERY, {
    variables: { input },
  })

  return data.product
}

export async function createOrderNew(input) {
  const data = await fetchAPI(ORDER_QUERY, {
    variables: { input },
  })

  return data.createOrder
}

export async function getProductBySlug(productSlug) {
  const data = await fetchAPI(REPORT_BY_SLUG_QUERY, {
    variables: { productSlug },
  })

  return data.product
}

export async function getContents(language) {
  const data = await fetchAPI(POSTS_QUERY, {
    variables: { language },
  })

  return data.posts.edges
}

export async function getContentBySlug(postSlug) {
  const data = await fetchAPI(POST_BY_SLUG_QUERY, {
    variables: { postSlug },
  })

  return data.post
}

export async function getAllProducts(language) {
  const data = await fetchAPI(PRODUCTS_QUERY, {
    variables: { language },
  })
  return data.products.edges
}

export async function getAllPosts(language) {
  const data = await fetchAPI(POSTS_QUERY, {
    variables: { language },
  })

  return data.posts.edges
}

export async function getAllCategories(language){
  const data = await fetchAPI(CATEGORIES_QUERY, {
    variables: { language },
  })
  return data.categories.edges
}

export async function getContentsByCategory(categorySlug) {
  const data = await fetchAPI(CATEGORY_POSTS_QUERY, {
    variables: { categorySlug },
  })
  return data.category
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

// EXAMPLE
export async function getAllPostsForHome(preview) {
  const data = await fetchAPI(
    `
    query AllPosts {
      posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
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
                name
                firstName
                lastName
                avatar {
                  url
                }
              }
            }
          }
        }
      }
    }
  `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    }
  )

  return data?.posts
}

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
