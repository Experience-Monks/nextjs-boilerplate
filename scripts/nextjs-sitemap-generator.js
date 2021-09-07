const path = require('path');
const sitemap = require('nextjs-sitemap-generator');

if (process.env.WEBSITE_SITE_URL) {
  sitemap({
    // NOTE: use it for multi-languages site
    // alternateUrls: {
    // en: 'https://example.com/en'
    // es: 'https://example.com/es',
    // ko: 'https://example.com/ko',
    // fr: 'https://example.com/fr'
    // },
    baseUrl: process.env.WEBSITE_SITE_URL.replace('://', '://www.'),
    ignoredPaths: ['/404', '/unsupported', '/api'],
    pagesDirectory: path.resolve(__dirname + '/../src/pages'),
    targetDirectory: 'out/',
    // NOTE: enabled nextConfigPath option if exportPathMap is enabled in next.config.js
    nextConfigPath: path.resolve(__dirname + '/../next.config.js'),
    ignoredExtensions: ['png', 'jpg', 'scss'],
    ignoreIndexFiles: true
  });
}
