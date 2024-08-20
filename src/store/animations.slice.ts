import type { AppState, Mutators } from './store'
import type { StateCreator } from 'zustand'

export type AnimationsSliceState = {
  animations: {
    // getters
    animationsEnabled: boolean
    // setters
    setAnimationsEnabled: (animationsEnabled: boolean) => void
  }
}

export const AnimationsSlice: StateCreator<AppState, Mutators, [], AnimationsSliceState> = (set) => ({
  animations: {
    animationsEnabled: !!process.env.STORYBOOK,

    setAnimationsEnabled: (animationsEnabled) => {
      set((state) => {
        state.animations.animationsEnabled = animationsEnabled
      })
    }
  }
})
