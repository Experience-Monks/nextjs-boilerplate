import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import 'normalize.css';
import '@/utils/why-did-you-render';

import '@/styles/global.scss';

import Layout from '@/components/Layout/Layout';

import AnalyticsService from '@/services/analytics';
import CookieService from '@/services/cookie';
import gsapInit from '@/utils/gsap-init';
import setBodyClasses from '@/utils/set-body-classes';

import { store } from '@/redux';

import { cookieBannerName } from '@/data/settings';

const isBrowser = typeof window !== 'undefined';

if (isBrowser) {
  require('default-passive-events');
  require('focus-visible');
  gsapInit();
}

// This default export is required in a new `pages/_app.js` file.
function App({ Component, pageProps }: AppProps) {
  const { isUnsupported, ...componentProps } = pageProps;

  useEffect(() => {
    if (isBrowser) {
      if (process.env.NODE_ENV !== 'production' && window.location.href.indexOf('?nostat') === -1) {
        require('@jam3/stats')();
      }

      // Body class names
      setBodyClasses();

      // Analytics
      if (JSON.parse(CookieService.get(cookieBannerName) || '{}').statistics) {
        AnalyticsService.start();
      } else {
        CookieService.listen((name, value) => {
          if (name === cookieBannerName && JSON.parse(value || '{}').statistics) AnalyticsService.start();
        });
      }
    }
  }, []);

  if (isUnsupported) {
    return <Component {...componentProps} />;
  }

  return (
    <Provider store={store}>
      <Layout>
        <Component {...componentProps} />
      </Layout>
    </Provider>
  );
}

export default App;
