import type { AnimationsSliceState } from './animations.slice'
import type { ConsentSliceState } from './consent.slice'
import type { NavigationSliceState } from './navigation.slice'

import { create } from 'zustand'
import { devtools, subscribeWithSelector } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { AnimationsSlice } from './animations.slice'
import { ConsentSlice } from './consent.slice'
import { NavigationSlice } from './navigation.slice'

export type Mutators = [['zustand/devtools', never], ['zustand/subscribeWithSelector', never], ['zustand/immer', never]]

export type AppState = AnimationsSliceState & ConsentSliceState & NavigationSliceState

export const store = create<AppState>()(
  devtools(
    subscribeWithSelector(
      immer((...props) => ({
        ...AnimationsSlice(...props),
        ...ConsentSlice(...props),
        ...NavigationSlice(...props)
      }))
    )
  )
)

export const storeState = () => store.getState()
