import type { AppState, Mutators } from './store'
import type { StateCreator } from 'zustand'

export type AnimationsSliceState = {
  animations: {
    // getters
    introComplete: boolean
    // setters
    setIntroComplete: (introComplete: boolean) => void
  }
}

export const AnimationsSlice: StateCreator<AppState, Mutators, [], AnimationsSliceState> = (set) => ({
  animations: {
    introComplete: !!process.env.STORYBOOK,

    setIntroComplete: (introComplete) => {
      set((state) => {
        state.animations.introComplete = introComplete
      })
    }
  }
})
