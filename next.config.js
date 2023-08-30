if (!process.env.WORDPRESS_API_URL) {
  throw new Error(`
    Please provide a valid WordPress instance URL.
    Add to your environment variables WORDPRESS_API_URL.
  `)
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      process.env.WORDPRESS_API_URL?.match(/(?!(w+)\.)\w*-(?:\w+\.)+\w+/)?.[0] || process.env.WORDPRESS_API_URL, // Valid WP Image domain.
      'iob.team',
      'i0.wp.com',
    ],
  },
  sassOptions: {
    prependData: `@import 'src/styles/_variables.scss'; @import 'src/styles/_mixins.scss';`,
  },
}

module.exports = nextConfig
