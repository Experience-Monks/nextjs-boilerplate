const fs = require('fs');
const path = require('path');
const robotstxt = require('generate-robotstxt');
const chalk = require('chalk');

if (process.env.NEXT_PUBLIC_ENVIRONMENT === 'production' && process.env.WEBSITE_SITE_URL) {
  console.log(chalk.cyan('\n###################### robots.txt ######################\n'));

  robotstxt({
    policy: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/_next', '404', 'unsupported']
      }
    ],
    sitemap: `${process.env.WEBSITE_SITE_URL}/sitemap.xml`,
    host: `${process.env.WEBSITE_SITE_URL}`
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
