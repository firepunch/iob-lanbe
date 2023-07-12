if (!process.env.WORDPRESS_API_URL) {
  throw new Error(`
    Please provide a valid WordPress instance URL.
    Add to your environment variables WORDPRESS_API_URL.
  `)
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      // iob-develop.firepunch.buzz
      process.env.WORDPRESS_API_URL.match(/(?!(w+)\.)\w*-(?:\w+\.)+\w+/)[0], // Valid WP Image domain.
      '0.gravatar.com',
      '1.gravatar.com',
      '2.gravatar.com',
      'secure.gravatar.com',
    ],
  },
  i18n: {
    locales: ['default', 'en', 'ko'],
    defaultLocale: 'default',
    localeDetection: false,
  },
  trailingSlash: true,
  sassOptions: {
    prependData: `@import 'app/styles/_variables.scss'; @import 'app/styles/_mixins.scss';`,
  }
}

module.exports = nextConfig
