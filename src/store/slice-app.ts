import { StateCreator } from 'zustand'

import { noop } from '@/utils/basic-functions'

import { AppState, Mutators } from '.'

export type AppSliceState = {
  app: {
    // getters
    pathname: string
    hasNavigated: boolean
    scrollHistory: { pathname: string; value: number }[]
    isNavigatingBack: boolean
    navigateTo: (href: string) => void
    navigateBack: () => void
    // setters
    setPathname: (activePath: string) => void
    setHasNavigated: (hasNavigated: boolean) => void
    setScrollHistory: (scrollHistory: { pathname: string; value: number }[]) => void
    setIsNavigatingBack: (isNavigatingBack: boolean) => void
    setNavigateTo: (navigateTo: (href: string) => void) => void
    setNavigateBack: (navigateBack: () => void) => void
  }
}

export const AppSlice: StateCreator<AppState, Mutators, [], AppSliceState> = (set) => ({
  app: {
    pathname: '/',
    hasNavigated: false,
    scrollHistory: [],
    isNavigatingBack: false,
    navigateTo: noop,
    navigateBack: noop,

    setPathname: (pathname) => {
      set((state) => {
        state.app.pathname = pathname
      })
    },

    setHasNavigated: (hasNavigated) => {
      set((state) => {
        state.app.hasNavigated = hasNavigated
      })
    },

    setScrollHistory: (scrollHistory) => {
      set((state) => {
        state.app.scrollHistory = scrollHistory
      })
    },

    setIsNavigatingBack: (isNavigatingBack) => {
      set((state) => {
        state.app.isNavigatingBack = isNavigatingBack
      })
    },

    setNavigateTo: (navigateTo) => {
      set((state) => {
        state.app.navigateTo = navigateTo
      })
    },

    setNavigateBack: (navigateBack) => {
      set((state) => {
        state.app.navigateBack = navigateBack
      })
    }
  }
})
