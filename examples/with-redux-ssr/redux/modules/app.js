import keys from '../keys';

const defaultState = {
  prevRoute: null
};

// Reducer
export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case keys.PREV_ROUTE:
      return { ...state, prevRoute: action.prevRoute };
    default:
      return state;
  }
}

// Action Creators
export function setPrevRoute(prevRoute) {
  return {
    type: keys.PREV_ROUTE,
    prevRoute
  };
}
