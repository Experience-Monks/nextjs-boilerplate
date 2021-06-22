import React, { memo, useEffect } from 'react';
import { Provider } from 'react-redux';
import 'normalize.css';

import '../styles/global.scss';

import Layout from '../components/Layout/Layout';

import { store } from '../redux';
import detect, { isTouchDevice } from '../utils/detect';

if (typeof window !== 'undefined') {
  require('default-passive-events');
  require('focus-visible');
}

// This default export is required in a new `pages/_app.js` file.
function App({ Component, pageProps }) {
  const { isUnsupported, ...componentProps } = pageProps;

  useEffect(() => {
    if (typeof window !== 'undefined') {
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
    <Provider store={store}>
      <Layout>
        <Component {...componentProps} />
      </Layout>
    </Provider>
  );
}

export default memo(App);
