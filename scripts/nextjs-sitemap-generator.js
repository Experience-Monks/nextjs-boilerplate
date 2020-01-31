const path = require('path');
const sitemap = require('nextjs-sitemap-generator');

require('dotenv').config({
  path: path.resolve(process.cwd(), `.env.${process.env.BUILD_ENV || process.env.NODE_ENV}`)
});

if (process.env.WEBSITE_SITE_URL) {
  sitemap({
    alternateUrls: {
      // NOTE: use it for multi-languages site
      // en: 'https://example.com/en'
      // es: 'https://example.com/es',
      // ko: 'https://example.com/ko',
      // fr: 'https://example.com/fr'
    },
    baseUrl: process.env.WEBSITE_SITE_URL.replace('://', '://www.'),
    ignoredPaths: ['admin'],
    pagesDirectory: path.resolve(__dirname + '/../src/pages'),
    targetDirectory: 'out/',
    nextConfigPath: path.resolve(__dirname + '/../next.config.js'),
    ignoredExtensions: ['png', 'jpg', 'scss'],
    ignoreIndexFiles: true
  });
}
