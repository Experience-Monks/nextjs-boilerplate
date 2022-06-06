import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import { device } from '@jam3/detect';
import 'normalize.css';
import '@/utils/why-did-you-render';

import '@/styles/global.scss';

import Layout from '@/components/Layout/Layout';

import gsapInit from '@/utils/gsap-init';
import setBodyClasses from '@/utils/set-body-classes';

import { store } from '@/redux';

if (device.browser) {
  require('default-passive-events');
  require('focus-visible');
  gsapInit();
}

// This default export is required in a new `pages/_app.js` file.
function App({ Component, pageProps }: AppProps) {
  const { isUnsupported, ...componentProps } = pageProps;

  useEffect(() => {
    if (device.browser) {
      if (process.env.NODE_ENV !== 'production' && window.location.href.indexOf('?nostat') === -1) {
        require('@jam3/stats')();
      }

      setBodyClasses();
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
