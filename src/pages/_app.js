import React, { memo, useEffect } from 'react';
import 'normalize.css';

import '../styles/global.scss';

import Layout from '../components/Layout/Layout';

import detect, { isBrowser, isTouchDevice } from '../utils/detect';
import { withRedux } from '../redux/with-redux';

if (isBrowser) {
  require('default-passive-events');
  require('focus-visible');
}

const ReduxProvider = memo(withRedux(({ children }) => children));

// This default export is required in a new `pages/_app.js` file.
function App({ Component, pageProps }) {
  const { isUnsupported, ...componentProps } = pageProps;

  useEffect(() => {
    if (isBrowser) {
      if (process.env.NODE_ENV !== 'production' && window.location.href.indexOf('?nostat') === -1) {
        require('@jam3/stats')();
      }

      const { device, browser } = detect;
      const classes = [isTouchDevice ? 'touch-device' : '', device.getType(), browser.getName()].filter((className) =>
        Boolean(className)
      );
      document.body.className = [...document.body.className.split(' '), ...classes].filter(Boolean).join(' ');
    }
  }, []);

  return isUnsupported ? (
    <Component {...componentProps} />
  ) : (
    <ReduxProvider>
      <Layout>
        <Component {...componentProps} />
      </Layout>
    </ReduxProvider>
  );
}

export default App;
