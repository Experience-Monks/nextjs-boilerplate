import { configureStore, createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    prevRoute: null,
    loaded: false
  },
  reducers: {
    setLandingLoaded(state, action) {
      return { ...state, loaded: action.payload };
    },
    setPrevRoute(state, action) {
      return { ...state, prevRoute: action.prevRoute };
    }
  }
});

export const { setLandingLoaded, setPrevRoute } = appSlice.actions;

export const store = configureStore({
  reducer: appSlice.reducer
});
