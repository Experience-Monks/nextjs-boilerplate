import { configureStore, createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    prevRoute: null,
    isWebpSupported: true
  },
  reducers: {
    setPrevRoute(state, action) {
      return { ...state, prevRoute: action.prevRoute };
    },
    setIsWebpSupported(state, action) {
      return { ...state, isWebpSupported: action.payload };
    }
  }
});

export const { setPrevRoute, setIsWebpSupported } = appSlice.actions;

export const store = configureStore({
  reducer: appSlice.reducer
});
