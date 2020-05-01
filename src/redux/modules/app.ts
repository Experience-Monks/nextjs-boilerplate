import keys from '../keys';

const defaultState = {
  loaded: false
};

export type AppState = typeof defaultState;

type AppActionTypes = SetLandingLoadedAction;

// Reducer
export default function reducer(state: AppState = defaultState, action: AppActionTypes): AppState {
  switch (action.type) {
    case keys.LANDING_LOADED:
      return { ...state, loaded: action.loaded };
    default:
      return state;
  }
}

// Action Creators
interface SetLandingLoadedAction {
  type: typeof keys.LANDING_LOADED;
  loaded: AppState['loaded'];
}
export function setLandingLoaded(loaded: SetLandingLoadedAction['loaded']): SetLandingLoadedAction {
  return {
    type: keys.LANDING_LOADED,
    loaded
  };
}
