import React from 'react';
import App from 'next/app';
import { Provider } from 'react-redux';

import { initializeStore } from './index';

export const withRedux = (Component, { ssr = true } = {}) => {
  // eslint-disable-next-line react/prop-types
  const WithRedux = ({ initialReduxState, ...props }) => {
    const store = getOrInitializeStore(initialReduxState);
    return (
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    );
  };

  // Make sure people don't use this HOC on _app.js level
  if (process.env.NODE_ENV !== 'production') {
    const isAppHoc = Component === App || Component.prototype instanceof App;
    if (isAppHoc) {
      throw new Error('The withRedux HOC does not work with _app.js');
    }
  }

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== 'production') {
    const displayName = Component.displayName || Component.name || 'Component';

    WithRedux.displayName = `withRedux(${displayName})`;
  }

  return WithRedux;
};

let reduxStore;
const getOrInitializeStore = (initialState) => {
  // Always make a new store if server, otherwise state is shared between requests
  if (typeof window === 'undefined') {
    return initializeStore(initialState);
  }

  // Create store if unavailable on the client and set it on the window object
  if (!reduxStore) {
    reduxStore = initializeStore(initialState);
  }

  return reduxStore;
};
