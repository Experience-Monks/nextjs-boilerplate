import React, { memo } from 'react';
import PropTypes from 'prop-types';
import checkProps from '@jam3/react-check-extra-props';
import NextHead from 'next/head';
import { useRouter } from 'next/router';

import { siteName, siteSlogan } from '../../data/settings';

const TITLE_SEPARATOR = '|';

function Head({ title, description, keywords }) {
  const router = useRouter();

  const ogUrl = `${process.env.NEXT_PUBLIC_WEBSITE_SITE_URL}${router.asPath}`;
  const fullTitle = title ? `${title} ${TITLE_SEPARATOR} ${siteName}` : `${siteName} ${TITLE_SEPARATOR} ${siteSlogan}`;

  return (
    <NextHead>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join()} />
      {/* Generate favicons in https://realfavicongenerator.net */}
      <meta name="theme-color" content="#ffffff" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
      <link rel="manifest" href="/favicons/site.webmanifest" />
      <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#000000" />
      <link rel="shortcut icon" href="/favicons/favicon.ico" />
      <meta name="msapplication-config" content="/favicons/browserconfig.xml" />
      {/* Share meta tags */}
      <meta property="og:locale" content="en_US" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image" content="/_next/static/images/share-image.jpg" />
      <meta name="twitter:card" content="Default content" />
      <meta property="fb:app_id" content="FB_APP_ID" />
      <meta name="google-site-verification" content="[Google Web Master Tools]" />
      <meta name="msvalidate.01" content="[Bing Web Master Tools]" />
      {/* Other recommends */}
      <link rel="canonical" href={ogUrl} />
      {process.env.NEXT_PUBLIC_DNS_PREFETCH && <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_DNS_PREFETCH} />}
    </NextHead>
  );
}

Head.propTypes = checkProps({
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.array
});

Head.defaultProps = {
  description: 'Default Description',
  keywords: ['Jam3', 'Web App', 'React', 'NextJS']
};

export default memo(Head);
