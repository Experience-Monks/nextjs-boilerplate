import { createSlice } from '@reduxjs/toolkit';

// App Slice
const slice = createSlice({
  name: 'app',
  initialState: {
    loaded: false
  },
  reducers: {
    setLandingLoaded(state, action) {
      return { ...state, loaded: action.payload };
    }
  }
});

export const { setLandingLoaded } = slice.actions;

export default slice.reducer;
