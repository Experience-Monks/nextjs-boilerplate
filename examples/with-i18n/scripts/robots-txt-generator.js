const fs = require('fs');
const path = require('path');
const robotstxt = require('generate-robotstxt');
const chalk = require('chalk');

require('dotenv').config({
  path: path.resolve(process.cwd(), `.env.${process.env.BUILD_ENV || process.env.NODE_ENV}`)
});

if (process.env.WEBSITE_SITE_URL) {
  console.log(chalk.cyan('\n###################### robots.txt ######################\n'));

  robotstxt({
    policy: [
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/assets', '/_next'],
        crawlDelay: 2
      },
      {
        userAgent: 'OtherBot',
        allow: '/',
        disallow: ['/assets', '/_next'],
        crawlDelay: 2
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/assets', '/_next'],
        crawlDelay: 10
      }
    ],
    sitemap: `${process.env.WEBSITE_SITE_URL}/sitemap.xml`,
    host: `${process.env.WEBSITE_SITE_URL}`
  })
    .then(content => {
      fs.writeFileSync(path.resolve(__dirname, '../out/robots.txt'), content);

      console.log(chalk.cyan(content));
      console.log(chalk.cyan('\n########################################################\n'));

      return content;
    })
    .catch(error => {
      throw error;
    });
}
