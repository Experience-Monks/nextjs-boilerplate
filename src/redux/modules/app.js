import keys from '../keys';

type State = {
  loaded?: boolean
};

type Action = {
  type: $Values<typeof keys>,
  ...State
};

const defaultState = {
  loaded: false
};

// Reducer
export default function reducer(state: State = defaultState, action: Action): State {
  switch (action.type) {
    case keys.LANDING_LOADED:
      return { ...state, loaded: action.loaded };
    default:
      return state;
  }
}

// Action Creators
export function setLandingLoaded(loaded: boolean): Action {
  return {
    type: keys.LANDING_LOADED,
    loaded
  };
}
