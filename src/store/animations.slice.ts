import type { AppState, Mutators } from './store'
import type { StateCreator } from 'zustand'

export type AnimationstSliceState = {
  animations: {
    // getters
    animationsEnabled: boolean
    // setters
    setAnimationsEnabled: (animationsEnabled: boolean) => void
  }
}

export const AnimationsSlice: StateCreator<AppState, Mutators, [], AnimationstSliceState> = (set) => ({
  animations: {
    animationsEnabled: !!process.env.STORYBOOK,

    setAnimationsEnabled: (animationsEnabled) => {
      set((state) => {
        state.animations.animationsEnabled = animationsEnabled
      })
    }
  }
})
