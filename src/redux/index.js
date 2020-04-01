import { createStore, applyMiddleware, combineReducers, type Store, type Action } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import appReducers from './modules/app';

export type State = {
  app: any
};

const reducers = combineReducers({
  // NOTE: add more reducers here
  app: appReducers
});

export const initializeStore = (preloadedState?: State): Store<State, Action<any>> => {
  return createStore(reducers, preloadedState, composeWithDevTools(applyMiddleware()));
};
