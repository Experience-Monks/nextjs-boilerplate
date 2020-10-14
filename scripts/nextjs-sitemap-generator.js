const path = require('path');
const sitemap = require('nextjs-sitemap-generator');

require('dotenv').config({
  path: path.resolve(process.cwd(), `.env.${process.env.CI_ENV || process.env.NODE_ENV}`)
});

if (process.env.NEXT_PUBLIC_WEBSITE_SITE_URL) {
  sitemap({
    // NOTE: use it for multi-languages site
    // alternateUrls: {
    // en: 'https://example.com/en'
    // es: 'https://example.com/es',
    // ko: 'https://example.com/ko',
    // fr: 'https://example.com/fr'
    // },
    baseUrl: process.env.NEXT_PUBLIC_WEBSITE_SITE_URL.replace('://', '://www.'),
    ignoredPaths: ['admin'],
    pagesDirectory: path.resolve(__dirname + '/../src/pages'),
    targetDirectory: 'out/',
    // NOTE: enabled nextConfigPath option if exportPathMap is enabled in next.config.js
    // nextConfigPath: path.resolve(__dirname + '/../next.config.js'),
    ignoredExtensions: ['png', 'jpg', 'scss'],
    ignoreIndexFiles: true
  });
}
