import { FC, memo } from 'react';
import dynamic from 'next/dynamic';
import NextHead from 'next/head';
import { useRouter } from 'next/router';

import * as settings from '@/data/settings';
import { HeadProps } from '@/data/types';

const MockFeaturePolicy = dynamic(() => import('@/components/Head/MockFeaturePolicy'), { ssr: false });
const MockContentSecurityPolicy = dynamic(() => import('@/components/Head/MockContentSecurityPolicy'), { ssr: false });

const TITLE_SEPARATOR = '|';

const Head: FC<HeadProps> = ({ title, keywords, description, siteName, image }) => {
  const router = useRouter();

  const ogUrl = `${process.env.NEXT_PUBLIC_WEBSITE_SITE_URL}${router.asPath}`;
  const ogDefaultImage = image || `${process.env.NEXT_PUBLIC_WEBSITE_SITE_URL}/common/assets/images/share-image.jpg`;
  const fullTitle = title
    ? `${title} ${TITLE_SEPARATOR} ${siteName || settings.siteName}`
    : `${siteName} ${TITLE_SEPARATOR} ${settings.siteSlogan}`;

  return (
    <NextHead>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <title>{fullTitle}</title>
      <meta name="description" content={description || settings.siteDescription} />
      <meta name="keywords" content={(keywords || settings.siteKeywords).join(', ')} />
      {/* Generate favicons in https://realfavicongenerator.net */}
      <meta name="theme-color" content="#ffffff" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <link rel="apple-touch-icon" sizes="180x180" href="/common/favicons/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/common/favicons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/common/favicons/favicon-16x16.png" />
      <link rel="manifest" href="/common/favicons/site.webmanifest" crossOrigin="use-credentials" />
      <link rel="mask-icon" href="/common/favicons/safari-pinned-tab.svg" color="#000000" />
      <link rel="shortcut icon" href="/common/favicons/favicon.ico" />
      <meta name="msapplication-config" content="/common/favicons/browserconfig.xml" />
      {/* Share meta tags */}
      <meta property="og:locale" content="en_US" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image" content={ogDefaultImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="fb:app_id" content="FB_APP_ID" />
      <meta name="google-site-verification" content="[Google Web Master Tools]" />
      <meta name="msvalidate.01" content="[Bing Web Master Tools]" />
      {/* Other recommends */}
      <link rel="canonical" href={ogUrl} />

      {process.env.NEXT_PUBLIC_DNS_PREFETCH && (
        <>
          <link rel="preconnect" href={process.env.NEXT_PUBLIC_DNS_PREFETCH} crossOrigin="true" />
          <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_DNS_PREFETCH} />
        </>
      )}

      {process.env.NODE_ENV === 'development' && (
        <>
          <MockFeaturePolicy />
          <MockContentSecurityPolicy />
        </>
      )}
    </NextHead>
  );
};

export default memo(Head);
