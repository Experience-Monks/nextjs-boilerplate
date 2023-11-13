import { FC, memo } from 'react'
import NextHead from 'next/head'
import { useRouter } from 'next/router'

import config from '@/data/config.json'
import { HeadProps } from '@/data/types'

import { riveWASMResource } from '@/motion/core/init-rive'

import MockContentSecurityPolicy from '@/components/Head/MockContentSecurityPolicy'
import MockFeaturePolicy from '@/components/Head/MockFeaturePolicy'

const Head: FC<HeadProps> = ({ title, description, siteName, image }) => {
  const router = useRouter()

  const fullPath = `${config.websiteUrl}${router.asPath}`
  const shareImage = `${config.websiteUrl}${image}`
  const shareLocale = 'en_US'

  return (
    <NextHead>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=5, shrink-to-fit=no, viewport-fit=cover"
      />

      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Favicons - generate favicons in https://realfavicongenerator.net */}
      <link rel="icon" type="image/png" sizes="16x16" href="/common/favicons/favicon-16x16.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/common/favicons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="144x144" href="/common/favicons/favicon-144x144.png" />
      <link rel="icon" type="image/png" sizes="150x150" href="/common/favicons/favicon-150x150.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/common/favicons/favicon-192x192.png" />
      <link rel="icon" type="image/png" sizes="384x384" href="/common/favicons/favicon-384x384.png" />
      <link rel="icon" type="image/png" sizes="512x512" href="/common/favicons/favicon-512x512.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/common/favicons/apple-touch-icon.png" />
      <link rel="shortcut icon" href="/common/favicons/favicon.ico" />
      <link rel="mask-icon" href="/common/favicons/safari-pinned-tab.svg" color="#000" />
      <link rel="manifest" href="/common/favicons/site.webmanifest" crossOrigin="use-credentials" />
      <meta name="theme-color" content="#1c1c1c" />
      <meta name="msapplication-config" content="/common/favicons/browserconfig.xml" />

      {/* Share meta tags */}
      <meta property="og:url" content={fullPath} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:image" content={shareImage} />
      <meta property="og:locale" content={shareLocale} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:description" content={description} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:image" content={shareImage} />
      <meta name="twitter:description" content={description} />

      {/* Other recommends */}
      <link rel="canonical" href={fullPath} />

      {/* Env dependent */}
      {config.dnsPrefetch[process.env.NODE_ENV].map((href: string) => (
        <>
          <link key={href} rel="preconnect" href={href} crossOrigin="anonymous" />
          <link rel="dns-prefetch" href={href} />
        </>
      ))}

      <link rel="preload" href={riveWASMResource} as="fetch" crossOrigin="anonymous" />

      {process.env.NODE_ENV === 'development' && (
        <>
          <MockFeaturePolicy />
          <MockContentSecurityPolicy />
        </>
      )}
    </NextHead>
  )
}

export default memo(Head)
