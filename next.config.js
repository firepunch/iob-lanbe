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
      'api.iob.team',
      'iob.team',
      'staging-b50d-iobteam.wpcomstaging.com',
      'i0.wp.com',
    ],
  },
  sassOptions: {
    prependData: `@import 'src/styles/_variables.scss'; @import 'src/styles/_mixins.scss';`,
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
