import keys from '../keys';
import { defaultState } from '../index';

// Reducer
export default function reducer(state = defaultState.app, action) {
  switch (action.type) {
    case keys.LANDING_LOADED:
      return { ...state, loaded: action.loaded };
    default:
      return state;
  }
}

// Action Creators
export function setLandingLoaded(loaded) {
  return {
    type: keys.LANDING_LOADED,
    loaded
  };
}
