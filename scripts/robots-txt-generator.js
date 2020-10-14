const fs = require('fs');
const path = require('path');
const robotstxt = require('generate-robotstxt');
const chalk = require('chalk');

require('dotenv').config({
  path: path.resolve(process.cwd(), `.env.${process.env.CI_ENV || process.env.NODE_ENV}`)
});

if (process.env.CI_ENV === 'production' && process.env.NEXT_PUBLIC_WEBSITE_SITE_URL) {
  console.log(chalk.cyan('\n###################### robots.txt ######################\n'));

  robotstxt({
    policy: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/_next']
      }
    ],
    sitemap: `${process.env.NEXT_PUBLIC_WEBSITE_SITE_URL}/sitemap.xml`,
    host: `${process.env.NEXT_PUBLIC_WEBSITE_SITE_URL}`
  })
    .then((content) => {
      fs.writeFileSync(path.resolve(__dirname, '../out/robots.txt'), content);

      console.log(chalk.cyan(content));
      console.log(chalk.cyan('\n########################################################\n'));

      return content;
    })
    .catch((error) => {
      throw error;
    });
}
