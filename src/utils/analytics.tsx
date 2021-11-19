import Script from 'next/script';

if (typeof window !== 'undefined') window.dataLayer = window.dataLayer || [];

/**
 * Dispatch an event with GTM
 *
 * @param {boolean} [action=false] - Action name
 * @param {any} [payload={}] - Action data
 */
export function gtmEvent(action = false, payload = {}): void {
  if (typeof window !== 'undefined' && action) {
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
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer', '${process.env.NEXT_PUBLIC_GTM_ID}');
      `
      }}
    />
  ) : null;
}
