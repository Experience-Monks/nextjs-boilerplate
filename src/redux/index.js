import { configureStore, createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    prevRoute: null
  },
  reducers: {
    setPrevRoute(state, action) {
      return { ...state, prevRoute: action.prevRoute };
    }
  }
});

export const { setPrevRoute } = appSlice.actions;

export const store = configureStore({
  reducer: appSlice.reducer
});
