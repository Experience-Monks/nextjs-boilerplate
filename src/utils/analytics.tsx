import { useEffect, useState } from 'react'
import Script from 'next/script'

import config from '@/data/config.json'

import { device } from '@/utils/detect'
import { getRuntimeEnv } from '@/utils/runtime-env'

if (device.browser) {
  window.dataLayer = window.dataLayer || []
}

/**
 * Dispatch an event with GTM
 *
 * @param {boolean} [action=false] - Action name
 * @param {any} [payload={}] - Action data
 */
export function gtmEvent(action = false, payload = {}): void {
  if (device.browser && action) {
    window.dataLayer.push({
      event: action,
      payload
    })
  }
}

type Props = {
  consent: boolean
}

/**
 * GTM code snippet in head
 */
const isStage =
  typeof window !== 'undefined' ? RegExp(/^https?:\/\/stage\..*$/).test(window.location.href.toLowerCase()) : false
const isProd =
  typeof window !== 'undefined' ? RegExp(/^https?:\/\/prod\..*$/).test(window.location.href.toLowerCase()) : false

let QUERY_PARAMS = ''
if (isProd) {
  // production env
  QUERY_PARAMS = ``
} else if (isStage) {
  // staging env
  QUERY_PARAMS = `+ '&gtm_auth=0C7oXHwDSkkVPTB79Nkerg&gtm_preview=env-4&gtm_cookies_win=x'`
} else {
  // development && local env
  QUERY_PARAMS = `+ '&gtm_auth=kCBpKoRDhvSr9u1LuPWC1g&gtm_preview=env-3&gtm_cookies_win=x'`
}

export function GtmScript({ consent }: Props) {
  const [gtmId, setGtmId] = useState('')

  useEffect(() => {
    const env = getRuntimeEnv()
    const gtmId = config.analytics.gtmIds[env]
    if (consent && gtmId) setGtmId(gtmId)
  }, [consent])

  return gtmId ? (
    <Script
      id="google-tag-manager"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl${QUERY_PARAMS};f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer', '${gtmId}');
      `
      }}
    />
  ) : null
}
