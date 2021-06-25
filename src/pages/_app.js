import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import kebabCase from 'lodash.kebabcase';
import 'normalize.css';

import '../styles/global.scss';

import Layout from '../components/Layout/Layout';

import { store } from '../redux';
import { device, browser } from '../utils/detect';

const isBrowser = typeof window !== 'undefined';

if (isBrowser) {
  require('default-passive-events');
  require('focus-visible');
}

// This default export is required in a new `pages/_app.js` file.
function App({ Component, pageProps }) {
  const { isUnsupported, ...componentProps } = pageProps;

  useEffect(() => {
    if (isBrowser) {
      if (process.env.NODE_ENV !== 'production' && window.location.href.indexOf('?nostat') === -1) {
        require('@jam3/stats')();
      }

      const classes = [device.mobile ? 'mobile' : '', device.type, browser.name].filter(Boolean);
      classes.forEach((c) => document.body.classList.add(kebabCase(c)));
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

export default App;
