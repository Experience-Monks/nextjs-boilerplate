// for more config options;
// https://www.npmjs.com/package/next-sitemap#configuration-options

module.exports = {
  // ========================
  // sitemap.xml
  // ========================
  siteUrl: process.env.WEBSITE_SITE_URL || 'https://something-is-wrong-if-you-see-this.com',
  changefreq: 'daily', // always hourly daily weekly monthly yearly never
  priority: 0.7, // between 0 and 1
  sitemapSize: 5000,
  exclude: [
    '/unsupported'
    // '/page-0'
    // '/page-*'
    // '/private/*'
  ],
  alternateRefs: [
    // multi-language support
    // {
    //   href: 'https://example.com/fr',
    //   hreflang: 'fr'
    // }
  ],
  // transform: async (config, path) => {},
  // additionalPaths: async (config) => {},
  outDir: 'out',
  autoLastmod: true,
  // ========================
  // robots.txt
  // ========================
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/_next', '/404', '/500', '/unsupported', '/favicons']
      }
    ]
  }
};
