import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import { device, browser } from '@jam3/detect';
import classnames from 'classnames';

import 'normalize.css';
import '@/styles/global.scss';

import Layout from '@/components/Layout/Layout';

import { store } from '@/redux';
import '@/utils/why-did-you-render';

const isBrowser = typeof window !== 'undefined';

if (isBrowser) {
  require('default-passive-events');
  require('focus-visible');
}

// This default export is required in a new `pages/_app.js` file.
function App({ Component, pageProps }: AppProps) {
  const { isUnsupported, ...componentProps } = pageProps;

  useEffect(() => {
    if (isBrowser) {
      if (process.env.NODE_ENV !== 'production' && window.location.href.indexOf('?nostat') === -1) {
        require('@jam3/stats')();
      }

      document.body.className = `${document.body.className} ${classnames(device.type, browser.name, {
        'touch-device': device.touch
      })}`.trim();
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
