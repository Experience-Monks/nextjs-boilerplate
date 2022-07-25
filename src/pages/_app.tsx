import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import { FaustProvider } from '@faustjs/next';
import '../faust.config';
import 'normalize.css';
import '@/utils/why-did-you-render';

import '@/styles/global.scss';

import Layout from '@/components/Layout/Layout';

import gsapInit from '@/utils/gsap-init';
import setBodyClasses from '@/utils/set-body-classes';

import { store } from '@/redux';

import { client } from '@/client';

require('default-passive-events');
require('focus-visible');
gsapInit();

// This default export is required in a new `pages/_app.js` file.
function App({ Component, pageProps }: AppProps) {
  const { isUnsupported, ...componentProps } = pageProps;

  useEffect(() => {
    setBodyClasses();
  }, []);

  /** NOTE: this is where dev tools and helper modules can be placed */
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && window.location.href.indexOf('?nostat') === -1) {
      import(/* webpackChunkName: "jam3-stats" */ '@jam3/stats').then((module) => module.default());
    }
  }, []);

  if (isUnsupported) {
    return <Component {...componentProps} />;
  }

  return (
    <Provider store={store}>
      <FaustProvider client={client} pageProps={pageProps}>
        <Layout>
          <Component {...componentProps} />
        </Layout>
      </FaustProvider>
    </Provider>
  );
}

export default App;
