import { FC, useEffect } from 'react';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import 'normalize.css';
import '@/utils/why-did-you-render';

import '@/styles/global.scss';

import { PageProps } from '@/data/types';

import Layout from '@/components/Layout/Layout';

import gsapInit from '@/utils/gsap-init';
import setBodyClasses from '@/utils/set-body-classes';

import { store } from '@/redux';

require('default-passive-events');
require('focus-visible');
gsapInit();

// This default export is required in a new `pages/_app.js` file.
const App: FC<AppProps<PageProps>> = (props) => {
  useEffect(() => {
    setBodyClasses();
  }, []);

  /** NOTE: this is where dev tools and helper modules can be placed */
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && window.location.href.indexOf('?nostat') === -1) {
      import(/* webpackChunkName: "jam3-stats" */ '@jam3/stats').then((module) => module.default());
    }
  }, []);

  return (
    <Provider store={store}>
      <Layout {...props} />
    </Provider>
  );
};

export default App;
