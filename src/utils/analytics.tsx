import { memo } from 'react';
import NextHead from 'next/head';

if (typeof window !== 'undefined') window.dataLayer = window.dataLayer || [];

type Props = {
  consent: boolean;
};

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

/**
 * GTM code snippet in head
 */
const GtmScript = () => {
  return (
    // TODO: next/head is not currently not accepting next/script component.
    //       when it is fixed, use next/script
    // eslint-disable-next-line
    <script
      id="gtm-container"
      /* <!-- Google Tag Manager --> */
      // eslint-disable-next-line
      dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer', '${process.env.NEXT_PUBLIC_GTM_ID}');`
      }}
    />
  );
};

function Analytics({ consent }: Props) {
  return <NextHead>{consent && GtmScript()}</NextHead>;
}

export default memo(Analytics);
