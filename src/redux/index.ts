import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface iAppState {
  prevRoute: string | null;
  isWebpSupported: boolean;
}

const initialState: iAppState = {
  prevRoute: null,
  isWebpSupported: true
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setPrevRoute(state, action: PayloadAction<string>) {
      return { ...state, prevRoute: action.payload };
    },
    setIsWebpSupported(state, action: PayloadAction<boolean>) {
      return { ...state, isWebpSupported: action.payload };
    }
  }
});

export const { setPrevRoute, setIsWebpSupported } = appSlice.actions;

export const store = configureStore({
  reducer: appSlice.reducer
});

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
