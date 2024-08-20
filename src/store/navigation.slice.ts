import type { AppState, Mutators } from './store'
import type { StateCreator } from 'zustand'

import { noop } from '@/utils/basic-functions'

export type NavigationSliceState = {
  navigation: {
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

export const NavigationSlice: StateCreator<AppState, Mutators, [], NavigationSliceState> = (set) => ({
  navigation: {
    pathname: '/',
    hasNavigated: false,
    scrollHistory: [],
    isNavigatingBack: false,
    navigateTo: noop,
    navigateBack: noop,

    setPathname: (pathname) => {
      set((state) => {
        state.navigation.pathname = pathname
      })
    },

    setHasNavigated: (hasNavigated) => {
      set((state) => {
        state.navigation.hasNavigated = hasNavigated
      })
    },

    setScrollHistory: (scrollHistory) => {
      set((state) => {
        state.navigation.scrollHistory = scrollHistory
      })
    },

    setIsNavigatingBack: (isNavigatingBack) => {
      set((state) => {
        state.navigation.isNavigatingBack = isNavigatingBack
      })
    },

    setNavigateTo: (navigateTo) => {
      set((state) => {
        state.navigation.navigateTo = navigateTo
      })
    },

    setNavigateBack: (navigateBack) => {
      set((state) => {
        state.navigation.navigateBack = navigateBack
      })
    }
  }
})
