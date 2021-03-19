import { createSlice } from '@reduxjs/toolkit';

// App Slice
const slice = createSlice({
  name: 'app',
  initialState: {
    loaded: false,
    isWebpSupported: true
  },
  reducers: {
    setLandingLoaded(state, action) {
      return { ...state, loaded: action.payload };
    },
    setIsWebpSupported(state, action) {
      return { ...state, isWebpSupported: action.payload };
    }
  }
});

export const { setLandingLoaded, setIsWebpSupported } = slice.actions;

export default slice.reducer;
