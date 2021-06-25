import React, { memo, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import kebabCase from 'lodash.kebabcase';
import 'normalize.css';

import '../styles/global.scss';

import Layout from '../components/Layout/Layout';

import { withRedux } from '../redux/with-redux';
import { device, browser } from '../utils/detect';

if (typeof window !== 'undefined') {
  require('default-passive-events');
  require('focus-visible');
}

const ReduxProvider = memo(withRedux(({ children }) => children));

// This default export is required in a new `pages/_app.js` file.
function App({ Component, pageProps }) {
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const unsupportedUtil = require('../utils/unsupported-utils');
      if (unsupportedUtil.isSupported()) {
        if (process.env.NODE_ENV !== 'production' && window.location.href.indexOf('?nostat') === -1) {
          require('@jam3/stats')();
        }
        const classes = [device.mobile ? 'mobile' : '', device.type, browser.name].filter(Boolean);
        classes.forEach((c) => document.body.classList.add(kebabCase(c)));
      } else {
        setIsSupported(false);
      }
    }
  }, []);

  if (!isSupported) {
    const Unsupported = dynamic(() =>
      import(/* webpackChunkName: "Unsupported" */ '../components/Unsupported/Unsupported')
    );
    return <Unsupported />;
  }

  return (
    <ReduxProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ReduxProvider>
  );
}

export default App;
