import keys from '../keys';

const defaultState = {
  loaded: false
};

// Reducer
export default function reducer(state = defaultState, action) {
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
