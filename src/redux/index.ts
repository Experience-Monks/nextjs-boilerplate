import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { isDevEnv } from '@/utils/runtime-env'

const { actions, reducer } = createSlice({
  name: 'app',
  initialState: {
    prevRoute: '',
    isWebpSupported: true
  },
  reducers: {
    setPrevRoute(state, action: PayloadAction<string>) {
      state.prevRoute = action.payload
    },
    setIsWebpSupported(state, action: PayloadAction<boolean>) {
      state.isWebpSupported = action.payload
    }
  }
})

export const { setPrevRoute, setIsWebpSupported } = actions

export const store = configureStore({ reducer, devTools: isDevEnv() })

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector
