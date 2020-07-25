import { useMemo } from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import appReducers from './modules/app';

let store;

export const defaultState = {
  app: {
    loaded: false,
    lastUpdate: 0
  }
};

const reducers = combineReducers({
  // NOTE: add more reducers here
  app: appReducers
});

export const initStore = (preloadedState = defaultState) => {
  return createStore(reducers, preloadedState, composeWithDevTools(applyMiddleware()));
};

export const initializeStore = preloadedState => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(defaultState) {
  const store = useMemo(() => initializeStore(defaultState), [defaultState]);
  return store;
}
