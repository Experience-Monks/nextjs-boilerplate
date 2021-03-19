import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import appReducers from './modules/app';

const reducers = combineReducers({
  // NOTE: add more reducers here
  app: appReducers
});

const initializeStore = (preloadedState) => {
  return createStore(reducers, preloadedState, composeWithDevTools(applyMiddleware()));
};

let reduxStore;
export const getOrInitializeStore = (preloadedState) => {
  // Always make a new store if server, otherwise state is shared between requests
  if (typeof window === 'undefined') {
    return initializeStore(preloadedState);
  }

  // Create store if unavailable on the client and set it on the window object
  if (!reduxStore) {
    reduxStore = initializeStore(preloadedState);
  }

  return reduxStore;
};
