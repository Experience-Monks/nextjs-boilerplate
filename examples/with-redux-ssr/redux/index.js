import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import appReducers from './modules/app';

const reducers = combineReducers({
  // NOTE: add more reducers here
  app: appReducers
});

export const initializeStore = (preloadedState) => {
  return createStore(reducers, preloadedState, composeWithDevTools(applyMiddleware()));
};
