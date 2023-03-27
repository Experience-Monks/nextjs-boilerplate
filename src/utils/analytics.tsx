import Script from 'next/script';
import { device } from '@jam3/detect';

if (device.browser) {
  window.dataLayer = window.dataLayer || [];
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
    });
  }
}

type Props = {
  consent: boolean;
};

/**
 * GTM code snippet in head
 */
const isStage =
  typeof window !== 'undefined' ? RegExp(/^https?:\/\/stage\..*$/).test(window.location.href.toLowerCase()) : false;
const isProd =
  typeof window !== 'undefined' ? RegExp(/^https?:\/\/prod\..*$/).test(window.location.href.toLowerCase()) : false;

let QUERY_PARAMS = '';
if (isProd) {
  // production env
  QUERY_PARAMS = ``;
} else if (isStage) {
  // staging env
  QUERY_PARAMS = `+ '&gtm_auth=0C7oXHwDSkkVPTB79Nkerg&gtm_preview=env-4&gtm_cookies_win=x'`;
} else {
  // development && local env
  QUERY_PARAMS = `+ '&gtm_auth=kCBpKoRDhvSr9u1LuPWC1g&gtm_preview=env-3&gtm_cookies_win=x'`;
}

export function GtmScript({ consent }: Props) {
  return consent ? (
    <Script
      id="google-tag-manager"
      strategy="afterInteractive"
      // eslint-disable-next-line jam3/no-sanitizer-with-danger
      dangerouslySetInnerHTML={{
        __html: `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl${QUERY_PARAMS};f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer', '${process.env.NEXT_PUBLIC_GTM_ID}');
      `
      }}
    />
  ) : null;
}
