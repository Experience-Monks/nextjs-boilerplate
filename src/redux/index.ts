import { createStore, applyMiddleware, combineReducers, PreloadedState } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import appReducers, { AppState } from './modules/app';

export interface State {
  app: AppState;
}

const reducers = combineReducers<State>({
  // NOTE: add more reducers here
  app: appReducers
});

export function initializeStore(preloadedState: PreloadedState<State>) {
  return createStore(reducers, preloadedState, composeWithDevTools(applyMiddleware()));
}
