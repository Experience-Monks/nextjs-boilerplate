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

export function GtmScript({ consent }: Props) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'Analytics.tsx'
  });

  console.log(`Cookie consent: ${consent}`);
  return (
    <Script
      id="google-tag-manager"
      strategy="afterInteractive"
      // eslint-disable-next-line jam3/no-sanitizer-with-danger
      dangerouslySetInnerHTML={{
        __html: `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl+ '&gtm_auth=kCBpKoRDhvSr9u1LuPWC1g&gtm_preview=env-3&gtm_cookies_win=x';f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer', 'GTM-K5TRM4N');
      `
      }}
    />
  );
}
